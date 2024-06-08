import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import connectDB from '@/config/db';
import Event from '@/models/event';
import cloudinary from '@/config/cloudinary';

export const GET = async (request) => {
  try {
    await connectDB();
    const events = await Event.find({})
      .sort({ date: -1 })
      .populate('author', 'name');
    return new Response(JSON.stringify(events), { status: 200 });
  } catch (error) {
    console.error('Error fetching events:', error);
    return new Response(JSON.stringify({ message: 'Something went wrong' }), {
      status: 500,
    });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();
    const session = await getServerSession({ req: request, ...authOptions });

    console.log('Session:', session); // Log session details

    if (!session || !session.user.isAdmin) {
      return new Response(JSON.stringify({ message: 'Forbidden' }), {
        status: 403,
      });
    }

    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const location = formData.get('location');
    const date = formData.get('date');
    const imageFile = formData.get('image');

    if (!title || !description || !location || !date) {
      return new Response(
        JSON.stringify({ message: 'Missing required fields' }),
        { status: 400 },
      );
    }

    let imageUrl = '';
    if (imageFile) {
      const buffer = await imageFile.arrayBuffer();
      const uploadResponse = await cloudinary.uploader.upload(
        `data:${imageFile.type};base64,${Buffer.from(buffer).toString(
          'base64',
        )}`,
        { upload_preset: 'ml_default', folder: 'events' },
      );
      imageUrl = uploadResponse.secure_url;
    }

    const newEvent = new Event({
      author: session.user._id, // Use _id instead of id
      title,
      description,
      location,
      date,
      image: imageUrl,
    });

    await newEvent.save();

    return new Response(
      JSON.stringify({ ...newEvent.toObject(), image: imageUrl }),
      { status: 201 },
    );
  } catch (error) {
    console.error('Error creating event:', error);
    return new Response(
      JSON.stringify({ message: 'Failed to add event', error: error.message }),
      { status: 500 },
    );
  }
};
