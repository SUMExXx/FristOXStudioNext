import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import connectDB from '@/lib/mongodb';
import UnverifiedUser from '@/lib/models/unverifieduser';
import User from '@/lib/models/user';
import { transporterCommon } from '@/lib/utils/email';

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: 'Email and password are required' }, { status: 400 });
    }

    await connectDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'Email is already registered' }, { status: 409 });
    }

    await UnverifiedUser.findOneAndDelete({ email });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user in MongoDB
    const user = new UnverifiedUser({ email, hashedPassword });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Verify Your Account',
      html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f4f4f4;">
          <div style="max-width: 600px; margin: auto; background: white; padding: 20px; border-radius: 10px; box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);">
              <h2 style="color: #4CAF50; text-align: center;">Verify Your Account</h2>
              <p style="font-size: 16px; color: #333;">Hello,</p>
              <p style="font-size: 16px; color: #333;">
              Thank you for signing up! Please verify your account by clicking the button below.
              </p>
              <div style="text-align: center; margin: 20px 0;">
              <a href="${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify?email=${email}&token=${user._id}" 
                  style="padding: 12px 20px; font-size: 16px; color: white; background-color: #4CAF50; text-decoration: none; border-radius: 5px; display: inline-block;">
                  Verify My Account
              </a>
              </div>
              <p style="font-size: 14px; color: #666;">If you did not request this, you can ignore this email.</p>
              <hr style="border: 0; height: 1px; background: #ddd; margin: 20px 0;">
              <p style="font-size: 12px; text-align: center; color: #999;">&copy; ${new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
          </div>
      `
    };

    await transporterCommon.sendMail(mailOptions);

    await user.save();

    return NextResponse.json({ message: 'User registered. Check your email to verify.' }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
