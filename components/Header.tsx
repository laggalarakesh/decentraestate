
import React from 'react';
import { APP_NAME, NAV_LINKS } from '../constants';
import { WalletIcon, BuildingOffice2Icon } from '@heroicons/react/24/outline';

interface HeaderProps {
    onListPropertyClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onListPropertyClick }) => {
  return (
    <header className="bg-slate-900/70 backdrop-blur-lg sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="flex-shrink-0 flex items-center gap-2">
              <BuildingOffice2Icon className="h-8 w-8 text-amber-400" />
              <span className="text-2xl font-bold text-white">{APP_NAME}</span>
            </a>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-slate-300 hover:text-amber-400 transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-4">
             <button
              onClick={onListPropertyClick}
              className="hidden sm:inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300"
            >
              List Property
            </button>
            <button
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-2 px-4 rounded-lg transition-all duration-300 transform hover:scale-105"
            >
              <WalletIcon className="h-5 w-5" />
              <span>Connect Wallet</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
