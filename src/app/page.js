"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { AnimatedCounter } from "@/components/ui/animated-counter.js";

function CounterWrapper() {
  const [isInView, setIsInView] = useState(false);
  const counterRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isInView) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => observer.disconnect();
  }, [isInView]);

  return (
    <div ref={counterRef} className="transform-gpu">
      <AnimatedCounter value={124000000} inView={isInView} />
    </div>
  );
}

export default function Home() {
  const [heroOpacity, setHeroOpacity] = useState(1);
  const [btsOpacity, setBtsOpacity] = useState(0);
  const [btsVideoOverlay, setBtsVideoOverlay] = useState(1);
  const sectionsRef = useRef(null);
  const heroVideoRef = useRef(null);
  const btsVideoRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Hero video stays visible longer
      const heroFade = Math.max(0, 1 - (scrollPosition / (windowHeight * 1.2)));
      setHeroOpacity(heroFade);

      // BTS video and its overlay
      const fadeStartPoint = windowHeight * 1.1; // Start after Honest Prod Co section
      const fadeDistance = windowHeight * 0.6; // Fade over 60% of screen height
      
      // BTS video appears
      const btsFade = Math.min(1, Math.max(0, (scrollPosition - fadeStartPoint) / (fadeDistance * 0.5)));
      setBtsOpacity(btsFade);
      
      // Black overlay on BTS video fades out more gradually
      const overlayFade = Math.max(0, 1 - ((scrollPosition - (fadeStartPoint + fadeDistance * 0.2)) / fadeDistance));
      setBtsVideoOverlay(overlayFade);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <div className="relative min-h-screen flex flex-col bg-black">
      {/* Video Backgrounds */}
      <div className="fixed inset-0 w-full h-full transition-opacity duration-300 bg-black z-0" style={{ opacity: heroOpacity }}>
        <video
          ref={heroVideoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="https://dj57pv4qm04lm.cloudfront.net/BG2.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/50" />
      </div>

      <div className="fixed inset-0 w-full h-full transition-opacity duration-300 bg-black z-0" style={{ opacity: btsOpacity }}>
        <div className="relative w-full h-full">
          <video
            ref={btsVideoRef}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="https://dj57pv4qm04lm.cloudfront.net/BTS.mp4" type="video/mp4" />
          </video>
          <div 
            className="absolute inset-0 bg-black transition-opacity duration-700" 
            style={{ opacity: btsVideoOverlay }}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen">
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
            <div className="max-w-3xl mx-auto text-center animate-fade-up">
              <div 
                className="mb-8 relative w-full max-w-lg mx-auto transition-opacity duration-300"
                style={{ opacity: heroOpacity }}
              >
                <Image
                  src="/honestlogo.png"
                  alt="Honest Productions Logo"
                  width={600}
                  height={200}
                  priority
                  className="w-full h-auto"
                />
              </div>

              <div 
                className="flex flex-wrap justify-center gap-4 mb-12 mt-2 transition-opacity duration-300"
                style={{ opacity: heroOpacity }}
              >
                <Link
                  href="/contact"
                  className="px-8 py-3 text-sm font-medium rounded-full bg-[#35B5C2] text-[#FFDDDD] hover:bg-[#2a8f99] transition-colors duration-200"
                >
                  Contact
                </Link>
                <Link
                  href="/works"
                  className="px-8 py-3 text-sm font-medium rounded-full bg-[#35B5C2] text-[#FFDDDD] hover:bg-[#2a8f99] transition-colors duration-200"
                >
                  Music Videos
                </Link>
              </div>
            </div>

            <button 
              onClick={scrollToSections}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce transition-transform hover:scale-110 focus:outline-none"
              style={{ opacity: heroOpacity }}
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
        <section ref={sectionsRef}>
          {/* About Section with Solid Background */}
          <div className="min-h-screen flex items-center justify-center px-4">
            <div className="animate-on-scroll opacity-0 transition-opacity duration-1000 ease-out w-full max-w-7xl">
              <div className="relative overflow-hidden rounded-2xl bg-[#9AA8FF] p-8">
                <div className="relative z-10">
                  <h2 className="text-3xl font-horizon text-[#FFDDDD] mb-6">
                    Honest Prod Co
                  </h2>
                  <p className="text-white font-agrandir max-w-3xl mb-6">
                    A creative powerhouse dedicated to transforming musical visions into compelling visual narratives. 
                    We specialize in crafting high-end music videos that resonate with audiences and elevate artists&apos; brands.
                  </p>
                  <Link
                    href="/bts"
                    className="inline-flex items-center px-6 py-2.5 text-sm font-medium bg-[#35B5C2] text-[#FFDDDD] rounded-full hover:bg-[#2a8f99] transition-colors duration-200"
                  >
                    <span>Behind The Scenes</span>
                    <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Rest of the sections with BTS video background */}
          <div className="relative">
            {/* BTS Video Background */}
            <div className="fixed inset-0 w-full h-full transition-opacity duration-300" style={{ opacity: btsOpacity }}>
              <video
                ref={btsVideoRef}
                autoPlay
                muted
                loop
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              >
                <source src="https://dj57pv4qm04lm.cloudfront.net/BTS.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-black/70" />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-4 py-24 space-y-32">
              {/* Director Section */}
              <div className="animate-on-scroll opacity-0 transition-opacity duration-1000 ease-out">
                <div className="relative overflow-hidden rounded-2xl bg-[#9AA8FF] p-8">
                  <div className="relative z-10 flex flex-col md:flex-row gap-8 items-center">
                    <div className="w-48 h-48 relative rounded-full overflow-hidden">
                      <Image
                        src="/Images/JackRottier/Image1.jpg"
                        alt="Jack Rottier"
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div>
                      <h2 className="text-3xl font-horizon text-[#FFDDDD] mb-4">
                        Jack Rottier
                      </h2>
                      <p className="text-white font-agrandir max-w-2xl">
                        Award-winning director known for pushing creative boundaries and delivering groundbreaking music videos. 
                        With a keen eye for storytelling and visual innovation, Jack has collaborated with some of the industry&apos;s 
                        most influential artists.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Artists Section */}
              <div className="animate-on-scroll opacity-0 transition-opacity duration-1000 ease-out">
                <div className="relative overflow-hidden rounded-2xl bg-[#9AA8FF] p-8">
                  <div className="relative z-10">
                    <h2 className="text-3xl font-horizon text-[#FFDDDD] mb-8">
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
                </div>
              </div>

              {/* Social Media Section */}
              <div className="animate-on-scroll opacity-0 transition-opacity duration-1000 ease-out">

                {/* Press Section */}
                <div className="mt-16 border-t border-[#35B5C2]/30">
                  <div className="py-6">
                    <div className="max-w-4xl mx-auto">
                      <p className="text-sm text-sub text-center mb-4">Featured In</p>
                      <div className="flex flex-wrap justify-center items-center gap-6 px-4">
                        <div className="relative h-6 w-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                          <Image
                            src="/Images/press/djakademiks.jpeg"
                            alt="DJ Akademiks"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="relative h-6 w-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                          <Image
                            src="/Images/press/ourgeneration.jpg"
                            alt="Our Generation Music"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="relative h-6 w-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                          <Image
                            src="/Images/press/source.jpg"
                            alt="The Source"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="relative h-6 w-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                          <Image
                            src="/Images/press/raptv.jpg"
                            alt="Rap TV"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="relative h-6 w-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                          <Image
                            src="/Images/press/pitchfork.jpg"
                            alt="Pitchfork"
                            fill
                            className="object-contain"
                          />
                        </div>
                        <div className="relative h-6 w-20 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100">
                          <Image
                            src="/Images/press/broadwayworld.png"
                            alt="Broadway World"
                            fill
                            className="object-contain"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
