import EventAddForm from '@/components/EventAddForm';

const AddEventPage = () => {
  return (
    <section className='bg-white py-10'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-6'>Add Event</h2>
        <EventAddForm />
      </div>
    </section>
  );
};

export default AddEventPage;
