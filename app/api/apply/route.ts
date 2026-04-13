import { NextResponse } from "next/server";
import { Resend } from "resend";
import { put } from "@vercel/blob";
import { writeClient } from "@/sanity/lib/client";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const jobId = String(formData.get("jobId") || "");
    const jobTitle = String(formData.get("jobTitle") || "");
    const candidateName = String(formData.get("candidateName") || "").trim();
    const email = String(formData.get("email") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = String(formData.get("message") || "").trim();
    const cv = formData.get("cv");

    if (!jobId || !jobTitle || !candidateName || !email || !phone || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    let cvUrl: string | undefined;

    if (cv instanceof File && cv.size > 0) {
      const extension = cv.name.split(".").pop()?.toLowerCase();
      const allowed = ["pdf", "doc", "docx"];
      if (!extension || !allowed.includes(extension)) {
        return NextResponse.json({ error: "CV must be a PDF, DOC or DOCX file" }, { status: 400 });
      }
      const blob = await put(`cvs/${Date.now()}-${candidateName.replace(/\s+/g, "-")}.${extension}`, cv, {
        access: "public",
      });
      cvUrl = blob.url;
    }

    const appliedAt = new Date().toISOString();

    await writeClient.create({
      _type: "application",
      jobId,
      jobTitle,
      candidateName,
      email,
      phone,
      message,
      cvLink: cvUrl,
      status: "new",
      appliedAt,
    });

    await resend.emails.send({
      from: "PROSITEUK Applications <onboarding@resend.dev>",
      to: "Info@prositeuk.com",
      subject: `New application: ${candidateName} for ${jobTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #1a1a1a; padding: 24px 32px;">
            <p style="color: white; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 4px;">PROSITEUK</p>
            <p style="color: #ccc; font-size: 13px; margin: 0;">New job application received</p>
          </div>
          <div style="padding: 32px; border: 1px solid #e5e5e5; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; width: 140px; color: #666; font-size: 13px;">Role applied for</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-weight: 600; font-size: 13px;">${jobTitle}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 13px;">Name</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px;">${candidateName}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 13px;">Email</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px;"><a href="mailto:${email}" style="color: #700e0d;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 13px;">Phone</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px;"><a href="tel:${phone}" style="color: #700e0d;">${phone}</a></td>
              </tr>
              ${cvUrl ? `<tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; color: #666; font-size: 13px;">CV</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #f0f0f0; font-size: 13px;"><a href="${cvUrl}" style="color: #700e0d;">Download CV</a></td>
              </tr>` : ""}
              <tr>
                <td style="padding: 10px 0; color: #666; font-size: 13px; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; font-size: 13px; white-space: pre-wrap;">${message}</td>
              </tr>
            </table>
            <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid #f0f0f0;">
              <a href="https://prositeuk.com/studio" style="display: inline-block; background: #1a1a1a; color: white; text-decoration: none; padding: 10px 20px; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600;">View in Sanity →</a>
            </div>
          </div>
          <div style="padding: 16px 32px; background: #f9f9f9; font-size: 11px; color: #999;">
            Sent automatically via PROSITEUK website · ${new Date(appliedAt).toLocaleString("en-GB", { timeZone: "Europe/London" })}
          </div>
        </div>
      `,
    });

    return NextResponse.redirect(new URL(`/jobs?applied=1`, request.url), { status: 303 });
  } catch (err) {
    console.error("Apply error:", err);
    return NextResponse.json({ error: "Could not submit application" }, { status: 500 });
  }
}
