'use client';
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import styles from './JoinUsForm.module.css';

const JoinUsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    occupation: '',
    dob: '',
    image: null,
  });
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const formDataObj = new FormData();
    formDataObj.append('name', formData.name);
    formDataObj.append('email', formData.email);
    formDataObj.append('password', formData.password);
    formDataObj.append('occupation', formData.occupation);
    formDataObj.append('dob', formData.dob);
    if (formData.image) {
      formDataObj.append('image', formData.image);
    }

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        body: formDataObj,
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Registration successful. Signing you in...');

        // Automatically sign in the user
        const loginResult = await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });

        if (loginResult.error) {
          toast.error('Sign-in failed.');
        } else {
          toast.success('Signed in successfully.');
          router.push('/');
        }
      } else if (res.status === 409) {
        toast.error(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Server error');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  useEffect(() => {
    document.body.classList.add('blur-background');
    return () => {
      document.body.classList.remove('blur-background');
    };
  }, []);

  return (
    <div
      className={`${styles.container} flex items-center justify-center min-h-screen bg-gray-100 p-4`}
    >
      <div className='bg-white p-8 rounded shadow-lg w-full max-w-lg'>
        <h2 className='text-2xl font-bold mb-4 text-center'>Join Us</h2>
        <form
          onSubmit={handleRegister}
          encType='multipart/form-data'
          autoComplete='off'
        >
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='name'>
              Full Name
            </label>
            <input
              type='text'
              name='name'
              placeholder='Full Name'
              value={formData.name}
              onChange={handleInputChange}
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='email'>
              Email
            </label>
            <input
              type='email'
              name='email'
              placeholder='Email'
              value={formData.email}
              onChange={handleInputChange}
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='password'>
              Password
            </label>
            <input
              type='password'
              name='password'
              placeholder='Password'
              value={formData.password}
              onChange={handleInputChange}
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='occupation'>
              Occupation
            </label>
            <input
              type='text'
              name='occupation'
              placeholder='Occupation'
              value={formData.occupation}
              onChange={handleInputChange}
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='dob'>
              Date of Birth
            </label>
            <input
              type='date'
              name='dob'
              value={formData.dob}
              onChange={handleInputChange}
              className='w-full p-2 border rounded'
              required
            />
          </div>
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2' htmlFor='image'>
              Profile Image
            </label>
            <input
              type='file'
              name='image'
              onChange={handleInputChange}
              className='w-full p-2 border rounded'
            />
          </div>
          <div className='flex justify-between'>
            <button
              type='button'
              onClick={handleCancel}
              className='bg-red-500 text-white p-2 rounded w-full mr-2'
            >
              Cancel
            </button>
            <button
              type='submit'
              className={`bg-blue-500 text-white p-2 rounded w-full ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Processing...' : 'Join Us'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinUsForm;
