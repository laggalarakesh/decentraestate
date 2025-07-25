
import React from 'react';
import { type Property } from '../types';
import { MapPinIcon, BuildingOfficeIcon, BanknotesIcon } from '@heroicons/react/24/outline';

interface PropertyCardProps {
  property: Property;
  onSelect: (property: Property) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onSelect }) => {
  const pricePerToken = property.price / property.totalTokens;

  return (
    <div 
        onClick={() => onSelect(property)}
        className="bg-slate-800 rounded-xl overflow-hidden shadow-lg hover:shadow-amber-500/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer group"
    >
      <div className="relative">
        <img className="w-full h-56 object-cover" src={property.imageUrl} alt={property.name} />
        <div className="absolute top-0 right-0 bg-slate-900/70 text-white px-3 py-1 m-2 rounded-full text-sm font-semibold">
          {property.yield}% Est. Yield
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-2xl font-bold text-white group-hover:text-amber-400 transition-colors duration-200">{property.name}</h3>
        <p className="text-slate-400 flex items-center gap-2 mt-1">
          <MapPinIcon className="h-4 w-4" />
          {property.address}
        </p>

        <div className="mt-4 flex justify-between items-center text-slate-300">
            <div className="flex items-center gap-2">
                <BuildingOfficeIcon className="h-5 w-5 text-amber-400"/>
                <span>{property.sqft.toLocaleString()} sqft</span>
            </div>
            <div className="flex items-center gap-4">
                 <span className='font-semibold'>{property.beds} beds</span>
                 <span className='font-semibold'>{property.baths} baths</span>
            </div>
        </div>

        <div className="mt-6 border-t border-slate-700 pt-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-sm text-slate-400">Price per token</p>
              <p className="text-xl font-bold text-white">${pricePerToken.toFixed(2)}</p>
            </div>
            <div className='text-right'>
                <p className="text-sm text-slate-400">Tokens Left</p>
                <p className="text-lg font-semibold text-white">{property.tokensAvailable.toLocaleString()} / {property.totalTokens.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
