"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-[#9AA8FF] ${
        isScrolled ? 'shadow-lg' : ''
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="relative w-32 h-8">
              <Image
                src="/Hprint.svg"
                alt="Honest Prod Co Logo"
                fill
                className="object-contain"
                priority
              />
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link
                href="/works"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === '/works'
                    ? 'text-[#FFDDDD] bg-[#35B5C2]'
                    : 'text-white hover:text-[#FFDDDD] hover:bg-[#35B5C2] transition-colors duration-200'
                }`}
              >
                Works
              </Link>
              <Link
                href="/bts"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === '/bts'
                    ? 'text-[#FFDDDD] bg-[#35B5C2]'
                    : 'text-white hover:text-[#FFDDDD] hover:bg-[#35B5C2] transition-colors duration-200'
                }`}
              >
                BTS
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === '/contact'
                    ? 'text-[#FFDDDD] bg-[#35B5C2]'
                    : 'text-white hover:text-[#FFDDDD] hover:bg-[#35B5C2] transition-colors duration-200'
                }`}
              >
                Contact
              </Link>
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-[#FFDDDD] hover:bg-[#35B5C2] transition-colors duration-200"
            >
              <span className="sr-only">Open main menu</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#9AA8FF]">
          <Link
            href="/works"
            className={`block px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/works'
                ? 'text-[#FFDDDD] bg-[#35B5C2]'
                : 'text-white hover:text-[#FFDDDD] hover:bg-[#35B5C2] transition-colors duration-200'
            }`}
          >
            Works
          </Link>
          <Link
            href="/bts"
            className={`block px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/bts'
                ? 'text-[#FFDDDD] bg-[#35B5C2]'
                : 'text-white hover:text-[#FFDDDD] hover:bg-[#35B5C2] transition-colors duration-200'
            }`}
          >
            BTS
          </Link>
          <Link
            href="/contact"
            className={`block px-3 py-2 rounded-md text-sm font-medium ${
              pathname === '/contact'
                ? 'text-[#FFDDDD] bg-[#35B5C2]'
                : 'text-white hover:text-[#FFDDDD] hover:bg-[#35B5C2] transition-colors duration-200'
            }`}
          >
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
} 