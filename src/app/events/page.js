'use client';
import CalendarView from '@/components/CalendarView';
import { getSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import Modal from '@/components/Modal';
import EventAddForm from '@/components/EventAddForm';


const EventsPage = () => {
  const [session, setSession] = useState(null);
  const [isAddEventModalOpen, setIsAddEventModalOpen] = useState(false);

  useEffect(() => {
    getSession().then((session) => {
      setSession(session);
    });
  }, []);

  const openAddEventModal = () => {
    setIsAddEventModalOpen(true);
  };

  const closeAddEventModal = () => {
    setIsAddEventModalOpen(false);
  };

  return (
    <div>
      {session?.user?.isAdmin && (
        <button
          onClick={openAddEventModal}
          className='btn btn-primary bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300'
        >
          Add Event
        </button>
      )}
      <CalendarView />
      {isAddEventModalOpen && (
        <Modal onClose={closeAddEventModal}>
          <EventAddForm />
        </Modal>
      )}
    </div>
  );
};

export default EventsPage;
