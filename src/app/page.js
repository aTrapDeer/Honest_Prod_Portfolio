"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";

export default function Home() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [images, setImages] = useState([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [error, setError] = useState(null);
  
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

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const response = await fetch('/api/getImages');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.images && Array.isArray(data.images)) {
          setImages(data.images);
          if (data.images.length > 1) {
            setNextImageIndex(1);
          }
        }
      } catch (error) {
        console.error('Error fetching images:', error);
        setError('Failed to load images');
      }
    };

    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length <= 1) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        setCurrentImageIndex(nextImageIndex);
        setNextImageIndex((nextImageIndex + 1) % images.length);
        setIsTransitioning(false);
      }, 1200);

    }, 5000);

    return () => clearInterval(interval);
  }, [images, nextImageIndex]);

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
          {images.length > 0 ? (
            <>
              <div className={`absolute inset-0 ${isTransitioning ? 'animate-slide-in' : ''}`}>
                <Image
                  src={`/Images/Artists/${images[nextImageIndex]}`}
                  alt="Next Background"
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
              </div>
              
              <div className={`absolute inset-0 ${isTransitioning ? 'animate-slide-out' : ''}`}>
                <Image
                  src={`/Images/Artists/${images[currentImageIndex]}`}
                  alt="Current Background"
                  fill
                  className="object-cover"
                  priority
                  sizes="100vw"
                />
              </div>
            </>
          ) : defaultBackground}
          
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 text-white">
          <div className="max-w-3xl mx-auto text-center animate-fade-up">
            <h1 className="mb-6 text-5xl font-bold tracking-tight sm:text-7xl">
              Honest
              <span className="block mt-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
                Productions
              </span>
            </h1>
            
            <p className="max-w-xl mx-auto mb-8 text-lg text-gray-300">
              Visionary music video director behind viral hits, crafting iconic visual experiences that define artists and captivate millions of viewers worldwide.
            </p>

            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <Link
                href="/contact"
                className="px-8 py-3 text-sm font-medium transition-colors rounded-full bg-gradient-to-r from-blue-400 to-violet-400 text-white hover:from-blue-500 hover:to-violet-500"
              >
                Contact
              </Link>
              <Link
                href="/works"
                className="px-8 py-3 text-sm font-medium transition-colors rounded-full border border-white/20 hover:bg-white/10"
              >
                Our Works
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
                <h2 className="text-3xl font-bold mb-6">
                  About Honest Productions
                </h2>
                <p className="text-gray-300 max-w-3xl">
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
                  <h2 className="text-3xl font-bold mb-4">
                    Jack Rottier
                  </h2>
                  <p className="text-gray-300 max-w-2xl">
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
                <h2 className="text-3xl font-bold mb-8">
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

          {/* Contact Section */}
          <div className="animate-on-scroll opacity-0 transition-opacity duration-1000 ease-out">
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-black p-8 border border-gray-800">
              <div className="relative z-10 text-center">
                <h2 className="text-3xl font-bold mb-6">
                  Ready to Create?
                </h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  Let&apos;s bring your vision to life. Whether you&apos;re an artist, label, or brand, 
                  we&apos;re here to create something extraordinary together.
                </p>
                <Link
                  href="/contact"
                  className="inline-flex items-center px-8 py-3 text-sm font-medium transition-colors rounded-full bg-gradient-to-r from-blue-400 to-violet-400 text-white hover:from-blue-500 hover:to-violet-500"
                >
                  Get in Touch
                </Link>
              </div>
              <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
