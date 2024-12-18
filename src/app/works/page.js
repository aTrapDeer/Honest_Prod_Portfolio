"use client";

import { useState } from 'react';
import Image from 'next/image';

const artists = [
  {
    name: 'Yeat',
    image: '/Images/Works/Yeat.webp',
    description: "Chart-topping artist known for innovative sound and viral hits",
    videos: [
      { title: 'Gët Busy', videoId: 'bd5l5NtzoWc' },
      { title: 'GO2WORK', videoId: 'NEFEwfPcXRA' },
      { title: 'Never Again', videoId: 'n0iZ4eZqp90' }
    ]
  },
  {
    name: 'Xavier Wulf',
    image: '/Images/Works/XavierWulf.jpg',
    description: "Underground sensation pushing musical boundaries",
    videos: [
      { title: 'Wulf Pesci', videoId: '8lZtA8D2GRk' },
      { title: 'The Truth (feat. Juicy J)', videoId: 'qxJf8Ulmi-Y' }
    ]
  },
  {
    name: 'Baby Tron',
    image: '/Images/Works/BabyTron.webp',
    description: "Detroit&apos;s finest, known for witty wordplay and unique style",
    videos: [
      { title: 'Emperor of the Universe', videoId: 'example3' },
      { title: 'Jesus Shuttlesworth', videoId: 'example4' }
    ]
  },
  {
    name: 'Juicy J',
    image: '/Images/Works/JuicyJ.webp',
    description: "Legendary rapper and producer with timeless hits",
    videos: [
      { title: 'Video 1', videoId: 'example5' },
      { title: 'Video 2', videoId: 'example6' }
    ]
  },
  {
    name: 'BLP Kosher',
    image: '/Images/Works/BLPKosher.jpeg',
    description: "Rising star with a unique vision and sound",
    videos: [
      { title: 'Video 1', videoId: 'example7' },
      { title: 'Video 2', videoId: 'example8' }
    ]
  },
  {
    name: 'Dave Blunts',
    image: '/Images/Works/DaveBlunts.jpg',
    description: "Innovative artist pushing creative boundaries",
    videos: [
      { title: 'Video 1', videoId: 'example9' },
      { title: 'Video 2', videoId: 'example10' }
    ]
  }
];

export default function Works() {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openArtistModal = (artist) => {
    setSelectedArtist(artist);
  };

  const closeArtistModal = () => {
    setSelectedArtist(null);
  };

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header Section */}
      <div className="relative h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-violet-600/20" />
          <div className="absolute inset-0 bg-black/70" />
        </div>
        <div className="relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400 mb-4">
            Our Works
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto px-4">
            Explore our collection of groundbreaking music videos and visual experiences
          </p>
        </div>
      </div>

      {/* Artists Grid */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {artists.map((artist) => (
            <div
              key={artist.name}
              onClick={() => openArtistModal(artist)}
              className="group relative overflow-hidden rounded-2xl aspect-[4/3] cursor-pointer"
            >
              {/* Artist Image */}
              <div className="absolute inset-0">
                <Image
                  src={artist.image}
                  alt={artist.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-70 transition-opacity" />
              </div>
              
              {/* Artist Info */}
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                  {artist.name}
                </h3>
                <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                  <span className="text-blue-400">{artist.videos.length} Videos</span>
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Artist Videos Modal */}
      {selectedArtist && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95">
          <div className="relative w-full max-w-4xl bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 md:p-8">
            <button
              onClick={closeArtistModal}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <h2 className="text-3xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
              {selectedArtist.name} Videos
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {selectedArtist.videos.map((video) => (
                <button
                  key={video.videoId}
                  onClick={() => openVideoModal(video)}
                  className="group relative aspect-video rounded-xl overflow-hidden bg-gray-900 hover:bg-gray-800 transition-colors"
                >
                  {/* YouTube Thumbnail */}
                  <Image
                    src={`https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`}
                    alt={video.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Overlay with Play Button */}
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/30 transition-colors">
                    <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                      <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                  {/* Video Title */}
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <p className="text-white font-medium">{video.title}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Video Player Modal */}
      {isVideoModalOpen && selectedVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95">
          <div className="relative w-full max-w-5xl">
            <button
              onClick={closeVideoModal}
              className="absolute -top-12 right-0 text-gray-400 hover:text-white transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative pt-[56.25%] rounded-xl overflow-hidden">
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}`}
                title={selectedVideo.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 