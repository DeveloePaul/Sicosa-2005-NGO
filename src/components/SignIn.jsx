// pages/sign-in.jsx
'use client';
import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignIn = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
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
        await signIn('credentials', {
          redirect: false,
          email: formData.email,
          password: formData.password,
        });
        router.push('/');
      } else if (res.status === 409) {
        toast.error(data.message);
        setIsRegistering(false);
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

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await signIn('credentials', {
      redirect: false,
      email: formData.email,
      password: formData.password,
    });
    if (result.error) {
      toast.error('Sign in failed. User not registered.');
      setIsRegistering(true);
    } else {
      router.push('/');
    }
    setIsLoading(false);
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.info('Password reset link sent to your email.');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Server error');
    } finally {
      setIsLoading(false);
      setIsForgotPassword(false);
    }
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <div className='container mx-auto p-4'>
      <h2 className='text-2xl font-bold mb-4'>
        {isForgotPassword
          ? 'Forgot Password'
          : isRegistering
          ? 'Register'
          : 'Sign In'}
      </h2>
      <form
        onSubmit={
          isForgotPassword
            ? handleForgotPassword
            : isRegistering
            ? handleRegister
            : handleSignIn
        }
        encType='multipart/form-data'
        autoComplete='off'
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
              placeholder='Date of Birth'
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
        {!isRegistering && !isForgotPassword && (
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
            <div className='flex items-center mb-4'>
              <input type='checkbox' id='keepSignedIn' className='mr-2' />
              <label htmlFor='keepSignedIn'>Keep me signed in</label>
            </div>
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
              <p>
                <span
                  className='text-blue-500 cursor-pointer'
                  onClick={() => setIsForgotPassword(true)}
                >
                  Forgot Password?
                </span>
              </p>
            </div>
          </>
        )}
        {isForgotPassword && (
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
            <div className='text-center mt-4'>
              <p>
                Remembered your password?{' '}
                <span
                  className='text-blue-500 cursor-pointer'
                  onClick={() => setIsForgotPassword(false)}
                >
                  Back to Sign In
                </span>
              </p>
            </div>
          </>
        )}
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
            {isLoading
              ? 'Processing...'
              : isRegistering
              ? 'Register'
              : isForgotPassword
              ? 'Send Reset Link'
              : 'Sign In'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
