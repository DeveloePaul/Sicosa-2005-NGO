import connectDB from '@/config/db';
import User from '@/models/User';

export const GET = async (request) => {
  try {
    await connectDB();
    // Removed session check to allow public access to members data
    const users = await User.find({});
    return new Response(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.error('Error fetching users:', error);
    return new Response(JSON.stringify({ message: 'Something went wrong' }), {
      status: 500,
    });
  }
};
