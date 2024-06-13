import EditPostForm from '@/components/EventEditForm';

const EditPostPage = () => {
  return (
    <section className='bg-white py-10'>
      <div className='container mx-auto px-4'>
        <h2 className='text-3xl font-bold text-center mb-6'>Edit Event</h2>
        <EditPostForm />
      </div>
    </section>
  );
};

export default EditPostPage;
