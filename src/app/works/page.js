"use client";

import { useState } from 'react';
import Image from 'next/image';
import musicVideos from './musicvideos.json';

const artists = [
  {
    name: 'Yeat',
    image: '/Images/Works/Yeat.webp',
    description: "Chart-topping artist known for innovative sound and viral hits",
    videos: [
      { title: 'Gët Busy', videoId: 'bd5l5NtzoWc' },
      { title: 'GO2WORK', videoId: 'NEFEwfPcXRA' },
      { title: 'Never Again', videoId: 'n0iZ4eZqp90' },
      { title: 'All of it (ft. Yung Kayo)', videoId: 'pXIdpFsyTdo' },
      { title: 'CMON', videoId: 'E_GmzW__MRA' },
      { title: 'MAD BOUT THAT', videoId: '-As2ehJX8Pk' },
      { title: 'FUKIT', videoId: '6dPMOotLMiQ'},
      { title: 'Monëy Twerk', videoId: 'Udi5-qWw4Dw'}
    ]
  },
  {
    name: 'Xavier Wulf',
    image: '/Images/Works/XavierWulf.jpg',
    description: "Underground sensation pushing musical boundaries",
    videos: [
      { title: 'Wulf Pesci', videoId: '8lZtA8D2GRk' },
      { title: 'The Truth (feat. Juicy J)', videoId: 'qxJf8Ulmi-Y' },
      { title: 'HOONIGAN', videoId: 'XoYaJZAVnK0'},
      { title: 'No Man (feat. Juicy J)', videoId: 'U9oZKpDMrb0' },
    ]
  },
  {
    name: 'Baby Tron',
    image: '/Images/Works/BabyTron.webp',
    description: "Detroit&apos;s finest, known for witty wordplay and unique style",
    videos: [
      { title: '3 Stooges Ft. BLP Kosher & Certified Trapper', videoId: 'u3-acd3nbpM' },
      { title: 'Rage Quit', videoId: 'HQdNHdDc_GM' },
      { title: 'Wake Tf Up', videoId: 'YriJduLzS34' },
    ]
  },
  {
    name: 'Juicy J',
    image: '/Images/Works/JuicyJ.webp',
    description: "Legendary rapper and producer with timeless hits",
    videos: [
      { title: 'The Truth (feat. Xavier Wulf)', videoId: 'qxJf8Ulmi-Y' },
      { title: 'Serenity', videoId: 'pNbbwcTwiPc' },
      {title: 'Bury My Problems', videoId: 'jJvdSxYlxWs'},
      { title: 'Drink To Escape', videoId: 'w_6v1DNoHxA' },
      { title: 'No Man (feat. Xavier Wulf)', videoId: 'U9oZKpDMrb0' },
      { title: 'Going Through Sum Sh..', videoId: 'Apc4MYu3HT4'}
    ]
  },
  {
    name: 'BLP Kosher',
    image: '/Images/Works/BLPKosher.jpeg',
    description: "Rising star with a unique vision and sound",
    videos: [
      { title: 'Close Proximity', videoId: 'ruSIE1K-kb4' },
      { title: 'Hour Glass', videoId: 'NTTEpDQ3IpI' }
    ]
  },
  {
    name: 'Dave Blunts',
    image: '/Images/Works/DaveBlunts.jpg',
    description: "Innovative artist pushing creative boundaries",
    videos: [
      { title: 'The Cup', videoId: 'Ssj5ZBuhwIo' },
    ]
  },
{
  name: 'RONDODASOSA',
  image: '/Images/Works/Rondodasosa.jpeg',
  description: "Rising star with a unique vision and sound",
  videos: [
    { title: 'SRT', videoId: 'nqIU_ipnFZU' }
  ]
},
{
  name: 'Rich Amiri',
  image: '/Images/Works/RichAmiri.jpeg',
  description: "Rising star with a unique vision and sound",
  videos: [
    { title: 'Bounty', videoId: 'JHPnZWRfdqU' },
  ]
},
{
  name: 'Keshore',
  image: '/Images/Works/Keshore.jpg',
  description: "Rising star with a unique vision and sound",
  videos: [
    { title: 'Kali Uchis 2 (feat. Destin Laurel', videoId: 'mLJ-l77Cd4g' },
    { title: 'Orange Juice', videoId: 'TR-cP_a2ic0' },
    { title: 'Sweet Coochie', videoId: 'q1jCzsp2Zv0' },
  ]
}
];

