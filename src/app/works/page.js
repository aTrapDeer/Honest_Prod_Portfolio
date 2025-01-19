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
      { title: 'GO2WORK', videoId: 'NEFEwfPcXRA' },
      { title: 'Gët Busy', videoId: 'bd5l5NtzoWc' },
      { title: 'Never Again', videoId: 'n0iZ4eZqp90' },
      { title: 'CMON', videoId: 'E_GmzW__MRA' },
      { title: 'MAD BOUT THAT', videoId: '-As2ehJX8Pk' },
    ]
  },
  {
    name: 'Xavier Wulf',
    image: '/Images/Works/XavierWulf.jpg',
    description: "Underground sensation pushing musical boundaries",
    videos: [
      { title: 'The Truth (feat. Juicy J)', videoId: 'qxJf8Ulmi-Y' },
      { title: 'Wulf Pesci', videoId: '8lZtA8D2GRk' },
      { title: 'HOONIGAN', videoId: 'XoYaJZAVnK0'},
      { title: 'No Man (feat. Juicy J)', videoId: 'U9oZKpDMrb0' },
    ]
  },
  {
    name: 'Baby Tron',
    image: '/Images/Works/BabyTron.webp',
    description: "Detroit's finest, known for witty wordplay and unique style",
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
      { title: 'Serenity', videoId: 'pNbbwcTwiPc' },
      { title: 'Bury My Problems', videoId: 'jJvdSxYlxWs'},
      { title: 'Drink To Escape', videoId: 'w_6v1DNoHxA' },
      { title: 'Going Through Sum Sh..', videoId: 'Apc4MYu3HT4'}
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
    { title: 'Orange Juice', videoId: 'TR-cP_a2ic0' },
    { title: 'Sweet Coochie', videoId: 'q1jCzsp2Zv0' },
  ]
}
];

export default function Works() {
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const openVideoModal = (video) => {
    setSelectedVideo(video);
    setIsVideoModalOpen(true);
  };

  const closeVideoModal = () => {
    setIsVideoModalOpen(false);
    setSelectedVideo(null);
  };

  // Update the allVideos mapping to use different thumbnail qualities
  const allVideos = artists.flatMap(artist => 
    artist.videos.map(video => ({
      ...video,
      artist: video.videoId === 'NEFEwfPcXRA' ? 'Yeat x Summrs' : artist.name,
      thumbnail: `https://img.youtube.com/vi/${video.videoId}/maxresdefault.jpg`,
      hoverThumbnail: `https://img.youtube.com/vi/${video.videoId}/sddefault.jpg`, // Different thumbnail for hover
    }))
  );

  // Reorder the videos to match your desired sequence
  const orderedVideos = [
    // First big video - GO2WORK
    allVideos.find(v => v.videoId === 'NEFEwfPcXRA'),
    // Next 4 smaller videos
    ...allVideos.filter(v => !['NEFEwfPcXRA', 'Ssj5ZBuhwIo', 'bd5l5NtzoWc', 'qxJf8Ulmi-Y'].includes(v.videoId)).slice(0, 4),
    // Second big video - The Cup
    allVideos.find(v => v.videoId === 'Ssj5ZBuhwIo'),
    // Next 4 smaller videos
    ...allVideos.filter(v => !['NEFEwfPcXRA', 'Ssj5ZBuhwIo', 'bd5l5NtzoWc', 'qxJf8Ulmi-Y'].includes(v.videoId)).slice(4, 8),
    // Third big video - Get Busy
    allVideos.find(v => v.videoId === 'bd5l5NtzoWc'),
    // Next 4 smaller videos
    ...allVideos.filter(v => !['NEFEwfPcXRA', 'Ssj5ZBuhwIo', 'bd5l5NtzoWc', 'qxJf8Ulmi-Y'].includes(v.videoId)).slice(8, 12),
    // Fourth big video - The Truth
    allVideos.find(v => v.videoId === 'qxJf8Ulmi-Y'),
    // Remaining videos
    ...allVideos.filter(v => !['NEFEwfPcXRA', 'Ssj5ZBuhwIo', 'bd5l5NtzoWc', 'qxJf8Ulmi-Y'].includes(v.videoId)).slice(12)
  ].filter(Boolean);
  return (
    <div className="min-h-screen bg-black text-white pt-10"> {/* Added pt-20 for navbar space */}
      {/* Header */}
      <div className="py-8 px-4 max-w-[90vw] mx-auto">
        <h1 className="text-4xl font-horizon text-[#FFDDDD]">Music Videos</h1>
      </div>

      {/* Video Grid */}
      <div className="max-w-[90vw] mx-auto">
        {/* Videos are arranged in groups of 5 (1 large + 4 small) */}
        {Array.from({ length: Math.ceil(orderedVideos.length / 5) }).map((_, groupIndex) => {
          const startIdx = groupIndex * 5;
          const groupVideos = orderedVideos.slice(startIdx, startIdx + 5);
          
          return (
            <div key={groupIndex} className="mb-4">
              {/* Large Featured Video */}
              {groupVideos[0] && (
                <div 
                  onClick={() => openVideoModal(groupVideos[0])}
                  className="relative aspect-video w-full mb-4 cursor-pointer group overflow-hidden"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={groupVideos[0].thumbnail}
                      alt={groupVideos[0].title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <div className="absolute bottom-0 left-0 p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{groupVideos[0].title}</h3>
                      <p className="text-[#FFDDDD]">{groupVideos[0].artist}</p>
                    </div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Grid of 4 Smaller Videos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {groupVideos.slice(1).map((video, idx) => (
                  <div
                    key={video.videoId}
                    onClick={() => openVideoModal(video)}
                    className="relative aspect-video cursor-pointer group overflow-hidden"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={video.thumbnail}
                        alt={video.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                      <div className="absolute bottom-0 left-0 p-4">
                        <h3 className="text-sm font-bold text-white mb-1">{video.title}</h3>
                        <p className="text-xs text-[#FFDDDD]">{video.artist}</p>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                          <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
              ))}
            </div>
          </div>
          );
        })}
        </div>

      {/* Video Modal */}
      {isVideoModalOpen && selectedVideo && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              closeVideoModal();
            }
          }}
        >
          <div className="relative w-full max-w-6xl">
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