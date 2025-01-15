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

      <div className="fixed inset-0 w-full h-full transition-opacity duration-300 z-0" style={{ opacity: btsOpacity }}>
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
            className="absolute inset-0 bg-gradient-to-b from-[#9AA8FF]/30 via-[#9AA8FF]/25 to-[#9AA8FF]/35 backdrop-blur-[2px] transition-opacity duration-700" 
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
          <div className="min-h-screen flex items-center justify-center">
            <div className="animate-on-scroll opacity-0 transition-opacity duration-1000 ease-out w-full">
              <div className="relative w-full">
                <div className="absolute inset-0">
                  {/* Top fade from video overlay - adjusted to match video overlay */}
                  <div className="absolute -top-96 left-0 right-0 h-96 bg-gradient-to-b from-transparent via-black/50 via-30% to-black" />
                  {/* Solid section with slightly reduced opacity to help blending */}
                  <div className="absolute inset-0 bg-black/95" />
                  {/* Bottom fade to BTS section */}
                  <div className="absolute -bottom-96 left-0 right-0 h-96 bg-gradient-to-t from-[#9AA8FF] to-black" />
                </div>
                <div className="relative z-10 max-w-[90vw] mx-auto py-24">
                  <h2 className="text-4xl font-horizon text-[#FFDDDD] mb-6">
                    Honest Prod Co
                  </h2>
                  <p className="text-white font-agrandir max-w-3xl mb-6 text-lg">
                    A creative powerhouse dedicated to transforming musical visions into compelling visual narratives. 
                    We specialize in crafting high-end music videos that resonate with audiences and elevate artists&apos; brands.
                  </p>
                  <Link
                    href="/bts"
                    className="inline-flex items-center px-8 py-3 text-sm font-medium bg-[#35B5C2]/80 text-[#FFDDDD] rounded-full hover:bg-[#35B5C2] transition-all duration-300 backdrop-blur-sm"
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
              <div className="absolute inset-0 bg-gradient-to-b from-[#9AA8FF]/30 via-[#9AA8FF]/25 to-[#9AA8FF]/35 backdrop-blur-[2px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full mx-auto py-24 space-y-48">
              {/* Director Section */}
              <div className="animate-on-scroll opacity-0 transition-opacity duration-1000 ease-out">
                <div className="relative w-full">
                  <div className="absolute inset-0">
                    {/* Top fade - simplified gradient */}
                    <div className="absolute -top-96 left-0 right-0 h-96 bg-gradient-to-b from-transparent from-0% to-[#9AA8FF] to-100%" />
                    {/* Solid section */}
                    <div className="absolute inset-0 bg-[#9AA8FF]" />
                    {/* Bottom fade - simplified gradient */}
                    <div className="absolute -bottom-96 left-0 right-0 h-96 bg-gradient-to-t from-transparent from-0% to-[#9AA8FF] to-100%" />
                  </div>
                  <div className="relative z-10 max-w-[90vw] mx-auto px-8 py-24">
                    <div className="flex flex-col md:flex-row gap-12 items-center">
                      <div className="w-56 h-56 relative rounded-2xl overflow-hidden shadow-xl">
                        <Image
                          src="/Images/JackRottier/Image1.jpg"
                          alt="Jack Rottier"
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h2 className="text-4xl font-horizon text-[#FFDDDD] mb-6">
                          Jack Rottier
                        </h2>
                        <p className="text-white font-agrandir max-w-2xl text-lg">
                          Award-winning director known for pushing creative boundaries and delivering groundbreaking music videos. 
                          With a keen eye for storytelling and visual innovation, Jack has collaborated with some of the industry&apos;s 
                          most influential artists.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Artists Section */}
              <div className="animate-on-scroll opacity-0 transition-opacity duration-1000 ease-out">
                <div className="relative w-full">
                  <div className="absolute inset-0">
                    {/* Top fade - simplified gradient */}
                    <div className="absolute -top-96 left-0 right-0 h-96 bg-gradient-to-b from-transparent from-0% to-[#9AA8FF] to-100%" />
                    {/* Solid section */}
                    <div className="absolute inset-0 bg-[#9AA8FF]" />
                    {/* Bottom fade - simplified gradient */}
                    <div className="absolute -bottom-96 left-0 right-0 h-96 bg-gradient-to-t from-transparent from-0% to-[#9AA8FF] to-100%" />
                  </div>
                  <div className="relative z-10 max-w-[90vw] mx-auto px-8 py-24">
                    <h2 className="text-4xl font-horizon text-[#FFDDDD] mb-16">
                      Featured Artists
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                      <div className="aspect-square relative rounded-xl overflow-hidden group shadow-xl z-20">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <Image
                          src="/Images/Works/Yeat.webp"
                          alt="Yeat"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="aspect-square relative rounded-xl overflow-hidden group shadow-xl z-20">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <Image
                          src="/Images/Works/JuicyJ.webp"
                          alt="Juicy J"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="aspect-square relative rounded-xl overflow-hidden group shadow-xl z-20">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                        <Image
                          src="/Images/Works/BLPKosher.jpeg"
                          alt="BLP Kosher"
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="aspect-square relative rounded-xl overflow-hidden group shadow-xl z-20">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
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

              {/* About Section */}
              <div className="animate-on-scroll opacity-0 transition-opacity duration-1000 ease-out">
                <div className="relative w-full">
                  <div className="absolute inset-0">
                    {/* Top fade - simplified gradient */}
                    <div className="absolute -top-96 left-0 right-0 h-96 bg-gradient-to-b from-transparent from-0% to-[#9AA8FF] to-100%" />
                    {/* Solid section */}
                    <div className="absolute inset-0 bg-[#9AA8FF]" />
                    {/* Bottom fade - simplified gradient */}
                    <div className="absolute -bottom-96 left-0 right-0 h-96 bg-gradient-to-t from-transparent from-0% to-[#9AA8FF] to-100%" />
                  </div>
                  <div className="relative z-10 max-w-[90vw] mx-auto px-8 py-24">
                    <h2 className="text-4xl font-horizon text-[#FFDDDD] mb-6">
                      Honest Prod Co
                    </h2>
                    <p className="text-white font-agrandir max-w-3xl mb-8 text-lg">
                      A creative powerhouse dedicated to transforming musical visions into compelling visual narratives. 
                      We specialize in crafting high-end music videos that resonate with audiences and elevate artists&apos; brands.
                    </p>
                    <Link
                      href="/bts"
                      className="inline-flex items-center px-8 py-3 text-sm font-medium bg-[#35B5C2]/60 text-[#FFDDDD] rounded-full hover:bg-[#35B5C2] transition-all duration-300"
                    >
                      <span>Behind The Scenes</span>
                      <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
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
