import nodemailer from 'nodemailer';

export async function POST(request) {
  const { name, email, message } = await request.json();

  // Create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'your-email@gmail.com', // your email address
      pass: 'your-email-password', // your email password
    },
  });

  // Send email to admin
  await transporter.sendMail({
    from: '"Contact Form" <no-reply@sicosa2005.org>', // sender address
    to: 'admin@sicosa2005.org', // list of receivers
    subject: 'New Contact Form Submission', // Subject line
    text: `You have a new contact form submission from:
    Name: ${name}
    Email: ${email}
    Message: ${message}`, // plain text body
  });

  // Send confirmation email to user
  await transporter.sendMail({
    from: '"SICOSA-2005" <no-reply@sicosa2005.org>', // sender address
    to: email, // user's email
    subject: 'We have received your message', // Subject line
    text: `Hi ${name},

    Thank you for contacting us. We have received your message and will get back to you shortly.

    Best regards,
    SICOSA-2005 Team`, // plain text body
  });

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
