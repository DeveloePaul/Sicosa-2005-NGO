import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import connectDB from '@/config/db';
import User from '@/models/User';
import cloudinary from '@/config/cloudinary';

// DELETE /api/members/:id
export const DELETE = async (request, { params }) => {
  try {
    const memberId = params.id;
    await connectDB();
    const session = await getServerSession({ req: request, ...authOptions });

    // Check for Admin Session
    if (!session || !session.user.isAdmin) {
      return new Response(JSON.stringify({ message: 'Forbidden' }), {
        status: 403,
      });
    }

    const member = await User.findById(memberId);
    if (!member) {
      return new Response(JSON.stringify({ message: 'Member not found' }), {
        status: 404,
      });
    }

    await member.deleteOne();

    return new Response(
      JSON.stringify({ message: 'Member removed successfully' }),
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting member:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to delete member',
        error: error.message,
      }),
      { status: 500 },
    );
  }
};

// PATCH /api/members/:id
export const PATCH = async (request, { params }) => {
  try {
    const memberId = params.id;
    await connectDB();
    const session = await getServerSession({ req: request, ...authOptions });

    if (!session || !session.user.isAdmin) {
      return new Response(JSON.stringify({ message: 'Forbidden' }), {
        status: 403,
      });
    }

    const updates = await request.json();
    const member = await User.findByIdAndUpdate(memberId, updates, {
      new: true,
    });

    if (!member) {
      return new Response(JSON.stringify({ message: 'Member not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(member), { status: 200 });
  } catch (error) {
    console.error('Error updating member:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to update member',
        error: error.message,
      }),
      { status: 500 },
    );
  }
};

// Marking the route as dynamic
export const config = {
  runtime: 'experimental-edge', // or 'nodejs'
  unstable_allowDynamic: ['headers', 'cookies'], // This allows the dynamic server behavior
};
