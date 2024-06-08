import Link from 'next/link';
import Image from 'next/image';

const EventHighlights = () => {
  return (
    <section className='bg-white py-10'>
      <div className='container mx-auto px-4'>
        <h2 className='text-4xl font-bold text-center mb-10 text-blue-600'>
          Upcoming Events
        </h2>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2'>
            <div className='bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105'>
              <Link href='/events'>
                <Image
                  src='/event.jpg'
                  alt='Event 1'
                  width={800}
                  height={400}
                  className='w-full h-64 object-cover'
                />
                <div className='p-6'>
                  <h3 className='text-3xl font-semibold mb-3'>Event 1</h3>
                  <p className='text-gray-700 mb-4'>
                    Details about Event 1 with more information and highlights.
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6'>
            <div className='bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105'>
              <Link href='/programs'>
                <Image
                  src='/images/programs.jpg'
                  alt='Event 2'
                  width={400}
                  height={200}
                  className='w-full h-32 object-cover'
                />
                <div className='p-6'>
                  <h3 className='text-2xl font-semibold mb-3'>Programs</h3>
                  <p className='text-gray-700 mb-4'>Details Programs</p>
                </div>
              </Link>
            </div>
            <div className='bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105'>
              <Link href='/blog'>
                <Image
                  src='/images/news.jpeg'
                  alt='Event 3'
                  width={400}
                  height={400}
                  className='w-full h-32 object-cover'
                />
                <div className='p-6'>
                  <h3 className='text-2xl font-semibold mb-3'>Blog</h3>
                  <p className='text-gray-700 mb-4'>News and Announcements</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventHighlights;
