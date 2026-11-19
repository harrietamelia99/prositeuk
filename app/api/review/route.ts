import { NextResponse } from "next/server";
import { Resend } from "resend";
import { writeClient } from "@/sanity/lib/client";

const resend = new Resend(process.env.RESEND_API_KEY);

const typeLabel: Record<string, string> = {
  client: "Client",
  candidate: "Candidate",
  placement: "Worker on placement",
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function verifyTurnstile(token: string): Promise<boolean> {
  if (!token) return false;
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret: process.env.TURNSTILE_SECRET_KEY, response: token }),
  });
  const data = await res.json();
  return data.success === true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const firstName = String(body.firstName || "").trim().slice(0, 60);
    const reviewerType = String(body.reviewerType || "");
    const company = String(body.company || "").trim().slice(0, 120);
    const review = String(body.review || "").trim().slice(0, 3000);
    const canPublish = body.canPublish === true;

    if (!(await verifyTurnstile(String(body.turnstileToken || "")))) {
      return NextResponse.json({ error: "Verification failed, please refresh and try again." }, { status: 400 });
    }
    if (!firstName) {
      return NextResponse.json({ error: "First name is required" }, { status: 400 });
    }
    if (!typeLabel[reviewerType]) {
      return NextResponse.json({ error: "Please choose client, candidate or worker on placement" }, { status: 400 });
    }
    if (review.length < 10) {
      return NextResponse.json({ error: "Please write a short review" }, { status: 400 });
    }

    await writeClient.create({
      _type: "review",
      firstName,
      reviewerType,
      company: company || undefined,
      review,
      canPublish,
      approved: false,
      submittedAt: new Date().toISOString(),
    });

    const label = typeLabel[reviewerType];
    const safeName = escapeHtml(firstName);
    const safeReview = escapeHtml(review).replace(/\n/g, "<br />");

    await resend.emails.send({
      from: "PROSITEUK Website <no-reply@prositeuk.com>",
      to: "Info@prositeuk.com",
      subject: `New review from ${firstName} (${label})`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #1a1a1a; padding: 24px 32px;">
            <p style="color: white; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 4px;">PROSITEUK</p>
            <p style="color: #ccc; font-size: 13px; margin: 0;">New review received</p>
          </div>
          <div style="padding: 32px; border: 1px solid #e5e5e5; border-top: none;">
            <table style="width:100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">
              <tr><td style="padding: 8px 0; color: #666; width: 140px;">First name</td><td style="padding: 8px 0; font-weight: 600;">${safeName}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Type</td><td style="padding: 8px 0;">${label}</td></tr>
              ${company ? `<tr><td style="padding: 8px 0; color: #666;">Company or project</td><td style="padding: 8px 0;">${escapeHtml(company)}</td></tr>` : ""}
              <tr><td style="padding: 8px 0; color: #666;">Can we share it?</td><td style="padding: 8px 0; font-weight: 600; color: ${canPublish ? "#1a7f37" : "#700e0d"};">${canPublish ? "Yes" : "No, keep it private"}</td></tr>
            </table>
            <div style="border-left: 3px solid #700e0d; padding: 4px 0 4px 16px; font-size: 15px; line-height: 1.6; color: #333;">${safeReview}</div>
            <p style="font-size: 13px; color: #999; margin: 24px 0 0;">Saved to your Sanity studio under Reviews.</p>
          </div>
          <div style="padding: 16px 32px; background: #f9f9f9; font-size: 11px; color: #999;">
            Sent automatically via PROSITEUK website
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Review error:", err);
    return NextResponse.json({ error: "Failed to send review" }, { status: 500 });
  }
}
