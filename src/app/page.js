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
  const [logoOpacity, setLogoOpacity] = useState(1);
  const [videoOverlayOpacity, setVideoOverlayOpacity] = useState(0.5);
  const sectionsRef = useRef(null);
  const heroVideoRef = useRef(null);
  const btsVideoRef = useRef(null);

  useEffect(() => {
    // Ensure mobile autoplay: set muted/inline and attempt programmatic play
    const forceAutoplay = (videoEl) => {
      if (!videoEl) return;
      try {
        videoEl.muted = true;
        videoEl.defaultMuted = true;
        // Ensure inline playback on iOS Safari variants
        videoEl.playsInline = true;
        videoEl.setAttribute('playsinline', '');
        videoEl.setAttribute('webkit-playsinline', '');
        const tryPlay = () => {
          videoEl.play().catch(() => {
            // Swallow errors; some devices block in Low Power Mode
          });
        };
        if (videoEl.readyState >= 2) {
          tryPlay();
        } else {
          videoEl.addEventListener('canplay', tryPlay, { once: true });
          // Kick off loading if needed
          videoEl.load();
        }
      } catch {}
    };

    forceAutoplay(heroVideoRef.current);
    forceAutoplay(btsVideoRef.current);
  }, []);

  useEffect(() => {
    const logoTimer = setTimeout(() => {
      setLogoOpacity(0);
      setVideoOverlayOpacity(0.2);
    }, 5000);

    return () => clearTimeout(logoTimer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      const heroFade = Math.max(0, 1 - (scrollPosition / (windowHeight * 1.2)));
      setHeroOpacity(heroFade);

      const fadeStartPoint = windowHeight * 1.1;
      const fadeDistance = windowHeight * 0.6;
      
      const btsFade = Math.min(1, Math.max(0, (scrollPosition - fadeStartPoint) / (fadeDistance * 0.5)));
      setBtsOpacity(btsFade);
      
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
          defaultMuted
          loop
          playsInline
          webkit-playsinline="true"
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
          className="absolute inset-0 w-full h-full object-cover xs:object-[center_20%] sm:object-[center_30%] md:object-center lg:object-center rounded-2xl"
          style={{ pointerEvents: 'none' }}
          src="https://dj57pv4qm04lm.cloudfront.net/BG2.mp4"
        />
        <div 
          className="absolute inset-0 bg-black transition-opacity duration-1000 rounded-2xl" 
          style={{ opacity: videoOverlayOpacity }}
        />
      </div>

      <div className="fixed inset-0 w-full h-full transition-opacity duration-300 z-0" style={{ opacity: btsOpacity }}>
        <div className="relative w-full h-full">
          <video
            ref={btsVideoRef}
            autoPlay
            muted
            defaultMuted
            loop
            playsInline
            webkit-playsinline="true"
            preload="auto"
            controls={false}
            disablePictureInPicture
            disableRemotePlayback
            controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
            className="absolute inset-0 w-full h-full object-cover xs:object-[center_20%] sm:object-[center_30%] md:object-center lg:object-center rounded-2xl"
            style={{ pointerEvents: 'none' }}
            src="https://dj57pv4qm04lm.cloudfront.net/BTS.mp4"
          />
          <div 
            className="absolute inset-0 bg-gradient-to-b from-[#9AA8FF]/30 via-[#9AA8FF]/25 to-[#9AA8FF]/35 backdrop-blur-[2px] transition-opacity duration-700 rounded-2xl" 
            style={{ opacity: btsVideoOverlay }}
          />
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen relative">
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen">
            <div className="w-full max-w-lg mx-auto px-4 text-center animate-fade-up">
              <div 
                className="transition-opacity duration-1000"
                style={{ opacity: logoOpacity }}
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
            </div>
          </div>
          
          <div className="absolute inset-x-0 bottom-8 flex justify-center z-20">
            <button 
              onClick={scrollToSections}
              className="animate-bounce transition-transform hover:scale-110 focus:outline-none"
              style={{ opacity: heroOpacity }}
            >
              <svg
                className="w-10 h-10 text-[#FFDDDD]"  
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
                      href="/works"
                      className="inline-flex items-center px-8 py-3 text-sm font-medium bg-[#35B5C2]/60 text-[#FFDDDD] rounded-full hover:bg-[#35B5C2] transition-all duration-300 cursor-pointer"
                    >
                      Our Projects
                      <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Rest of the sections */}
          <div className="relative">
            {/* BTS Video Background */}
            <div className="fixed inset-0 w-full h-full transition-opacity duration-300" style={{ opacity: btsOpacity }}>
              <video
                ref={btsVideoRef}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                controls={false}
                disablePictureInPicture
                controlsList="nodownload noplaybackrate noremoteplayback"
                className="absolute inset-0 w-full h-full 
                  object-cover 
                  xs:object-[center_20%] 
                  sm:object-[center_30%] 
                  md:object-center 
                  lg:object-center"
                style={{ pointerEvents: 'none' }}
              >
                <source src="https://dj57pv4qm04lm.cloudfront.net/BTS.mp4" type="video/mp4" />
              </video>
              <div className="absolute inset-0 bg-gradient-to-b from-[#9AA8FF]/30 via-[#9AA8FF]/25 to-[#9AA8FF]/35 backdrop-blur-[2px]" />
            </div>

            {/* Content */}
            <div className="relative z-10 w-full mx-auto">
              {/* Director Section */}
              <div className="animate-on-scroll opacity-0 transition-opacity duration-1000 ease-out py-24">
                <div className="relative w-full">
                  <div className="absolute inset-0">
                    {/* Top fade */}
                    <div className="absolute -top-96 left-0 right-0 h-96 bg-gradient-to-b from-transparent from-0% to-[#9AA8FF] to-100%" />
                    {/* Solid section */}
                    <div className="absolute inset-0 bg-[#9AA8FF]" />
                    {/* Smooth transition to purple */}
                    <div className="absolute -bottom-48 left-0 right-0 h-48 bg-[#9AA8FF]" />
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
                          Award-winning director and founder of Honest Prod Co
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* About Section - Modified to be the last section */}
              <div className="animate-on-scroll opacity-0 transition-opacity duration-1000 ease-out">
                <div className="relative w-full">
                  <div className="absolute inset-0">
                    {/* Top fade */}
                    <div className="absolute -top-96 left-0 right-0 h-96 bg-gradient-to-b from-transparent from-0% to-[#9AA8FF] to-100%" />
                    {/* Solid section */}
                    <div className="absolute inset-0 bg-[#9AA8FF]" />
                    {/* Bottom fade - adjusted to connect with footer */}
                    <div className="absolute bottom-0 left-0 right-0 h-30 bg-gradient-to-b from-[#9AA8FF] via-[#9AA8FF] to-[#9AA8FF]" />
                  </div>
                  {/* Add a spacer div to ensure content reaches footer */}
                  <div className="h-12"></div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
