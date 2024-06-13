import crypto from 'crypto';
import nodemailer from 'nodemailer';
import connectDB from '@/config/db';
import User from '@/models/User';
import { NextResponse } from 'next/server';

export const POST = async (req) => {
  await connectDB();

  const { email } = await req.json();

  if (!email) {
    return NextResponse.json({ message: 'Email is required' }, { status: 400 });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 });
    }

    // Generate a token
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Set token and expiration on user
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour
    await user.save();

    // Send email
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      to: user.email,
      from: process.env.EMAIL_USER,
      subject: 'Password Reset Request',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
             Please click on the following link, or paste this into your browser to complete the process:\n\n
             http://${req.headers.get(
               'host',
             )}/reset-password?token=${resetToken}\n\n
             If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Password reset link sent' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 },
    );
  }
};
