import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { fetchEvents } from '@/utils/request';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import EventEditForm from '@/components/EventEditForm';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [session, setSession] = useState(null);
  const [isEditEventModalOpen, setIsEditEventModalOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchAndSetEvents = async () => {
      const fetchedEvents = await fetchEvents();
      setEvents(fetchedEvents);
    };

    getSession().then((session) => {
      setSession(session);
      fetchAndSetEvents();
    });
  }, []);

  const openEditEventModal = (eventId) => {
    setSelectedEventId(eventId);
    setIsEditEventModalOpen(true);
  };

  const closeEditEventModal = () => {
    setIsEditEventModalOpen(false);
    setSelectedEventId(null);
  };

  const handleDeleteEvent = async (eventId) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this event?',
    );
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/events/${eventId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        setEvents(events.filter((event) => event._id !== eventId));
        toast.success('Event deleted successfully');
      } else {
        console.error('Failed to delete event');
        toast.error('Failed to delete event');
      }
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Error deleting event');
    }
  };

  const handleEventClick = (eventId) => {
    router.push(`/events/${eventId}`);
  };

  return (
    <section className='bg-gray-100 py-10'>
      <div className='container mx-auto px-4'>
        <h2 className='text-4xl font-bold text-center mb-10 text-blue-600'>
          Upcoming Events
        </h2>
        
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'>
          {events.map((event) => (
            <div
              key={event._id}
              className='relative bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105 cursor-pointer'
              onClick={() => handleEventClick(event._id)}
            >
              {event.image && (
                <div className='relative h-48'>
                  <Image
                    src={event.image}
                    alt={event.title}
                    layout='fill'
                    objectFit='cover'
                    className='absolute inset-0 w-full h-full'
                  />
                </div>
              )}
              <div className='relative p-6 bg-white bg-opacity-75'>
                <h3 className='text-2xl font-semibold mb-3'>{event.title}</h3>
                <p className='text-gray-700 mb-4'>{event.description}</p>
                <p className='text-gray-700 mb-2'>
                  <strong>Venue:</strong> {event.location}
                </p>
                <p className='text-gray-700 mb-4'>
                  <strong>Date:</strong>{' '}
                  {format(parseISO(event.date), 'MMMM dd, yyyy')}
                </p>
                <p className='text-gray-700 mb-4'>
                  <strong>Author:</strong> {event.author?.name || 'Admin'}
                </p>
                <button className='btn btn-primary bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300'>
                  RSVP
                </button>
                {session?.user?.isAdmin && (
                  <div className='flex mt-4'>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        openEditEventModal(event._id);
                      }}
                      className='btn btn-secondary text-blue-600 py-2 px-4 rounded hover:text-blue-700 transition duration-300 mr-2'
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteEvent(event._id);
                      }}
                      className='btn btn-danger text-red-600 py-2 px-4 rounded hover:text-red-700 transition duration-300'
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
        {isEditEventModalOpen && (
          <Modal onClose={closeEditEventModal}>
            <EventEditForm
              eventId={selectedEventId}
              onClose={closeEditEventModal}
            />
          </Modal>
        )}
      </div>
    </section>
  );
};

export default CalendarView;
