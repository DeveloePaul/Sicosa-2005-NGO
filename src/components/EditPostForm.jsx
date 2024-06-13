'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const EditPostForm = ({ postId, onClose }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
  });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${postId}`);
        if (!res.ok) {
          throw new Error('Failed to fetch post');
        }
        const data = await res.json();
        setForm({
          title: data.title,
          description: data.description,
        });
      } catch (error) {
        console.error('Error fetching post:', error);
        toast.error('Error fetching post');
      }
    };

    if (postId) {
      fetchPost();
    }
  }, [postId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user?.isAdmin) {
      toast.error('You do not have permission to edit posts.');
      return;
    }

    const post = {
      title: form.title,
      description: form.description,
    };

    try {
      const res = await fetch(`/api/blog/${postId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success('Post updated successfully!');
        router.push(`/blog/${data._id}`);
        onClose();
      } else {
        toast.error('Failed to update post');
      }
    } catch (error) {
      console.error('Error updating post:', error);
      toast.error('Error updating post');
    }
  };


  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Edit Post</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label
            htmlFor='title'
            className='block text-sm font-medium text-gray-700'
          >
            Title
          </label>
          <input
            type='text'
            name='title'
            id='title'
            value={form.title}
            onChange={handleChange}
            required
            className='mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='description'
            className='block text-sm font-medium text-gray-700'
          >
            Description
          </label>
          <textarea
            name='description'
            id='description'
            value={form.description}
            onChange={handleChange}
            required
            className='mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500'
          ></textarea>
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='btn btn-primary bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300'
          >
            Save Changes
          </button>
          <button
            type='button'
            onClick={onClose}
            className='ml-2 btn btn-secondary text-gray-700 py-2 px-4 rounded hover:text-gray-800 transition duration-300'
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPostForm;
