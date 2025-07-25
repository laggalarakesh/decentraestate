import React, { useState, useMemo } from 'react';
import { type Property } from '../types';
import PropertyCard from './PropertyCard';

interface FeaturedPropertiesProps {
  properties: Property[];
  onSelectProperty: (property: Property) => void;
}

const FeaturedProperties: React.FC<FeaturedPropertiesProps> = ({ properties, onSelectProperty }) => {
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [ownership, setOwnership] = useState('');

  const filteredProperties = useMemo(() => {
    return properties.filter(p => {
      const minPrice = parseFloat(priceRange.min) || 0;
      const maxPrice = parseFloat(priceRange.max) || Infinity;
      if (p.price < minPrice || p.price > maxPrice) {
        return false;
      }
      
      const ownershipSold = ((p.totalTokens - p.tokensAvailable) / p.totalTokens) * 100;
      const desiredOwnership = parseFloat(ownership);
      if (!isNaN(desiredOwnership) && ownershipSold < desiredOwnership) {
        return false;
      }

      return true;
    });
  }, [properties, priceRange, ownership]);

  return (
    <section id="featured-properties" className="py-20 sm:py-24 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center lg:max-w-4xl mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Marketplace</h2>
          <p className="mt-4 text-lg text-slate-400">
            Discover, filter, and invest in tokenized real estate opportunities.
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-12 p-6 bg-slate-800/50 rounded-xl border border-slate-700 flex flex-col md:flex-row gap-4 items-center">
            <div className="w-full md:w-1/3">
                <label className="block text-sm font-medium text-slate-300 mb-1">Category</label>
                <select className="w-full bg-slate-700 text-white rounded-md border-slate-600 focus:ring-amber-500 focus:border-amber-500">
                    <option>Real Estate</option>
                    <option disabled>Art (Coming Soon)</option>
                    <option disabled>IP (Coming Soon)</option>
                </select>
            </div>
            <div className="w-full md:w-1/3">
                 <label className="block text-sm font-medium text-slate-300 mb-1">Price Range (USD)</label>
                 <div className="flex items-center gap-2">
                    <input type="number" placeholder="Min" value={priceRange.min} onChange={e => setPriceRange(prev => ({ ...prev, min: e.target.value }))} className="w-full bg-slate-700 text-white rounded-md border-slate-600 focus:ring-amber-500 focus:border-amber-500" />
                    <span className="text-slate-400">-</span>
                    <input type="number" placeholder="Max" value={priceRange.max} onChange={e => setPriceRange(prev => ({ ...prev, max: e.target.value }))} className="w-full bg-slate-700 text-white rounded-md border-slate-600 focus:ring-amber-500 focus:border-amber-500" />
                 </div>
            </div>
             <div className="w-full md:w-1/3">
                 <label className="block text-sm font-medium text-slate-300 mb-1">Min Ownership Sold (%)</label>
                 <input type="number" placeholder="e.g. 10" value={ownership} onChange={e => setOwnership(e.target.value)} className="w-full bg-slate-700 text-white rounded-md border-slate-600 focus:ring-amber-500 focus:border-amber-500" />
            </div>
        </div>
        
        {filteredProperties.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredProperties.map((property) => (
                <PropertyCard key={property.id} property={property} onSelect={onSelectProperty} />
            ))}
            </div>
        ) : (
             <div className="text-center py-16 bg-slate-800/50 rounded-xl border border-dashed border-slate-700">
                <h3 className="text-xl font-semibold text-white">No Properties Match Your Filters</h3>
                <p className="text-slate-400 mt-2">Try adjusting your search criteria.</p>
            </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties;