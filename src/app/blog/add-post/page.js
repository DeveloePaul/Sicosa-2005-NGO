'use client';
import BlogSection from '@/components/BlogSection';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import PostModal from '@/components/PostModal';
import AddPostForm from '@/components/AddPostForm';

const AddPost = () => {
  const [session, setSession] = useState(null);
  const [isAddPostModalOpen, setIsAddPostModalOpen] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      setSession(session);
    });
  }, []);

  const openAddPostModal = () => {
    setIsAddPostModalOpen(true);
  };

  const closeAddPostModal = () => {
    setIsAddPostModalOpen(false);
  };

  return (
    <div>
      {session?.user?.isAdmin && (
        <button
          onClick={openAddPostModal}
          className='btn btn-primary bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300'
        >
          Add Post
        </button>
      )}
      <BlogSection />
      {isAddPostModalOpen && (
        <PostModal onClose={closeAddPostModal}>
          <AddPostForm />
        </PostModal>
      )}
    </div>
  );
};

export default AddPost;
