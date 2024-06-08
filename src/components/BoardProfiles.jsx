'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchUsers } from '@/utils/request';

const positionsOrder = [
  'Chairman',
  'Vice-President',
  'Secretary',
  'Financial Officer',
  'Director of Socials',
  'CSO',
  'CTO',
  'Deputy CTO',
  'Director Medicals',
  'PRO',
  'Disciplinary Officer',
  'Chest Bearer',
];

const BoardProfiles = () => {
  const [executives, setExecutives] = useState([]);

  useEffect(() => {
    const fetchAndSetExecutives = async () => {
      const fetchedUsers = await fetchUsers();
      const execs = fetchedUsers.filter((user) => user.isExco && user.position);
      execs.sort(
        (a, b) =>
          positionsOrder.indexOf(a.position) -
          positionsOrder.indexOf(b.position),
      );
      setExecutives(execs);
    };

    fetchAndSetExecutives();
  }, []);

  return (
    <section className='bg-white py-10'>
      <div className='container mx-auto'>
        <h2 className='text-3xl font-bold text-center mb-6'>Board Members</h2>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
          {executives.map((executive) => (
            <div key={executive._id} className='card bg-base-100 shadow-xl'>
              <div className='relative h-48'>
                <Image
                  src={executive.image}
                  alt={executive.name}
                  layout='fill'
                  objectFit='cover'
                  className='absolute inset-0 w-full h-full'
                />
              </div>
              <div className='card-body'>
                <h3 className='card-title'>{executive.position}</h3>
                <p>{executive.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BoardProfiles;
