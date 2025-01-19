"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();
  const navRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false);
      }
    };

    // Add/remove no-scroll class on body when mobile menu is open
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Blur overlay */}
      <div 
        className={`fixed inset-0 bg-black/30 backdrop-blur-sm transition-opacity z-40 md:hidden ${
          isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsMobileMenuOpen(false)}
      />

      <nav 
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300`}
      >
        <div className="w-full px-2">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center pl-2">
              <Link href="/" className="relative w-32 h-8" onClick={handleLinkClick}>
                <Image
                  src="/Hv.png"
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
                  onClick={handleLinkClick}
                  className={`px-3 py-2 rounded-md text-sm font-horizon ${
                    pathname === '/works'
                      ? 'text-[#FFDDDD] bg-[#35B5C2]'
                      : 'text-white hover:text-[#FFDDDD] hover:bg-[#2A8F99] transition-colors duration-200'
                  }`}
                >
                  Projects
                </Link>
                
                <Link
                  href="/contact"
                  onClick={handleLinkClick}
                  className={`px-3 py-2 rounded-md text-sm font-horizon ${
                    pathname === '/contact'
                      ? 'text-[#FFDDDD] bg-[#35B5C2]'
                      : 'text-white hover:text-[#FFDDDD] hover:bg-[#2A8F99] transition-colors duration-200'
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
        <div className={`md:hidden relative z-50 ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-[#9AA8FF]">
            <Link
              href="/works"
              onClick={handleLinkClick}
              className={`block px-3 py-2 rounded-md text-sm font-horizon ${
                pathname === '/works'
                  ? 'text-[#FFDDDD] bg-[#35B5C2]'
                  : 'text-white hover:text-[#FFDDDD] hover:bg-[#35B5C2] transition-colors duration-200'
              }`}
            >
              Projects
            </Link>

            <Link
              href="/contact"
              onClick={handleLinkClick}
              className={`block px-3 py-2 rounded-md text-sm font-horizon ${
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
    </>
  );
} 