import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import connectDB from '@/config/db';
import Event from '@/models/Event';
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
    const author = formData.get('author');
    const imageFile = formData.get('image');

    let imageUrl = '';
    if (imageFile && typeof imageFile.arrayBuffer === 'function') {
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
      title,
      description,
      location,
      date,
      author,
      image: imageUrl,
    });

    await newEvent.save();

    return new Response(JSON.stringify(newEvent), {
      status: 201,
    });
  } catch (error) {
    console.error('Error creating event:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to create event',
        error: error.message,
      }),
      { status: 500 },
    );
  }
};