'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { fetchPost } from '@/utils/request';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

const SinglePost = () => {
  const { id } = useParams();
  const router = useRouter();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      if (!id) return;
      try {
        const post = await fetchPost(id);
        setPost(post);
      } catch (error) {
        setError('Failed to load post');
        console.error('Error fetching post:', error);
        toast.error('Failed to load post');
      } finally {
        setLoading(false);
      }
    };
    fetchPostData();
  }, [id]);

  const handleBackToPosts = () => {
    router.push('/blog');
  };

  if (loading) {
    return <Spinner loading={loading} />;
  }

  if (error) {
    return <p className='text-center text-xl'>{error}</p>;
  }

  if (!post) {
    return <p className='text-center text-xl'>Post not found.</p>;
  }

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

export default SinglePost;
