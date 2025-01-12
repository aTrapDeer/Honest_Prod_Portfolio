"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const sectionsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.remove('opacity-0');
            entry.target.classList.add('opacity-100');
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const scrollToSections = () => {
    sectionsRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const defaultBackground = (
    <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-black" />
  );

  return (
    <main className="relative">
      {/* Hero Section */}
      <section className="relative min-h-screen">
        <div className="absolute inset-0 w-full h-full overflow-hidden">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://dj57pv4qm04lm.cloudfront.net/bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-white">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <h1 className="mb-12 text-5xl font-bold tracking-tight sm:text-7xl">
              Honest
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-[#00FFB3] via-[#B45AFF] to-[#FF6B6B]">
                Productions
              </span>
            </h1>
            


            <div className="flex flex-wrap justify-center gap-4 mb-24 mt-16">
              <Link
                href="/contact"
                className="px-8 py-3 text-sm font-medium transition-colors rounded-full bg-gradient-to-r from-[#B45AFF] to-[#FF6B6B] text-white hover:from-[#C76FFF] hover:to-[#FF8585] shadow-lg hover:shadow-xl hover:scale-105 transform duration-200"
              >
                Contact
              </Link>
              <Link
                href="/works"
                className="px-8 py-3 text-sm font-medium transition-all rounded-full border-2 border-[#00FFB3]/60 hover:border-[#00FFB3] hover:bg-[#00FFB3]/20 text-[#00FFB3] hover:text-white shadow-lg hover:shadow-xl hover:scale-105 transform duration-200"
              >
                Music Videos
              </Link>
            </div>
          </div>

          <button 
            onClick={scrollToSections}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce transition-transform hover:scale-110 focus:outline-none"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </button>
        </div>
      </section>

      {/* Content Sections */}
      <section ref={sectionsRef} className="relative bg-black text-white min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-24 space-y-32">
          {/* About Section */}
          <div className="animate-on-scroll opacity-0 transition-opacity duration-1000 ease-out">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black p-8 border border-gray-800">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#00FFB3] to-[#FF6B6B]">
                  About Honest Productions
                </h2>
                <p className="text-[#E6E6E6] max-w-3xl">
                  A creative powerhouse dedicated to transforming musical visions into compelling visual narratives. 
                  We specialize in crafting high-end music videos that resonate with audiences and elevate artists&apos; brands.
                </p>
              </div>
              <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Director Section */}
          <div className="animate-on-scroll opacity-0 transition-opacity duration-1000 ease-out">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black p-8 border border-gray-800">
              <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                <div className="w-48 h-48 relative rounded-full overflow-hidden border-2 border-gray-800">
                  <Image
                    src="/Images/JackRottier/Image1.jpg"
                    alt="Jack Rottier"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#B45AFF] to-[#FF6B6B]">
                    Jack Rottier
                  </h2>
                  <p className="text-[#E6E6E6] max-w-2xl">
                    Award-winning director known for pushing creative boundaries and delivering groundbreaking music videos. 
                    With a keen eye for storytelling and visual innovation, Jack has collaborated with some of the industry&apos;s 
                    most influential artists.
                  </p>
                </div>
              </div>
              <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Artists Section */}
          <div className="animate-on-scroll opacity-0 transition-opacity duration-1000 ease-out">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black p-8 border border-gray-800">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-[#00FFB3] via-[#B45AFF] to-[#FF6B6B]">
                  Featured Artists
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="aspect-square relative rounded-lg overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <Image
                      src="/Images/Works/Yeat.webp"
                      alt="Yeat"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="aspect-square relative rounded-lg overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <Image
                      src="/Images/Works/JuicyJ.webp"
                      alt="Juicy J"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="aspect-square relative rounded-lg overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <Image
                      src="/Images/Works/BLPKosher.jpeg"
                      alt="BLP Kosher"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="aspect-square relative rounded-lg overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                    <Image
                      src="/Images/Works/BabyTron.webp"
                      alt="Baby Tron"
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Press Section */}
          <div className="animate-on-scroll opacity-0 transition-opacity duration-1000 ease-out">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black p-8 border border-gray-800">
              <div className="relative z-10">
                <h2 className="text-3xl font-bold mb-8 text-center bg-clip-text text-transparent bg-gradient-to-r from-[#B45AFF] to-[#00FFB3]">
                  Featured In
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                  <div className="relative h-12 grayscale hover:grayscale-0 transition-all duration-300">
                    <Image
                      src="/Images/press/djakademiks.jpeg"
                      alt="DJ Akademiks"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative h-12 grayscale hover:grayscale-0 transition-all duration-300">
                    <Image
                      src="/Images/press/ourgeneration.jpg"
                      alt="Our Generation Music"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative h-12 grayscale hover:grayscale-0 transition-all duration-300">
                    <Image
                      src="/Images/press/source.jpg"
                      alt="The Source"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative h-12 grayscale hover:grayscale-0 transition-all duration-300">
                    <Image
                      src="/Images/press/raptv.jpg"
                      alt="Rap TV"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative h-12 grayscale hover:grayscale-0 transition-all duration-300">
                    <Image
                      src="/Images/press/pitchfork.jpg"
                      alt="Pitchfork"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="relative h-12 grayscale hover:grayscale-0 transition-all duration-300">
                    <Image
                      src="/Images/press/broadwayworld.png"
                      alt="Broadway World"
                      fill
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
              <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>

          {/* Social Media Section */}
          <div className="animate-on-scroll opacity-0 transition-opacity duration-1000 ease-out">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black p-8 border border-gray-800">
              <div className="relative z-10 text-center">
                <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#B45AFF] to-[#FF6B6B]">
                  Connect With Us
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8">
                  <a
                    href="https://www.instagram.com/honestprod/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-[#B45AFF] to-[#FF6B6B] text-white hover:from-[#C76FFF] hover:to-[#FF8585] shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                    Instagram
                  </a>
                  <a
                    href="https://x.com/JackRottier"
                    target="_blank"
                    rel="noopener noreferrer" 
                    className="flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white hover:from-blue-500 hover:to-blue-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    X (Twitter)
                  </a>
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="mailto:contact@honestproductions.com"
                    className="flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-600 text-white hover:from-green-500 hover:to-emerald-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    Email Us
                  </a>
                  <Link
                    href="/contact"
                    className="flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-violet-400 to-indigo-600 text-white hover:from-violet-500 hover:to-indigo-700 transition-colors"
                  >
                    <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    Send Inquiry
                  </Link>
                </div>
              </div>
              <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
