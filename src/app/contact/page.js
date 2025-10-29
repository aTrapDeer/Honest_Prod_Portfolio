"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  
  const [status, setStatus] = useState({
    submitted: false,
    submitting: false,
    error: null
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ submitting: true });

    try {
      const response = await fetch("https://formspree.io/f/xeoobpby", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus({ submitted: true, submitting: false });
        setFormData({
          name: "",
          email: "",
          projectType: "",
          message: "",
        });
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      setStatus({ error: true, submitting: false });
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Video Background */}
      <div className="fixed inset-0 -z-10">
        <video
          ref={videoRef => {
            // keep a local ref for autoplay enforcement
            if (videoRef) {
              try {
                videoRef.muted = true;
                videoRef.defaultMuted = true;
                videoRef.setAttribute('playsinline', '');
                videoRef.setAttribute('webkit-playsinline', '');
                videoRef.playsInline = true;
                const tryPlay = () => videoRef.play().catch(() => {});
                if (videoRef.readyState >= 2) {
                  tryPlay();
                } else {
                  videoRef.addEventListener('canplay', tryPlay, { once: true });
                  videoRef.load();
                }
              } catch {}
            }
          }}
          autoPlay
          loop
          muted
          defaultMuted
          playsInline
          webkit-playsinline="true"
          preload="auto"
          controls={false}
          disablePictureInPicture
          disableRemotePlayback
          controlsList="nodownload noplaybackrate noremoteplayback nofullscreen"
          className="object-cover w-full h-full"
          style={{ pointerEvents: 'none' }}
          src="https://dj57pv4qm04lm.cloudfront.net/BTS.mp4"
        />
        <div className="absolute inset-0 bg-black/55" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 py-24 mx-auto">
        <div className="max-w-5xl mx-auto">


          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-8 animate-fade-up">
              <div className="p-6 rounded-2xl bg-[#9AA8FF]/90 backdrop-blur-md shadow-lg">
                {/* <h3 className="mb-4 text-xl font-semibold text-white">Location</h3> */}
                <h3 className="text-[#FFDDDD] text-lg font-horizon">Based in Los Angeles, CA</h3>
                <h3 className="text-[#FFDDDD] text-sm font-horizon">Available internationally</h3>
                <p className="text-[#FFDDDD] text-sm font-horizon mt-4">Jack@honestprod.co</p> 
              </div>


            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-[#9AA8FF]/90 backdrop-blur-md shadow-lg animate-fade-up">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-white">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 text-white bg-white/20 rounded-lg focus:ring-2 focus:ring-[#FFDDDD] focus:outline-none placeholder-white/70"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-white">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 text-white bg-white/20 rounded-lg focus:ring-2 focus:ring-[#FFDDDD] focus:outline-none placeholder-white/70"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block mb-2 text-sm font-medium text-white">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    className="w-full px-4 py-3 text-white bg-white/20 rounded-lg focus:ring-2 focus:ring-[#FFDDDD] focus:outline-none"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    required
                  >
                    <option value="" disabled className="text-white bg-[#9AA8FF]">Select project type</option>
                    <option value="music-video" className="text-white bg-[#9AA8FF]">Music Video</option>
                    <option value="commercial" className="text-white bg-[#9AA8FF]">Commercial</option>
                    <option value="content" className="text-white bg-[#9AA8FF]">Short Form Content</option>
                    <option value="other" className="text-white bg-[#9AA8FF]">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-white">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-3 text-white bg-white/20 rounded-lg focus:ring-2 focus:ring-[#FFDDDD] focus:outline-none placeholder-white/70"
                    placeholder="Tell us about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                  ></textarea>
                </div>

                {/* Status Messages - Add these just before the submit button */}
                {status.submitted && (
                  <div className="mb-6 p-4 bg-green-500/20 backdrop-blur-sm border border-green-500/50 text-[#FFDDDD] rounded-lg text-center animate-fade-in">
                    <svg className="w-6 h-6 mx-auto mb-2 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    <p className="font-medium">Message sent successfully!</p>
                    <p className="text-sm opacity-80 mt-1">We&apos;ll get back to you soon.</p>
                  </div>
                )}
                
                {status.error && (
                  <div className="mb-6 p-4 bg-red-500/20 backdrop-blur-sm border border-red-500/50 text-[#FFDDDD] rounded-lg text-center animate-fade-in">
                    <svg className="w-6 h-6 mx-auto mb-2 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                    </svg>
                    <p className="font-medium">Failed to send message</p>
                    <p className="text-sm opacity-80 mt-1">Please try again or email us directly.</p>
                  </div>
                )}

                {/* Loading State */}
                {status.submitting && (
                  <div className="mb-6 p-4 bg-blue-500/20 backdrop-blur-sm border border-blue-500/50 text-[#FFDDDD] rounded-lg text-center animate-fade-in">
                    <div className="animate-spin w-6 h-6 border-2 border-[#FFDDDD] border-t-transparent rounded-full mx-auto mb-2"></div>
                    <p className="font-medium">Sending message...</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status.submitting}
                  className="w-full px-8 py-4 text-sm font-medium text-white transition-all rounded-full bg-gradient-to-r from-[#B45AFF] to-[#FF6B6B] hover:from-[#C76FFF] hover:to-[#FF8585] shadow-lg hover:shadow-xl hover:scale-105 transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#B45AFF] focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50"
                >
                  {status.submitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 
