import EventEditForm from "@/components/EventEditForm"

const EventEditPage = () => {
  return (
    <section className='bg-white py-10'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-6'>Edit Event</h2>
        <EventEditForm />
      </div>
    </section>
  );
}

export default EventEditPage