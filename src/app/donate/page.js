'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const DonatePage = () => {
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handlePaystackPayment = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/paystack-initialize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Payment initialization failed');
      }

      const handler = window.PaystackPop.setup({
        key: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY, // Replace with your public key
        email: 'user@example.com', // Replace with user's email
        amount: amount * 100, // Convert to kobo
        currency: 'NGN',
        ref: data.reference,
        callback: function (response) {
          router.push('/thank-you');
        },
        onClose: function () {
          setLoading(false);
          alert('Payment window closed.');
        },
      });

      handler.openIframe();
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const handleDonate = (e) => {
    e.preventDefault();
    if (amount < 1000) {
      setError('Minimum donation amount is 1000 NGN');
      return;
    }
    handlePaystackPayment();
  };

  const handleCancel = () => {
    router.push('/');
  };

  return (
    <section className='bg-gray-100 text-black text-center py-20 px-4 sm:px-6 lg:px-8'>
      <div className='max-w-4xl mx-auto bg-white shadow-md rounded-md p-8'>
        <h1 className='text-3xl font-bold mb-6'>Donate</h1>
        <form onSubmit={handleDonate} className='mt-8'>
          <div className='mb-4 flex flex-col items-center'>
            <label className='block text-center text-gray-700 mb-2'>
              Donation Amount (NGN)
            </label>
            <input
              type='number'
              className='form-input mt-1 block w-1/2 border border-gray-300 rounded-md shadow-sm p-2'
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              min='1000'
            />
          </div>
          {error && <p className='text-red-500 mb-4'>{error}</p>}
          <div className='flex justify-center space-x-4'>
            <button
              type='submit'
              className='btn btn-primary bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Donate'}
            </button>
            <button
              type='button'
              className='btn bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
              onClick={handleCancel}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DonatePage;
