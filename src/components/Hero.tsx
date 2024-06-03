// src/components/Hero.tsx
import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gray-200 h-80 flex items-center justify-center">
      <img
        src="2.png" 
        alt="Shop title"
        className="absolute w-full max-h-full object-cover"
        sizes="(max-width: 480px) 480px,
               (max-width: 768px) 768px,
               (max-width: 1200px) 1200px,
               1600px"
      />
      
    </section>
  );
};

export default Hero;
