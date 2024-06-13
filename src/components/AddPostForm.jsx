'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const AddPostForm = ({ onClose }) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [form, setForm] = useState({
    title: '',
    description: '',
  });

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
      toast.error('You do not have permission to add posts.');
      return;
    }

    const post = {
      ...form,
      author: session.user.id,
    };

    try {
      const res = await fetch('/api/blog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(post),
      });

      if (res.ok) {
        const data = await res.json();
        toast.success('Post created successfully!');
        router.push(`/blog/${data._id}`);
        onClose();
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to create post');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      toast.error('Error creating post');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='w-full max-w-md mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 md:max-w-sm sm:max-w-xs'
    >
      <h2 className='text-2xl font-bold mb-4'>Add New Post</h2>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='title'
        >
          Title
        </label>
        <input
          id='title'
          name='title'
          type='text'
          value={form.title}
          onChange={handleChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          required
        />
      </div>
      <div className='mb-6'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='description'
        >
          Description
        </label>
        <textarea
          id='description'
          name='description'
          value={form.description}
          onChange={handleChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          rows='5'
          required
        />
      </div>
      <div className='flex items-center justify-between'>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          Add Post
        </button>
      </div>
    </form>
  );
};

export default AddPostForm;
