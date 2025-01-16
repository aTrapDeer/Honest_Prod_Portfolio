"use client";

import { useState } from "react";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Backend integration will go here
    console.log(formData);
  };

  return (
    <div className="relative min-h-screen">
      {/* Video Background */}
      <div className="fixed inset-0 -z-10">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full"
        >
          <source src="https://dj57pv4qm04lm.cloudfront.net/BTS.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container px-4 py-24 mx-auto">
        <div className="max-w-5xl mx-auto">


          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-8 animate-fade-up">
              <div className="p-6 rounded-2xl bg-[#9AA8FF]/90 backdrop-blur-md shadow-lg">
                <h3 className="mb-4 text-xl font-semibold text-white">Location</h3>
                <p className="text-white/90">Based in Los Angeles, CA</p>
                <p className="text-white/90">Available for worldwide projects</p>
              </div>

              <div className="p-6 rounded-2xl bg-[#9AA8FF]/90 backdrop-blur-md shadow-lg">
                <h3 className="mb-4 text-xl font-semibold text-white">Contact Details</h3>
                <div className="space-y-2">
                  <p className="text-white/90">Email: projects@honestprod.co</p>
                </div>
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

                <button
                  type="submit"
                  className="w-full px-8 py-4 text-sm font-medium text-white transition-all rounded-full bg-gradient-to-r from-[#B45AFF] to-[#FF6B6B] hover:from-[#C76FFF] hover:to-[#FF8585] shadow-lg hover:shadow-xl hover:scale-105 transform duration-200 focus:outline-none focus:ring-2 focus:ring-[#B45AFF] focus:ring-offset-2 focus:ring-offset-black"
                >
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 