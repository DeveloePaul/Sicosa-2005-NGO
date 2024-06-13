'use client';
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { fetchEvent } from '@/utils/request';
import Spinner from '@/components/Spinner';

const SingleEventPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEventData = async () => {
      if (!id) return;
      try {
        const event = await fetchEvent(id);
        setEvent(event);
      } catch (error) {
        console.error('Error fetching event:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchEventData();
  }, [id]);

  const handleBackToEvents = () => {
    router.push('/events');
  };

  if (loading) {
    return <Spinner loading={loading} />;
  }

  if (!event) {
    return <p className='text-center text-xl'>Event not found.</p>;
  }

  return (
    <div className='container mx-auto px-4 py-10'>
      <div className='bg-white shadow-lg rounded-lg overflow-hidden animate-fadeInUp'>
        <div className='relative w-full h-96'>
          <Image
            src={event.image || '/images/placeholder.jpg'}
            alt={event.title}
            layout='fill'
            style={{ objectFit: 'cover' }}
            className='absolute inset-0 w-full h-full'
            priority
          />
        </div>
        <div className='p-6'>
          <h1 className='text-4xl font-bold mb-4'>{event.title}</h1>
          <p className='text-gray-700 mb-6'>{event.description}</p>
          <p className='text-gray-700 mb-2'>
            <strong>Venue:</strong> {event.location}
          </p>
          <p className='text-gray-700 mb-6'>
            <strong>Date:</strong>{' '}
            {format(parseISO(event.date), 'MMMM dd, yyyy')}
          </p>
          <button
            onClick={handleBackToEvents}
            className='btn btn-primary bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300'
          >
            Back to Events
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleEventPage;
