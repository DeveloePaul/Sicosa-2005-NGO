'use client';
import React, { useState } from 'react';
import { format, parseISO } from 'date-fns';
import Image from 'next/image';
import { updateUser, deleteUser } from '@/utils/request';
import { useRouter } from 'next/navigation';
import styles from './MembersDirectory.module.css';

const MembersDirectoryClient = ({ users, session }) => {
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [search, setSearch] = useState('');
  const router = useRouter();

  const handleUpdateUser = async (id, updates) => {
    await updateUser(id, updates);
    const updatedUsers = filteredUsers
      .map((user) => (user._id === id ? { ...user, ...updates } : user))
      .filter((user) => !user.isExco); // Filter out users with isExco true
    setFilteredUsers(updatedUsers.sort((a, b) => a.name.localeCompare(b.name)));
  };

  const handleDeleteUser = async (id) => {
    await deleteUser(id);
    const updatedUsers = filteredUsers.filter((user) => user._id !== id);
    setFilteredUsers(updatedUsers);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearch(value);
    const searchResults = users.filter((user) =>
      user.name.toLowerCase().includes(value),
    );
    setFilteredUsers(searchResults);
  };

  return (
    <section className={styles.container}>
      <div>
        <h2 className={styles.title}>Members Directory</h2>
        <input
          type='text'
          placeholder='Search members'
          value={search}
          onChange={handleSearch}
          className={`${styles.input} input input-bordered w-full max-w-md mx-auto mb-6`}
        />
        <div className={styles.grid}>
          {filteredUsers.map((user) => (
            <div key={user._id} className={styles.card}>
              <div className={styles.imageContainer}>
                <Image
                  src={user.image}
                  alt={user.name}
                  width={400}
                  height={200}
                  className={styles.image}
                />
              </div>
              <div className={styles.cardBody}>
                <h3 className={styles.cardTitle}>{user.name}</h3>
                <p>Occupation: {user.occupation}</p>
                <p className={styles.textGray}>
                  Birthday: {format(parseISO(user.dob), 'MMMM dd')}
                </p>
                {session?.user?.isAdmin && (
                  <>
                    <button
                      onClick={() =>
                        handleUpdateUser(user._id, {
                          isAdmin: !user.isAdmin,
                        })
                      }
                    >
                      {user.isAdmin ? 'Revoke Admin' : 'Make Admin'}
                    </button>
                    <button
                      onClick={() =>
                        handleUpdateUser(user._id, { isExco: !user.isExco })
                      }
                    >
                      {user.isExco ? 'Remove from Executive' : 'Make Executive'}
                    </button>
                    <button onClick={() => handleDeleteUser(user._id)}>
                      Delete
                    </button>
                    <select
                      value={user.position || ''}
                      onChange={(e) =>
                        handleUpdateUser(user._id, {
                          position: e.target.value,
                        })
                      }
                    >
                      <option value=''>Select Position</option>
                      <option value='Chairman'>Chairman</option>
                      <option value='Vice-President'>Vice-President</option>
                      <option value='Secretary'>Secretary</option>
                      <option value='Financial Officer'>
                        Financial Officer
                      </option>
                      <option value='Director of Socials'>
                        Director of Socials
                      </option>
                      <option value='CSO'>CSO</option>
                      <option value='CTO'>CTO</option>
                      <option value='Deputy CTO'>Deputy CTO</option>
                      <option value='Director Medicals'>
                        Director Medicals
                      </option>
                      <option value='PRO'>PRO</option>
                      <option value='Disciplinary Officer'>
                        Disciplinary Officer
                      </option>
                      <option value='Chest Bearer'>Chest Bearer</option>
                    </select>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MembersDirectoryClient;
