import Link from 'next/link';
import Image from 'next/image';

const EventHighlights = () => {
  return (
    <section className='bg-white py-10'>
      <div className='container mx-auto px-8 md:px-12'>
        <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
          <div className='lg:col-span-2'>
            <div className='bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105'>
              <Link href='/events'>
                <div className='relative w-full h-64'>
                  <Image
                    src='/event.jpg'
                    alt='Events'
                    fill={true}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-3xl font-semibold mb-3'>Events</h3>
                  <p className='text-gray-700 mb-4'>
                    Details about Events with more information and highlights.
                  </p>
                </div>
              </Link>
            </div>
          </div>
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6'>
            <div className='bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105'>
              <Link href='/programs'>
                <div className='relative w-full h-64'>
                  <Image
                    src='/programs.png'
                    alt='Programs'
                    fill={true}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <div className='p-6'>
                  <h3 className='text-2xl font-semibold mb-3'>Programs</h3>
                  <p className='text-gray-700 mb-4'>Programs and Initiatives</p>
                </div>
              </Link>
            </div>
            <div className='bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 hover:scale-105'>
              <Link href='/blog'>
                <div className='relative w-full h-64'>
                  <Image
                    src='/blog.png'
                    alt='Blog'
                    fill={true}
                    style={{ objectFit: 'cover' }}
                  />
                </div>
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
