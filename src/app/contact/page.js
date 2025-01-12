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
    <div className="min-h-screen bg-black/95">
      <div className="container px-4 py-24 mx-auto">
        <div className="max-w-5xl mx-auto">


          <div className="grid gap-8 md:grid-cols-2">
            {/* Contact Information */}
            <div className="space-y-8 animate-fade-up">
              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm">
                <h3 className="mb-4 text-xl font-semibold text-white">Location</h3>
                <p className="text-gray-400">Based in Los Angeles, CA</p>
                <p className="text-gray-400">Outside of Los Angeles requires additional fees</p>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm">
                <h3 className="mb-4 text-xl font-semibold text-white">Contact Details</h3>
                <div className="space-y-2">
                  <p className="text-gray-400">Email: contact@honestproductions.com</p>
                  <p className="text-gray-400">Phone: +1 (323) XXX-XXXX</p>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-white/5 backdrop-blur-sm">
                <h3 className="mb-4 text-xl font-semibold text-white">Typical Response Time</h3>
                <p className="text-gray-400">Within 24-48 hours</p>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit} className="p-8 rounded-2xl bg-white/5 backdrop-blur-sm animate-fade-up">
              <div className="space-y-6">
                <div>
                  <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-200">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-3 text-white bg-white/10 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="Your name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-200">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-3 text-white bg-white/10 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    placeholder="your@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label htmlFor="projectType" className="block mb-2 text-sm font-medium text-gray-200">
                    Project Type
                  </label>
                  <select
                    id="projectType"
                    className="w-full px-4 py-3 text-white bg-white/10 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    required
                  >
                    <option value="" disabled>Select project type</option>
                    <option value="music-video">Music Video</option>
                    <option value="commercial">Commercial</option>
                    <option value="content">Short Form Content</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block mb-2 text-sm font-medium text-gray-200">
                    Project Details
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    className="w-full px-4 py-3 text-white bg-white/10 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
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