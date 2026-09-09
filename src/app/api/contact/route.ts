import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    // Basic validation
    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required." }, { status: 400 });
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
    }

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message cannot be empty." }, { status: 400 });
    }

    const smtpHost = process.env.SMTP_HOST || "smtp.gmail.com";
    const smtpPort = parseInt(process.env.SMTP_PORT || "465", 10);
    const smtpUser = process.env.SMTP_USER;
    const smtpPass = process.env.SMTP_PASS;
    const receiver = process.env.CONTACT_RECEIVER || smtpUser || "meenakshibansal1701@gmail.com";

    if (!smtpUser || !smtpPass) {
      console.warn("SMTP credentials (SMTP_USER / SMTP_PASS) not set in environment.");
      return NextResponse.json(
        {
          error:
            "SMTP is not yet configured on the server. Please set SMTP_USER and SMTP_PASS in your .env.local (or Vercel Environment Variables).",
        },
        { status: 500 }
      );
    }

    // Configure Nodemailer transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // true for 465, false for 587 or others
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const sanitizedMessage = message.replace(/\n/g, "<br/>");

    // Send the email
    await transporter.sendMail({
      from: `"${name}" <${smtpUser}>`,
      replyTo: email,
      to: receiver,
      subject: `Portfolio Inquiry from ${name}`,
      text: `You received a new message from your portfolio contact form:\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #F7F8FA; margin: 0; padding: 30px; color: #1e293b; }
            .container { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(208, 160, 163, 0.2); border: 1px solid #ECCBC9; }
            .header { background: linear-gradient(135deg, #ECCBC9 0%, #D0A0A3 100%); padding: 28px 32px; text-align: left; }
            .header h1 { margin: 0; color: #ffffff; font-size: 22px; font-weight: 700; letter-spacing: -0.5px; }
            .header p { margin: 6px 0 0 0; color: rgba(255,255,255,0.9); font-size: 13px; }
            .content { padding: 32px; }
            .field { margin-bottom: 20px; }
            .label { font-size: 11px; text-transform: uppercase; letter-spacing: 0.1em; color: #8A4B52; font-weight: 700; margin-bottom: 6px; }
            .value { font-size: 15px; color: #0f172a; font-weight: 500; }
            .message-box { background: #FAF7F7; border: 1px solid #ECCBC9; border-radius: 12px; padding: 18px 20px; font-size: 15px; line-height: 1.6; color: #334155; margin-top: 8px; }
            .footer { padding: 20px 32px; background: #FAF7F7; border-top: 1px solid #F5E2E3; font-size: 12px; color: #64748b; display: flex; justify-content: space-between; align-items: center; }
            .reply-btn { display: inline-block; background: #8A4B52; color: #ffffff !important; padding: 10px 20px; border-radius: 9999px; text-decoration: none; font-size: 13px; font-weight: 600; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>New Portfolio Message</h1>
              <p>Sent via Contact Form on Meenakshi's Portfolio</p>
            </div>
            <div class="content">
              <div class="field">
                <div class="label">Sender Name</div>
                <div class="value">${name}</div>
              </div>
              <div class="field">
                <div class="label">Sender Email</div>
                <div class="value"><a href="mailto:${email}" style="color: #8A4B52; text-decoration: none;">${email}</a></div>
              </div>
              <div class="field">
                <div class="label">Message Content</div>
                <div class="message-box">${sanitizedMessage}</div>
              </div>
              <div style="margin-top: 28px; text-align: center;">
                <a href="mailto:${email}?subject=Re: Portfolio Inquiry" class="reply-btn">Reply Directly to ${name}</a>
              </div>
            </div>
            <div class="footer">
              <span>Timestamp: ${new Date().toLocaleString()}</span>
              <span>Direct Reply Enabled</span>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return NextResponse.json({ success: true, message: "Email sent successfully via SMTP." });
  } catch (error: unknown) {
    console.error("Nodemailer SMTP error:", error);
    const errorMessage = error instanceof Error ? error.message : "Failed to send email via SMTP.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
