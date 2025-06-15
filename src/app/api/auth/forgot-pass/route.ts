import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import connectDB from '@/lib/mongodb';
import User from '@/lib/models/user';
import ForgotPassMapping from '@/lib/models/forgotPassMapping';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectDB();

    // Check if user exists
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ error: 'Invalid email or password' }, { status: 401 });
    }

    const code = Math.floor(100000 + Math.random() * 900000)

    const userForgot = await ForgotPassMapping.findOne({ email });

    if(userForgot) {
      userForgot.code = code
      userForgot.save()
    } else {
      const forgotUser = new ForgotPassMapping({email: user.email, code: code})
      forgotUser.save()
    }

    const transporter = nodemailer.createTransport({
      service: process.env.EMAIL_SERVICE,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASS,
      },
    });

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: 'Verify Your Account',
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
            <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #4CAF50; text-align: center;">Reset Your Password</h2>
              <p style="font-size: 16px; color: #333;">Hello,</p>
              <p style="font-size: 16px; color: #333;">
                We received a request to reset your password. Use the verification code below to proceed.
              </p>
              <div style="text-align: center; margin: 20px 0;">
                <div style="display: inline-block; padding: 12px 24px; font-size: 24px; font-weight: bold; background-color: #f0f0f0; border-radius: 6px; color: #333;">
                  ${code}
                </div>
              </div>
              <p style="font-size: 14px; color: #666;">This code is valid for 10 minutes. If you did not request a password reset, you can safely ignore this email.</p>
              <hr style="border: 0; height: 1px; background: #ddd; margin: 20px 0;">
              <p style="font-size: 12px; text-align: center; color: #999;">&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
            </div>
          </div>
        `
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ error: 'Verification Code sent' }, { status: 200 });
  } catch (error) {
    console.error('Error during login:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

