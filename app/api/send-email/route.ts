import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Create a transporter using Gmail SMTP
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { studentName, studentEmail, mentorName, date, time, subject } = body;

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: studentEmail,
      subject: 'Disha Mentorship - Session Booking Confirmation',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(to right, #f97316, #ec4899); padding: 2px; border-radius: 8px;">
            <div style="background: white; padding: 20px; border-radius: 6px;">
              <h1 style="color: #f97316; margin-bottom: 20px;">Booking Confirmation</h1>
              
              <p>Dear ${studentName},</p>
              
              <p>Your mentorship session has been successfully booked! Here are the details:</p>
              
              <div style="background-color: #f8f9fa; padding: 15px; border-radius: 6px; margin: 20px 0;">
                <p style="margin: 5px 0;"><strong>Mentor:</strong> ${mentorName}</p>
                <p style="margin: 5px 0;"><strong>Date:</strong> ${date}</p>
                <p style="margin: 5px 0;"><strong>Time:</strong> ${time}</p>
                <p style="margin: 5px 0;"><strong>Subject:</strong> ${subject}</p>
              </div>
              
              <p>Your mentor will join the session at the scheduled time. Please be ready 5 minutes before the session starts.</p>
              
              <div style="margin-top: 30px;">
                <p style="color: #666;">Best regards,</p>
                <p style="color: #666;">Team Disha</p>
              </div>
            </div>
          </div>
        </div>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Confirmation email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send confirmation email' },
      { status: 500 }
    );
  }
} 