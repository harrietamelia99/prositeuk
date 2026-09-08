import { NextResponse } from "next/server";
import { Resend } from "resend";
import { writeClient } from "@/sanity/lib/client";

const resend = new Resend(process.env.RESEND_API_KEY);

const collarLabel: Record<string, string> = {
  blue: "Blue Collar (Groundworkers, labourers & plant operators)",
  white: "White Collar (Site engineers, site & project management)",
  both: "Both Blue & White Collar",
};

export async function POST(request: Request) {
  try {
    const { name, email, phone, collarPreference, location } = await request.json();

    if (!email || !email.includes("@")) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }
    if (!name) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }
    if (!collarPreference) {
      return NextResponse.json({ error: "Please select a role preference" }, { status: 400 });
    }

    // Save subscriber to Sanity
    await writeClient.create({
      _type: "jobAlertSubscriber",
      name,
      email,
      phone: phone || undefined,
      collarPreference,
      location: location || undefined,
      subscribedAt: new Date().toISOString(),
      active: true,
    });

    const preference = collarLabel[collarPreference] ?? collarPreference;

    // Notify client
    await resend.emails.send({
      from: "PROSITEUK Website <no-reply@prositeuk.com>",
      to: "Info@prositeuk.com",
      subject: `New job alert sign-up: ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #1a1a1a; padding: 24px 32px;">
            <p style="color: white; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 4px;">PROSITEUK</p>
            <p style="color: #ccc; font-size: 13px; margin: 0;">New job alert registration</p>
          </div>
          <div style="padding: 32px; border: 1px solid #e5e5e5; border-top: none;">
            <table style="width:100%; border-collapse: collapse; font-size: 14px;">
              <tr><td style="padding: 8px 0; color: #666; width: 140px;">Name</td><td style="padding: 8px 0; font-weight: 600;">${name}</td></tr>
              <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color:#700e0d;">${email}</a></td></tr>
              ${phone ? `<tr><td style="padding: 8px 0; color: #666;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>` : ""}
              <tr><td style="padding: 8px 0; color: #666;">Preference</td><td style="padding: 8px 0;">${preference}</td></tr>
              ${location ? `<tr><td style="padding: 8px 0; color: #666;">Location</td><td style="padding: 8px 0;">${location}</td></tr>` : ""}
            </table>
            <p style="font-size: 13px; color: #999; margin: 24px 0 0;">This subscriber has been saved to your Sanity studio under Job Alert Subscribers.</p>
          </div>
          <div style="padding: 16px 32px; background: #f9f9f9; font-size: 11px; color: #999;">
            Sent automatically via PROSITEUK website
          </div>
        </div>
      `,
    });

    // Send confirmation to candidate
    await resend.emails.send({
      from: "PROSITEUK <no-reply@prositeuk.com>",
      to: email,
      subject: "You're signed up for PROSITEUK job alerts",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; color: #1a1a1a;">
          <div style="background: #1a1a1a; padding: 24px 32px;">
            <p style="color: white; font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase; margin: 0 0 4px;">PROSITEUK</p>
            <p style="color: #ccc; font-size: 13px; margin: 0;">Construction Recruitment</p>
          </div>
          <div style="padding: 32px; border: 1px solid #e5e5e5; border-top: none;">
            <h2 style="font-size: 20px; margin: 0 0 16px;">Hi ${name}, you're signed up!</h2>
            <p style="font-size: 14px; color: #444; line-height: 1.6; margin: 0 0 16px;">
              Thanks for registering for job alerts with PROSITEUK. We'll be in touch as soon as a suitable role comes up that matches your preferences.
            </p>
            <table style="width:100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px;">
              <tr><td style="padding: 8px 0; color: #666; width: 140px; border-top: 1px solid #eee;">Role preference</td><td style="padding: 8px 0; border-top: 1px solid #eee;">${preference}</td></tr>
              ${location ? `<tr><td style="padding: 8px 0; color: #666; border-top: 1px solid #eee;">Preferred location</td><td style="padding: 8px 0; border-top: 1px solid #eee;">${location}</td></tr>` : ""}
            </table>
            <p style="font-size: 13px; color: #666; margin: 0 0 8px;">
              In the meantime, you can browse our current live roles at:
            </p>
            <a href="https://prositeuk.com/jobs" style="display: inline-block; background: #700e0d; color: white; text-decoration: none; padding: 12px 24px; border-radius: 4px; font-size: 13px; font-weight: 600; letter-spacing: 0.05em;">View live jobs</a>
          </div>
          <div style="padding: 16px 32px; background: #f9f9f9; font-size: 11px; color: #999;">
            If you'd like to unsubscribe, reply to this email and we'll remove you from our list. PROSITEUK, Office Suite F10, Newcom Business Centre, 125 Poplar High Street, London E14 0AE.
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
