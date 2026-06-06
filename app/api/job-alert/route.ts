import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    await resend.emails.send({
      from: "PROSITEUK Website <no-reply@prositeuk.com>",
      to: "Info@prositeuk.com",
      subject: `New job alert registration: ${email}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #1a1a1a; padding: 24px 32px;">
            <p style="color: white; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 4px;">PROSITEUK</p>
            <p style="color: #ccc; font-size: 13px; margin: 0;">New job alert registration</p>
          </div>
          <div style="padding: 32px; border: 1px solid #e5e5e5; border-top: none;">
            <p style="font-size: 14px; margin: 0 0 8px; color: #666;">Email address registered:</p>
            <p style="font-size: 18px; font-weight: 600; margin: 0 0 24px;"><a href="mailto:${email}" style="color: #700e0d;">${email}</a></p>
            <p style="font-size: 13px; color: #999; margin: 0;">Add this person to your job alerts list and contact them when a suitable role becomes available.</p>
          </div>
          <div style="padding: 16px 32px; background: #f9f9f9; font-size: 11px; color: #999;">
            Sent automatically via PROSITEUK website
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Job alert error:", err);
    return NextResponse.json({ error: "Failed to register" }, { status: 500 });
  }
}
