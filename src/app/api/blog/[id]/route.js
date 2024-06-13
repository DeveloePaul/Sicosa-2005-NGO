import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/utils/authOptions';
import connectDB from '@/config/db';
import Post from '@/models/Blog';

// GET /api/blog/:id
export const GET = async (request, { params }) => {
  try {
    await connectDB();

    const post = await Post.findById(params.id);

    if (!post) {
      return NextResponse.json({ message: 'Post Not Found' }, { status: 404 });
    }

    return NextResponse.json(post, { status: 200 });
  } catch (error) {
    console.error('Error fetching post:', error);
    return NextResponse.json(
      { message: 'Something went wrong' },
      { status: 500 },
    );
  }
};

// PUT /api/blog/:id
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

    // Parse the request body as JSON
    const { title, description } = await request.json();

    // Get post to update
    const post = await Post.findById(id);
    if (!post) {
      return new Response(JSON.stringify({ message: 'Post not found' }), {
        status: 404,
      });
    }

    post.title = title;
    post.description = description;

    // Save the updated post
    await post.save();

    return new Response(JSON.stringify({ ...post.toObject() }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error updating post:', error);
    return new Response(
      JSON.stringify({
        message: 'Failed to update post',
        error: error.message,
      }),
      { status: 500 },
    );
  }
};

// DELETE /api/blog/:id
export const DELETE = async (request, { params }) => {
  try {
    const postId = params.id;
    await connectDB();
    const session = await getServerSession({ req: request, ...authOptions });

    if (!session || !session.user.isAdmin) {
      return NextResponse.json({ message: 'Forbidden' }, { status: 403 });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return NextResponse.json({ message: 'Post not found' }, { status: 404 });
    }

    await post.deleteOne();

    return NextResponse.json(
      { message: 'Post deleted successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json(
      { message: 'Failed to delete post', error: error.message },
      { status: 500 },
    );
  }
};