export default function Works() {
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

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

  const playVideo = (index) => {
    setCurrentVideoIndex(index);
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
            Music Videos
          </h1>
          <p className="text-gray-300 max-w-2xl mx-auto px-4">
            Explore our collection of groundbreaking music videos and visual experiences
          </p>
        </div>
      </div>

      {/* Featured Playlist Section */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4 -mt-20">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-black border border-gray-800 p-4 sm:p-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400">
            Featured Videos
            <span className="ml-3 text-sm font-normal text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full">
              {musicVideos.videos.length} Videos
            </span>
          </h2>
          
          {/* Main Video */}
          <div className="mb-6 sm:mb-12">
            <div className="relative rounded-lg sm:rounded-xl overflow-hidden bg-gray-900/30 border border-gray-800/30">
              <div className="relative pt-[56.25%]">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${musicVideos.videos[currentVideoIndex].videoId}`}
                  title={musicVideos.videos[currentVideoIndex].title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </div>
          </div>
            
          {/* Horizontal Carousel with Arrows */}
          <div className="relative">
            <h4 className="text-base sm:text-lg font-semibold text-white mb-3 sm:mb-4 flex items-center justify-between">
              <span>Next Up</span>
              <span className="text-xs sm:text-sm font-normal text-gray-400">
                Video {currentVideoIndex + 1} of {musicVideos.videos.length}
              </span>
            </h4>
            <div className="relative group">
              {/* Left Arrow */}
              <button 
                onClick={() => {
                  const container = document.getElementById('video-carousel');
                  container.scrollBy({ left: -container.offsetWidth, behavior: 'smooth' });
                }}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-8 sm:w-12 h-8 sm:h-12 flex items-center justify-center rounded-full bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
              >
                <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              
              {/* Right Arrow */}
              <button 
                onClick={() => {
                  const container = document.getElementById('video-carousel');
                  container.scrollBy({ left: container.offsetWidth, behavior: 'smooth' });
                }}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-8 sm:w-12 h-8 sm:h-12 flex items-center justify-center rounded-full bg-black/80 text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black"
              >
                <svg className="w-4 h-4 sm:w-6 sm:h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Carousel Container */}
              <div 
                id="video-carousel"
                className="overflow-hidden"
              >
                <div className="flex space-x-2 sm:space-x-4 transition-transform duration-300 ease-out">
                  {musicVideos.videos.map((video, index) => (
                    <button
                      key={video.videoId}
                      onClick={() => playVideo(index)}
                      className={`flex-shrink-0 w-40 sm:w-64 group ${
                        currentVideoIndex === index
                          ? 'ring-2 ring-blue-500 rounded-lg'
                          : ''
                      }`}
                    >
                      <div className="relative aspect-video rounded-lg overflow-hidden">
                        <Image
                          src={video.thumbnail}
                          alt={video.title}
                          fill
                          className="object-cover transform transition-transform duration-300 group-hover:scale-110"
                        />
                        {currentVideoIndex !== index && (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="w-8 h-8 sm:w-12 sm:h-12 rounded-full bg-white/20 flex items-center justify-center transform scale-75 group-hover:scale-100 transition-transform">
                              <svg className="w-4 h-4 sm:w-6 sm:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="mt-2">
                        <p className="text-xs sm:text-sm font-medium text-white line-clamp-1 group-hover:text-blue-400 transition-colors">
                          {video.title}
                        </p>
                        <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 sm:mt-1">
                          {video.artist}
                        </p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-0 right-0 -translate-y-1/4 translate-x-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
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
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
          onClick={(e) => {
            // Close only if clicking the overlay (not the modal content)
            if (e.target === e.currentTarget) {
              closeArtistModal();
            }
          }}
        >
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
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
          onClick={(e) => {
            // Close only if clicking the overlay (not the modal content)
            if (e.target === e.currentTarget) {
              closeVideoModal();
            }
          }}
        >
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