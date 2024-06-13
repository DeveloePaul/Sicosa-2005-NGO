'use client';
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const EventAddForm = ({ onClose }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setForm((prevForm) => ({
        ...prevForm,
        image: files[0],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!session?.user?.isAdmin) {
      toast.error('You do not have permission to add events.');
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('location', form.location);
    formData.append('date', form.date);
    formData.append('author', session.user.id); // Add the author field
    if (form.image) {
      formData.append('image', form.image);
    }

    try {
      const res = await fetch('/api/events', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        toast.success('Event created successfully!');
        router.push(`/events/${data._id}`);
        onClose();
      } else {
        const data = await res.json();
        toast.error(data.message || 'Failed to create event');
      }
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Add Event</h2>
      <form onSubmit={handleSubmit}>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Title
          </label>
          <input
            type='text'
            name='title'
            value={form.title}
            onChange={handleChange}
            required
            className='mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Description
          </label>
          <textarea
            name='description'
            value={form.description}
            onChange={handleChange}
            required
            className='mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          ></textarea>
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Location
          </label>
          <input
            type='text'
            name='location'
            value={form.location}
            onChange={handleChange}
            required
            className='mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Date
          </label>
          <input
            type='date'
            name='date'
            value={form.date}
            onChange={handleChange}
            required
            className='mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-sm font-medium text-gray-700'>
            Image
          </label>
          <input
            type='file'
            name='image'
            accept='image/*'
            onChange={handleChange}
            className='mt-1 p-2 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md'
          />
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300'
          >
            Add Event
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventAddForm;
