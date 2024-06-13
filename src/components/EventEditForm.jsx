'use client';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

const EventEditForm = ({ onClose, eventId }) => {
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    image: null,
  });

  useEffect(() => {
    const fetchEvent = async () => {
      const res = await fetch(`/api/events/${eventId}`);
      const data = await res.json();
      setForm({
        title: data.title,
        description: data.description,
        location: data.location,
        date: data.date.split('T')[0], // Format the date correctly
        image: data.image,
      });
    };

    fetchEvent();
  }, [eventId]);

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
      toast.error('You do not have permission to edit events.');
      return;
    }

    const formData = new FormData();
    formData.append('title', form.title);
    formData.append('description', form.description);
    formData.append('location', form.location);
    formData.append('date', form.date);
    if (form.image && typeof form.image !== 'string') {
      formData.append('image', form.image);
    }

    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: 'PUT',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        toast.success('Event updated successfully!');
        router.push(`/events/${data._id}`); // Redirect to the single event page
        onClose(); // Close the modal
      } else {
        toast.error('Failed to update event');
      }
    } catch (error) {
      console.error('Error updating event:', error);
      toast.error('Error updating event');
    }
  };

  return (
    <div>
      <h2 className='text-2xl font-bold mb-4'>Edit Event</h2>
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

export default EventEditForm;
