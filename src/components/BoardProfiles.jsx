'use client';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchExcos } from '@/utils/request';
import styles from './BoardProfiles.module.css';

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
      const fetchedExcos = await fetchExcos();
      const execs = fetchedExcos.filter((exco) => exco.isExco && exco.position);
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
    <section className={styles.container}>
      <div>
        <h2 className={styles.title}>Board Members</h2>
        <div className={styles.grid}>
          {executives.map((executive) => (
            <div key={executive._id} className={styles.card}>
              <div className={styles.imageContainer}>
                <Image
                  src={executive.image}
                  alt={executive.name}
                  width={200}
                  height={200}
                  className={styles.image}
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{executive.position}</h3>
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
