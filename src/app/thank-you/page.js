'use client';
import React from 'react';
import Link from 'next/link';

const ThankYouPage = () => {
  return (
    <section className='bg-white text-black text-center py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto'>
        <h1 className='text-3xl font-bold'>Thank You!</h1>
        <p className='mt-4 text-xl'>
          Thank you for your generous donation! Your support helps us continue
          our mission.
        </p>
        <div className='mt-6'>
          <Link href='/'>
            <a className='btn btn-primary'>Go Back Home</a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ThankYouPage;
