import { NextResponse } from 'next/server';

export async function POST(request) {
  const { amount } = await request.json();

  const response = await fetch(
    'https://api.paystack.co/transaction/initialize',
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: 'user@example.com', // Replace with user's email
        amount: amount * 100, // Convert to kobo
      }),
    },
  );

  const data = await response.json();

  if (data.status) {
    return NextResponse.json({ reference: data.data.reference });
  } else {
    return NextResponse.json({ message: data.message }, { status: 500 });
  }
}
