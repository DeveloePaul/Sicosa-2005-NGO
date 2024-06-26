import Link from 'next/link';

const CallToAction = () => {
  return (
    <section className='bg-gray-100 text-center py-10'>
      <h2 className='text-3xl font-bold mb-6'>Get Involved</h2>
      <div className='space-x-4'>
        <button className='btn btn-primary'>Volunteer</button>
        <Link href='/donate'>
          <button className='btn btn-secondary'>Donate</button>
        </Link>
      </div>
    </section>
  );
};

export default CallToAction;
