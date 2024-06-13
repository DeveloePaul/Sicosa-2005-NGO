'use client';
import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  useEffect(() => {
    if (!token) {
      toast.error('Invalid or missing token');
      router.push('/');
    }
  }, [token, router]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const res = await fetch('/api/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Password has been reset');
        router.push('/signin');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error('Error:', error);
      // toast.error('Server error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <form
        onSubmit={handleResetPassword}
        className='bg-white p-8 rounded shadow-lg'
      >
        <h2 className='text-2xl font-bold mb-4'>Reset Password</h2>
        <input
          type='password'
          name='password'
          placeholder='New Password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className='w-full mb-4 p-2 border rounded'
          required
        />
        <button
          type='submit'
          className={`bg-blue-500 text-white p-2 rounded w-full ${
            isLoading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Reset Password'}
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
