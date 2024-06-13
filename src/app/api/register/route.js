import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import connectDB from '@/config/db';
import User from '@/models/User';
import cloudinary from '@/config/cloudinary';

export const POST = async (req) => {
  await connectDB();
  const formData = await req.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const password = formData.get('password');
  const occupation = formData.get('occupation');
  const dob = formData.get('dob');
  const imageFile = formData.get('image');

  try {
    if (!name || !email || !password || !occupation || !dob) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 },
      );
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: 'User already registered' }),
        { status: 409 }, // 409 Conflict
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let imageUrl = '';
    if (imageFile) {
      const buffer = await imageFile.arrayBuffer();
      const uploadResponse = await cloudinary.uploader.upload(
        `data:${imageFile.type};base64,${Buffer.from(buffer).toString(
          'base64',
        )}`,
        { upload_preset: 'ml_default', folder: 'members' },
      );
      imageUrl = uploadResponse.secure_url;
    }

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      occupation,
      dob,
      image: imageUrl,
    });

    await newUser.save();

    return new Response(
      JSON.stringify({ ...newUser.toObject(), image: imageUrl }),
      { status: 201 },
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: 'User registration failed' },
      { status: 500 },
    );
  }
};
