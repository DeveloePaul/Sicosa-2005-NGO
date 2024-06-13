import React from 'react';
import { fetchPost, fetchPosts } from '@/utils/request';
import Spinner from '@/components/Spinner';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';

const SinglePost = ({ post }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Spinner loading={true} />;
  }

  if (!post) {
    return <p className='text-center text-xl'>Post not found.</p>;
  }

  const handleBackToPosts = () => {
    router.push('/blog');
  };

  return (
    <div className='container mx-auto px-4 py-10'>
      <div className='bg-white shadow-lg rounded-lg overflow-hidden animate-fadeInUp'>
        <div className='p-6'>
          <h1 className='text-4xl font-bold mb-4'>{post.title}</h1>
          <p className='text-gray-700 mb-6'>{post.description}</p>
          <button
            onClick={handleBackToPosts}
            className='btn btn-primary bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300'
          >
            Back to Posts
          </button>
        </div>
      </div>
    </div>
  );
};

export async function getStaticPaths() {
  const posts = await fetchPosts();
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const post = await fetchPost(params.id);

  return {
    props: {
      post,
    },
    revalidate: 10,
  };
}

export default SinglePost;
