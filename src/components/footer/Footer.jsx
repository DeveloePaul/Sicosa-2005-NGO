import React from "react";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-base-200 text-base-content mt-10">
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center">
          <div className="space-y-4">
            <h2 className="text-xl font-bold">SICOSA2005</h2>
            <p className="text-sm">
              God is our leader!
            </p>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Quick Links</h2>
            <ul className="list-none space-y-2">
              <li>
                <Link href="/" className="text-sm hover:underline">Home</Link>
              </li>
              <li>
                <Link href="/about" className="text-sm hover:underline">About Us</Link>
              </li>
              <li>
                <Link href="/events" className="text-sm hover:underline">Events</Link>
              </li>
              <li>
                <Link href="/programs" className="text-sm hover:underline">Programs</Link>
              </li>
              <li>
                <Link href="/members" className="text-sm hover:underline">Members</Link>
              </li>
              <li>
                <Link href="/fundraising" className="text-sm hover:underline">Fundraising</Link>
              </li>
              <li>
                <Link href="/blog" className="text-sm hover:underline">Blog</Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm hover:underline">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h2 className="text-xl font-bold">Follow Us</h2>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500">
                <FaFacebookF />
              </a>
              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400">
                <FaTwitter />
              </a>
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600">
                <FaInstagram />
              </a>
              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700">
                <FaLinkedinIn />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-6 border-t border-base-300 pt-6 text-center text-sm">
          &copy; 2024 SICOSA2005. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
