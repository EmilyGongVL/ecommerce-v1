'use client';

import { useRef, useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';

export function VideoHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [mounted, setMounted] = useState(false);

  // Auto-play video when component mounts
  useEffect(() => {
    setMounted(true);

    if (videoRef.current) {
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Auto-play was prevented
        setIsPlaying(false);
      });
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.pause();
      }
    };
  }, []);

  const togglePlay = () => {
    if (!videoRef.current || !mounted) return;

    if (isPlaying) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }

    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (!videoRef.current || !mounted) return;

    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(!isMuted);
  };

  return (
    <div className="relative w-full h-[60vh] overflow-hidden">
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        loop
        muted={isMuted}
        playsInline
      >
        <source
          src="https://static.videezy.com/system/resources/previews/000/051/460/original/Ecommerce_website.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Content */}
      <div className="relative z-10 container mx-auto h-full flex flex-col justify-center items-start text-white">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
          Discover Unique <br />Stores & Products
        </h1>
        <p className="text-lg md:text-xl max-w-md mb-8">
          Explore a world of curated stores and find exactly what you&apos;ve been looking for.
        </p>
        <Button size="lg" className="bg-primary hover:bg-primary/90">
          Explore Stores
        </Button>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-4 right-4 flex space-x-2">
        <Button
          variant="secondary"
          size="icon"
          className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-full h-10 w-10"
          onClick={togglePlay}
        >
          {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </Button>
        <Button
          variant="secondary"
          size="icon"
          className="bg-black/50 backdrop-blur-sm hover:bg-black/70 text-white rounded-full h-10 w-10"
          onClick={toggleMute}
        >
          {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
        </Button>
      </div>
    </div>
  );
}