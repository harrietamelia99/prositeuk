import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (body._type !== "application" || body.status !== "rejected") {
      return NextResponse.json({ ok: true });
    }

    const { candidateName, email, jobTitle, rejectionMessage } = body;

    if (!email || !candidateName) {
      return NextResponse.json({ error: "Missing candidate details" }, { status: 400 });
    }

    const message = rejectionMessage?.trim() ||
      `Thank you for applying for the ${jobTitle} role. After careful consideration, we will not be progressing your application on this occasion. We will keep your details on file and may be in touch if a suitable role arises in future.`;

    await resend.emails.send({
      from: "PROSITEUK <no-reply@prositeuk.com>",
      to: email,
      subject: `Your application for ${jobTitle}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #1a1a1a; padding: 24px 32px;">
            <p style="color: white; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 4px;">PROSITEUK</p>
            <p style="color: #ccc; font-size: 13px; margin: 0;">Construction Recruitment</p>
          </div>
          <div style="padding: 32px; border: 1px solid #e5e5e5; border-top: none;">
            <p style="font-size: 14px; margin: 0 0 16px;">Dear ${candidateName},</p>
            <p style="font-size: 14px; line-height: 1.6; margin: 0 0 16px;">${message.replace(/\n/g, "<br/>")}</p>
            <p style="font-size: 14px; margin: 0 0 24px;">Kind regards,<br/><strong>The PROSITEUK Team</strong></p>
            <a href="https://prositeuk.com/jobs" style="display: inline-block; background: #700e0d; color: white; text-decoration: none; padding: 10px 20px; font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase; font-weight: 600;">View other roles →</a>
          </div>
          <div style="padding: 16px 32px; background: #f9f9f9; font-size: 11px; color: #999;">
            PROSITEUK · 255–259 Commercial Road, 2nd Floor, Whitechapel, London E1 2BT
          </div>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
