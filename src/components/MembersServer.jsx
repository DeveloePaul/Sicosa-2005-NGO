import React from 'react';
import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from '@/utils/authOptions';
import connectDB from '@/config/db';
import User from '@/models/User';
import MembersDirectory from '@/components/MembersDirectory';

const MembersServer = async () => {
  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session) {
   redirect('/sign-in');
   return null;
  }

  const users = await User.find({ isExco: false }).sort({ name: 1 });
  const usersData = users.map((user) => ({
    _id: user._id.toString(),
    name: user.name,
    occupation: user.occupation,
    dob: user.dob.toISOString(),
    image: user.image,
    isAdmin: user.isAdmin,
    position: user.position,
  }));

  return <MembersDirectory users={usersData} session={session} />;
};

export default MembersServer;
