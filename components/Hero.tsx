
import React from 'react';

interface HeroProps {
  onExploreClick: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExploreClick }) => {
  return (
    <div className="relative isolate overflow-hidden bg-slate-900">
        <div 
            className="absolute inset-0 bg-cover bg-center opacity-20" 
            style={{ backgroundImage: "url('https://picsum.photos/seed/skyline/1920/1080')" }}>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
      
      <div className="relative mx-auto max-w-4xl py-32 sm:py-48 lg:py-56 px-4 text-center">
        <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Democratizing Real Estate Investment on the Blockchain
        </h1>
        <p className="mt-6 text-lg leading-8 text-slate-300">
          Buy, sell, and trade fractional ownership of premium properties. Powered by AI and secure blockchain technology.
        </p>
        <div className="mt-10 flex items-center justify-center gap-x-6">
          <button
            onClick={onExploreClick}
            className="rounded-md bg-amber-500 px-4 py-3 text-sm font-semibold text-slate-900 shadow-sm hover:bg-amber-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 transition-transform transform hover:scale-105"
          >
            Explore Properties
          </button>
          <a
            href="#portfolio"
            className="rounded-md px-4 py-3 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-slate-500 hover:bg-slate-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 transition-colors"
          >
            View My Portfolio
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;