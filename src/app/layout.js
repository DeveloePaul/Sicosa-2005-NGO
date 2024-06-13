import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import AuthProvider from '@/components/AuthProvider';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: {
    default: 'SICOSA-2005',
    template: '%s | SICOSA-2005',
  },
  description:
    'Standard International College Old Student Association Class of 2005',
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <html lang='en'>
        <body className={inter.className}>
          <Navbar />
          <main className='page-content'>{children}</main>
          <Footer />
          <ToastContainer />
        </body>
      </html>
    </AuthProvider>
  );
}
