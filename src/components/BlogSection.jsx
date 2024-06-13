'use client';
import { fetchPosts } from '@/utils/request';
import { useState, useEffect } from 'react';
import { getSession } from 'next-auth/react';
import PostModal from '@/components/PostModal';
import EditPostForm from '@/components/EditPostForm';
import { useRouter } from 'next/navigation';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BlogSection = () => {
  const [posts, setPosts] = useState([]);
  const [session, setSession] = useState(null);
  const [isEditPostModalOpen, setIsEditPostModalOpen] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // New state variable for loading
  const router = useRouter();

  useEffect(() => {
    const fetchAndSetPosts = async () => {
      setIsLoading(true); // Set loading to true before fetching
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
      setIsLoading(false); // Set loading to false after fetching
    };

    getSession().then((session) => {
      setSession(session);
      fetchAndSetPosts();
    });
  }, []);

  const openEditPostModal = (postId) => {
    setSelectedPostId(postId);
    setIsEditPostModalOpen(true);
  };

  const closeEditPostModal = () => {
    setIsEditPostModalOpen(false);
    setSelectedPostId(null);
  };

  const handleDeletePost = async (postId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this post?',
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/blog/${postId}`, { method: 'DELETE' });
      if (res.ok) {
        setPosts(posts.filter((post) => post._id !== postId));
        toast.success('Post deleted successfully');
      } else {
        console.error('Failed to delete post');
        toast.error('Failed to delete post');
      }
    } catch (error) {
      console.error('Error deleting post:', error);
      toast.error('Error deleting post');
    }
  };

  const handlePostClick = (postId) => {
    router.push(`/blog/${postId}`);
  };

  return (
    <section className='bg-gray-100 py-10'>
      <div className='container mx-auto px-4'>
        <h2 className='text-4xl font-bold text-center mb-10 text-blue-600'>
          News and Announcements
        </h2>
        {isLoading ? ( // Conditionally render Spinner based on isLoading state
          <div className='flex justify-center'>
            <Spinner />
          </div>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
            {posts.length > 0 ? (
              posts.map((post) => (
                <div
                  key={post._id}
                  className='relative bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer'
                  onClick={() => handlePostClick(post._id)}
                >
                  <div className='relative p-6 bg-white bg-opacity-75'>
                    <h3 className='text-2xl font-semibold mb-3'>
                      {post.title}
                    </h3>
                    <p className='text-gray-700 mb-4'>
                      {post.description.length > 50
                        ? `${post.description.substring(0, 50)}...`
                        : post.description}
                    </p>
                    <p className='text-gray-700 mb-4'>
                      <strong>Author:</strong> {post.author?.name || 'Admin'}
                    </p>
                    {session?.user?.isAdmin && (
                      <div className='flex mt-4'>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            openEditPostModal(post._id);
                          }}
                          className='btn btn-secondary text-blue-600 py-2 px-4 rounded hover:text-blue-700 transition duration-300 mr-2'
                        >
                          Edit
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeletePost(post._id);
                          }}
                          className='btn btn-danger text-red-600 py-2 px-4 rounded hover:text-red-700 transition duration-300'
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className='text-center text-gray-600'>
                No News and Announcements
              </p>
            )}
          </div>
        )}
        {isEditPostModalOpen && (
          <PostModal onClose={closeEditPostModal}>
            <EditPostForm
              postId={selectedPostId}
              onClose={closeEditPostModal}
            />
          </PostModal>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
