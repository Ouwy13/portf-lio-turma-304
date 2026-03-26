import { motion } from 'motion/react';

export default function VideoBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden bg-[#050505]">
      {/* Overlay para escurecer o vídeo e garantir legibilidade */}
      <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[2px]" />
      
      <video
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover opacity-60"
      >
        {/* Usando um vídeo de alta qualidade do universo em loop */}
        <source 
          src="https://assets.mixkit.co/videos/preview/mixkit-stars-in-the-deep-space-1164-large.mp4" 
          type="video/mp4" 
        />
        Your browser does not support the video tag.
      </video>

      {/* Gradientes extras para profundidade */}
      <div className="absolute inset-0 z-20 bg-gradient-to-b from-transparent via-black/20 to-[#050505]" />
    </div>
  );
}
