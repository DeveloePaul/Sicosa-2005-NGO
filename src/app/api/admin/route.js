import { getSession } from 'next-auth/react';
import connectDB from '@/config/db';
import Event from '@/models/event';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (!session || !session.user.isAdmin) {
    return res.status(403).json({ message: 'Forbidden' });
  }

  await connectDB();

  if (req.method === 'GET') {
    // Fetch content
    const events = await Event.find();
    return res.status(200).json(events);
  }

  if (req.method === 'POST') {
    // Create or update content
    const { title, description, location, date } = req.body;
    const newEvent = new Event({
      title,
      description,
      location,
      date,
      author: session.user.id,
    });
    await newEvent.save();
    return res.status(201).json(newEvent);
  }

  res.status(405).end(); // Method Not Allowed
}
