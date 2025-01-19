"use client";

import { useState } from "react";
import emailjs from '@emailjs/browser';

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
    setStatus({ submitted: false, submitting: true, error: null });

    try {
      await emailjs.send(
        'YOUR_SERVICE_ID', // You'll get this from EmailJS
        'YOUR_TEMPLATE_ID', // You'll get this from EmailJS
        {
          from_name: formData.name,
          reply_to: formData.email,
          project_type: formData.projectType,
          message: formData.message,
        },
        'YOUR_PUBLIC_KEY' // You'll get this from EmailJS
      );

      setStatus({
        submitted: true,
        submitting: false,
        error: null
      });
      
      // Clear form
      setFormData({
        name: "",
        email: "",
        projectType: "",
        message: "",
      });
      
    } catch (error) {
      setStatus({
        submitted: false,
        submitting: false,
        error: error.message
      });
    }
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

                {/* Add status messages */}
                {status.submitted && (
                  <div className="mb-4 p-4 bg-green-500/20 text-white rounded-lg">
                    Message sent successfully!
                  </div>
                )}
                
                {status.error && (
                  <div className="mb-4 p-4 bg-red-500/20 text-white rounded-lg">
                    {status.error}
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