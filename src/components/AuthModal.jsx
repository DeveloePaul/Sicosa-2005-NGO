'use client';
import { useState, useEffect } from 'react';
import { signIn } from 'next-auth/react';
import { toast } from 'react-toastify';

const AuthModal = ({ isOpen, onClose, authMode }) => {
  const [isRegistering, setIsRegistering] = useState(authMode === 'register');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    occupation: '',
    dob: '',
    image: null,
  });

  useEffect(() => {
    setIsRegistering(authMode === 'register');
  }, [authMode]);

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

      if (res.ok) {
        const data = await res.json();
        toast.success('Registration successful. Signing you in...');
        await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });
        onClose();
      } else {
        const data = await res.json();
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Server error');
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    const result = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });
    if (result.error) {
      toast.error('Sign in failed');
    } else {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        isOpen ? 'block' : 'hidden'
      }`}
    >
      <div className='fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm'></div>
      <div className='bg-white p-8 rounded shadow-lg relative z-10'>
        <button className='absolute top-2 right-2 text-2xl' onClick={onClose}>
          ✖
        </button>
        <h2 className='text-2xl font-bold mb-4'>
          {isRegistering ? 'Register' : 'Sign In'}
        </h2>
        <form
          onSubmit={isRegistering ? handleRegister : handleSignIn}
          encType='multipart/form-data'
        >
          {isRegistering && (
            <>
              <input
                type='text'
                name='name'
                placeholder='Full Name'
                value={formData.name}
                onChange={handleInputChange}
                className='w-full mb-4 p-2 border rounded'
                required
              />
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleInputChange}
                className='w-full mb-4 p-2 border rounded'
                required
              />
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleInputChange}
                className='w-full mb-4 p-2 border rounded'
                required
              />
              <input
                type='text'
                name='occupation'
                placeholder='Occupation'
                value={formData.occupation}
                onChange={handleInputChange}
                className='w-full mb-4 p-2 border rounded'
                required
              />
              <input
                type='date'
                name='dob'
                value={formData.dob}
                onChange={handleInputChange}
                className='w-full mb-4 p-2 border rounded'
                required
              />
              <input
                type='file'
                name='image'
                onChange={handleInputChange}
                className='w-full mb-4 p-2 border rounded'
              />
              <div className='text-center mt-4'>
                <p>
                  Already have an account?{' '}
                  <span
                    className='text-blue-500 cursor-pointer'
                    onClick={() => setIsRegistering(false)}
                  >
                    Sign In
                  </span>
                </p>
              </div>
            </>
          )}
          {!isRegistering && (
            <>
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={formData.email}
                onChange={handleInputChange}
                className='w-full mb-4 p-2 border rounded'
                required
              />
              <input
                type='password'
                name='password'
                placeholder='Password'
                value={formData.password}
                onChange={handleInputChange}
                className='w-full mb-4 p-2 border rounded'
                required
              />
              <div className='text-center mt-4'>
                <p>
                  Don't have an account?{' '}
                  <span
                    className='text-blue-500 cursor-pointer'
                    onClick={() => setIsRegistering(true)}
                  >
                    Register
                  </span>
                </p>
              </div>
            </>
          )}
          <button
            type='submit'
            className='bg-blue-500 text-white p-2 rounded w-full'
          >
            {isRegistering ? 'Register' : 'Sign In'}
          </button>
          {!isRegistering && (
            <div className='text-center mt-4'>
              <button
                type='button'
                onClick={() => signIn('google')}
                className='bg-red-500 text-white p-2 rounded w-full mt-2'
              >
                Sign In with Google
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
