import React from 'react';
import { fetchEvent, fetchEvents } from '@/utils/request';
import Spinner from '@/components/Spinner';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { useRouter } from 'next/router';

const SingleEventPage = ({ event }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Spinner loading={true} />;
  }

  if (!event) {
    return <p className='text-center text-xl'>Event not found.</p>;
  }

  const handleBackToEvents = () => {
    router.push('/events');
  };

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

export async function getStaticPaths() {
  const events = await fetchEvents();
  const paths = events.map((event) => ({
    params: { id: event.id.toString() },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const event = await fetchEvent(params.id);

  return {
    props: {
      event,
    },
    revalidate: 10,
  };
}

export default SingleEventPage;
