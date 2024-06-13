import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import connectDB from '@/config/db';
import Post from '@/models/Blog';

export const GET = async (req) => {
  try {
    await connectDB();

    // Extract query parameter for sorting
    const { searchParams } = new URL(req.url);
    const sort = searchParams.get('sort') || '-updatedAt'; // Default to sorting by updatedAt in descending order

    const posts = await Post.find({}).sort(sort).populate('author', 'name');
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return new Response(JSON.stringify({ message: 'Something went wrong' }), {
      status: 500,
    });
  }
};

export const POST = async (request) => {
  try {
    await connectDB();

    const session = await getServerSession({
      req: request,
      ...authOptions,
    });

    if (!session || !session.user.isAdmin) {
      return new Response(JSON.stringify({ message: 'Forbidden' }), {
        status: 403,
      });
    }

    const formData = await request.json();
    const { title, description, author } = formData;

    const newPost = new Post({
      title,
      description,
      author,
    });

    await newPost.save();

    return new Response(JSON.stringify(newPost), {
      status: 201,
    });
  } catch (error) {
    console.error('Error creating new post:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to create new post',
        error: error.message,
      }),
      { status: 500 },
    );
  }
};
