'use client';
import { useState } from 'react';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('Sending...');
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setStatus('Failed to send message. Please try again later.');
      }
    } catch (error) {
      console.error('Error:', error);
      setStatus('Failed to send message. Please try again later.');
    }
  };

  return (
    <div className='min-h-screen bg-base-200 p-10'>
      <h1 className='text-4xl font-bold text-center mb-10'>Contact Us</h1>
      <form className='space-y-4' onSubmit={handleSubmit}>
        <div>
          <label className='block'>Name:</label>
          <input
            type='text'
            name='name'
            className='input input-bordered w-full'
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className='block'>Email:</label>
          <input
            type='email'
            name='email'
            className='input input-bordered w-full'
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label className='block'>Message:</label>
          <textarea
            name='message'
            className='textarea textarea-bordered w-full'
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
      {status && <p className='mt-4 text-center'>{status}</p>}
    </div>
  );
};

export default ContactUs;
