import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const HeroSection = () => {
  return (
    <section className='bg-blue-600 text-white text-center py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='flex flex-col items-center'>
          <Image
            src='/logo.jpg'
            alt='SICOSA-2005 Logo'
            width={100}
            height={100}
            className='mb-8'
          />
          <h1 className='text-5xl font-bold leading-tight'>
            Welcome to SICOSA-2005
          </h1>
          <p className='mt-4 text-xl max-w-2xl'>
            At SICOSA-2005, we believe in fostering strong connections among our
            alumni community, providing valuable resources, and supporting the
            continued growth and success of our members. Our mission is to
            create a vibrant network where alumni can reconnect, give back,
            expand their horizons, and advance their careers.
          </p>
          <p className='mt-4 text-xl max-w-2xl'>
            Join us as we embark on this journey together!
          </p>
          <div className='mt-6 flex space-x-4'>
            <Link href='/join-us'>
              <button className='btn btn-primary'>Join Us</button>
            </Link>
            <Link href='/donate'>
              <button className='btn btn-secondary'>Donate</button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
