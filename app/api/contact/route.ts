import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { name, email, message, whatsapp } = body;

        // 1. Setup Transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'mridulsinghal11@gmail.com',
                pass: 'peuw sdid qeuw jlpq' // App Password provided by user
            }
        });

        // 2. Admin Email Template (To You)
        const adminMailOptions = {
            from: 'Portfolio Bot <mridulsinghal11@gmail.com>',
            to: 'mridulsinghal11@gmail.com',
            subject: `✨ New Inquiry: ${name}`,
            html: `
                <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta name="color-scheme" content="light dark">
                    <meta name="supported-color-schemes" content="light dark">
                    <style>
                        :root {
                            color-scheme: light dark;
                        }
                        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f7; color: #1d1d1f; -webkit-font-smoothing: antialiased; }
                        .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 20px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.06); border: 1px solid rgba(0,0,0,0.05); }
                        
                        /* Header */
                        .header { background: #000000; padding: 40px 30px; text-align: center; }
                        .header h1 { color: #ffffff; margin: 0; font-size: 22px; font-weight: 600; letter-spacing: -0.5px; }
                        .header-subtitle { color: #888; font-size: 13px; margin-top: 8px; text-transform: uppercase; letter-spacing: 1px; }

                        /* Content */
                        .content { padding: 40px 35px; }
                        .field-group { margin-bottom: 28px; }
                        .label { font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #86868b; font-weight: 700; margin-bottom: 8px; display: block; }
                        .value { font-size: 18px; font-weight: 500; color: #1d1d1f; line-height: 1.4; }
                        .value a { color: #1d1d1f; text-decoration: none; border-bottom: 1px solid #e5e5e5; transition: border-color 0.2s; }
                        .value a:hover { border-color: #0071e3; color: #0071e3; }
                        
                        /* Message Box */
                        .message-label { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
                        .message-card { background-color: #fbfbfd; padding: 24px; border-radius: 16px; border: 1px solid #f0f0f0; }
                        .message-text { font-size: 16px; line-height: 1.6; color: #333; white-space: pre-wrap; font-family: 'SF Mono', 'Menlo', 'Monaco', 'Courier New', monospace; }

                        /* Actions */
                        .actions { padding: 30px 35px; background: #fafafa; border-top: 1px solid #eeeeee; text-align: center; }
                        .btn { display: inline-block; padding: 14px 24px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 14px; transition: transform 0.2s, opacity 0.2s; margin: 5px; }
                        .btn:hover { opacity: 0.9; transform: translateY(-1px); }
                        .btn-mail { background-color: #0071e3; color: #ffffff !important; box-shadow: 0 2px 8px rgba(0, 113, 227, 0.25); }
                        .btn-wa { background-color: #34c759; color: #ffffff !important; box-shadow: 0 2px 8px rgba(52, 199, 89, 0.25); }

                        .footer { padding: 25px; text-align: center; font-size: 12px; color: #999; background: #f5f5f7; border-top: 1px solid #eaeaea; }

                        /* Dark Mode */
                        @media (prefers-color-scheme: dark) {
                            body { background-color: #000000 !important; color: #ffffff !important; }
                            .container { background-color: #1c1c1e !important; box-shadow: none !important; border: 1px solid #333; }
                            .header { background: #2c2c2e !important; border-bottom: 1px solid #38383a; }
                            .value { color: #ffffff !important; }
                            .value a { color: #ffffff !important; border-bottom-color: #444; }
                            .label { color: #98989d !important; }
                            .message-card { background-color: #262628 !important; border-color: #333 !important; }
                            .message-text { color: #e5e5e7 !important; }
                            .actions { background-color: #242426 !important; border-top-color: #333 !important; }
                            .footer { background-color: #000000 !important; color: #666 !important; border-top-color: #222 !important; }
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="header">
                            <h1>New Inquiry</h1>
                            <div class="header-subtitle">From Portfolio</div>
                        </div>
                        <div class="content">
                            <div class="field-group">
                                <span class="label">From</span>
                                <div class="value">${name}</div>
                            </div>
                            <div class="field-group">
                                <span class="label">Contact</span>
                                <div class="value"><a href="mailto:${email}">${email}</a></div>
                                ${whatsapp ? `<div class="value" style="margin-top:8px; font-size:15px; color:#888;">WhatsApp: ${whatsapp}</div>` : ''}
                            </div>
                            <div class="field-group">
                                <span class="label">Message</span>
                                <div class="message-card">
                                    <div class="message-text">${message}</div>
                                </div>
                            </div>
                        </div>
                        <div class="actions">
                            <a href="mailto:${email}" class="btn btn-mail">Reply via Email</a>
                            ${whatsapp ? `<a href="https://wa.me/${whatsapp.replace(/[^0-9]/g, '')}" class="btn btn-wa">Chat on WhatsApp</a>` : ''}
                        </div>
                        <div class="footer">
                            Received safely by your server
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        // 3. User Confirmation Template (To Them)
        const userMailOptions = {
            from: 'Mridul Singhal <mridulsinghal11@gmail.com>',
            to: email,
            subject: `Message Received! 🚀`,
            html: `
                 <!DOCTYPE html>
                <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <meta name="color-scheme" content="light dark">
                    <style>
                        :root { color-scheme: light dark; }
                        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f5f5f7; color: #1d1d1f; }
                        .container { max-width: 600px; margin: 40px auto; background: #ffffff; border-radius: 24px; overflow: hidden; box-shadow: 0 10px 40px rgba(0,0,0,0.08); }
                        
                        .hero { background: #000000; padding: 60px 40px; text-align: center; }
                        .hero-icon { font-size: 48px; margin-bottom: 20px; display: block; }
                        .hero h1 { color: #ffffff; margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
                        
                        .content { padding: 40px; text-align: center; }
                        .text { font-size: 17px; line-height: 1.6; color: #333; margin-bottom: 24px; max-width: 85%; margin-left: auto; margin-right: auto; }
                        
                        .btn { display: inline-block; background-color: #000000; color: #ffffff !important; padding: 16px 32px; border-radius: 50px; text-decoration: none; font-weight: 600; font-size: 15px; margin-top: 10px; transition: opacity 0.2s; }
                        .btn:hover { opacity: 0.8; }
                        
                        .footer { padding: 30px; text-align: center; font-size: 13px; color: #999; background-color: #f9f9f9; border-top: 1px solid #eee; }
                        
                         /* Dark Mode */
                        @media (prefers-color-scheme: dark) {
                            body { background-color: #000000 !important; }
                            .container { background-color: #1c1c1e !important; border: 1px solid #333; }
                            .hero { background: #2c2c2e !important; }
                            .text { color: #e5e5e7 !important; }
                            .btn { background-color: #ffffff !important; color: #000000 !important; }
                            .footer { background-color: #000000 !important; color: #666 !important; border-top-color: #222 !important; }
                        }
                    </style>
                </head>
                <body>
                    <div class="container">
                        <div class="hero">
                            <span class="hero-icon">📬</span>
                            <h1>Got it, ${name.split(' ')[0]}!</h1>
                        </div>
                        <div class="content">
                            <p class="text">
                                Thanks for reaching out. I've received your message and will get back to you shortly (usually within 24 hours).
                            </p>
                            <a href="https://mridulsinghal.com" class="btn">Return to Portfolio</a>
                        </div>
                        <div class="footer">
                            © ${new Date().getFullYear()} Mridul Singhal
                        </div>
                    </div>
                </body>
                </html>
            `
        };

        // Send both emails in parallel
        await Promise.all([
            transporter.sendMail(adminMailOptions),
            transporter.sendMail(userMailOptions)
        ]);

        return NextResponse.json({ success: true, message: 'Emails sent successfully' });

    } catch (error) {
        console.error('Email Error:', error);
        return NextResponse.json({ success: false, message: 'Failed to send email' }, { status: 500 });
    }
}
