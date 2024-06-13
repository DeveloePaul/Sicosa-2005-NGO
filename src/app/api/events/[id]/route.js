import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import connectDB from '@/config/db';
import Event from '@/models/Event';
import cloudinary from '@/config/cloudinary';

// GET /api/events/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const event = await Event.findById(params.id);

    if (!event) {
      return new Response('Event Not Found', { status: 404 });
    }

    return new Response(JSON.stringify(event), {
      status: 200,
    });
  } catch (error) {
    return new Response('Something went wrong', { status: 500 });
  }
};

// PUT /api/events/:id
export const PUT = async (request, { params }) => {
  try {
    await connectDB();
    const session = await getServerSession({ req: request, ...authOptions });

    if (!session || !session.user.isAdmin) {
      return new Response(JSON.stringify({ message: 'Forbidden' }), {
        status: 403,
      });
    }

    const { id } = params;

    const formData = await request.formData();
    const title = formData.get('title');
    const description = formData.get('description');
    const location = formData.get('location');
    const date = formData.get('date');
    const imageFile = formData.get('image');

    // Get event to update
    const event = await Event.findById(id);
    if (!event) {
      return new Response(JSON.stringify({ message: 'Event not found' }), {
        status: 404,
      });
    }

    let imageUrl = event.image;
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

    event.title = title;
    event.description = description;
    event.location = location;
    event.date = date;
    event.image = imageUrl;

    // Save the updated event
    await event.save();

    return new Response(
      JSON.stringify({ ...event.toObject(), image: imageUrl }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error updating event:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to update event',
        error: error.message,
      }),
      { status: 500 },
    );
  }
};


// DELETE /api/events/:id
export const DELETE = async (request, { params }) => {
  try {
    const eventId = params.id;
    await connectDB();
    const session = await getServerSession({ req: request, ...authOptions });

    // Check for Admin Session
    if (!session || !session.user.isAdmin) {
      return new Response(JSON.stringify({ message: 'Forbidden' }), {
        status: 403,
      });
    }

    const event = await Event.findById(eventId);
    if (!event) {
      return new Response(JSON.stringify({ message: 'Event not found' }), {
        status: 404,
      });
    }

    await event.deleteOne();

    return new Response(
      JSON.stringify({ message: 'Event deleted successfully' }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting event:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to delete event',
        error: error.message,
      }),
      { status: 500 },
    );
  }
};
