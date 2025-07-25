
import React, { useState } from 'react';
import { XMarkIcon, MapPinIcon, BuildingOfficeIcon, BanknotesIcon, ChartPieIcon, TagIcon, ClockIcon, InformationCircleIcon } from '@heroicons/react/24/outline';
import { type Property } from '../types';
import { MOCK_MARKET_OFFERS, MOCK_OWNERSHIP_HISTORY } from '../constants';

interface PropertyDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  property: Property;
}

const PropertyDetailsModal: React.FC<PropertyDetailsModalProps> = ({ isOpen, onClose, property }) => {
  const [activeTab, setActiveTab] = useState('Details');

  if (!isOpen) return null;

  const pricePerToken = property.price / property.totalTokens;
  const ownershipPercentage = ((property.totalTokens - property.tokensAvailable) / property.totalTokens) * 100;
  
  const marketOffers = MOCK_MARKET_OFFERS[property.id] || [];
  const ownershipHistory = MOCK_OWNERSHIP_HISTORY[property.id] || [];
  
  const tabs = [
    { name: 'Details', icon: InformationCircleIcon },
    { name: 'Market Offers', icon: TagIcon },
    { name: 'Ownership History', icon: ClockIcon },
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4 transition-opacity duration-300" onClick={onClose}>
      <div className="bg-slate-800 rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col md:flex-row overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="w-full md:w-1/2">
          <img src={property.imageUrl} alt={property.name} className="w-full h-64 md:h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 flex flex-col">
          <div className="p-6 flex-grow overflow-y-auto">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold text-white">{property.name}</h2>
                <p className="text-slate-400 flex items-center gap-2 mt-1">
                  <MapPinIcon className="h-5 w-5" />
                  {property.address}
                </p>
              </div>
              <button onClick={onClose} className="text-slate-400 hover:text-white">
                <XMarkIcon className="h-7 w-7" />
              </button>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                <div className="bg-slate-700/50 p-3 rounded-lg">
                    <p className="text-sm text-slate-400">Total Value</p>
                    <p className="text-xl font-bold text-white">${property.price.toLocaleString()}</p>
                </div>
                 <div className="bg-slate-700/50 p-3 rounded-lg">
                    <p className="text-sm text-slate-400">Est. Annual Yield</p>
                    <p className="text-xl font-bold text-amber-400">{property.yield}%</p>
                </div>
            </div>
            
            <div className="mt-6 border-b border-slate-700">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    {tabs.map((tab) => (
                         <button
                            key={tab.name}
                            onClick={() => setActiveTab(tab.name)}
                            className={`${
                                activeTab === tab.name
                                ? 'border-amber-400 text-amber-400'
                                : 'border-transparent text-slate-400 hover:text-white hover:border-slate-500'
                            } flex items-center gap-2 whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors`}
                        >
                            <tab.icon className="h-5 w-5" />
                            {tab.name}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-6">
                {activeTab === 'Details' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="space-y-4">
                            <div className="flex items-center gap-3"><BuildingOfficeIcon className="h-6 w-6 text-sky-400"/><span className="text-slate-300">{property.beds} Bedrooms, {property.baths} Bathrooms, {property.sqft.toLocaleString()} sqft</span></div>
                            <div className="flex items-center gap-3"><BanknotesIcon className="h-6 w-6 text-green-400"/><span className="text-slate-300">Price per token: <span className="font-bold text-white">${pricePerToken.toFixed(2)}</span></span></div>
                            <div className="flex items-center gap-3"><ChartPieIcon className="h-6 w-6 text-purple-400"/><span className="text-slate-300">Tokens available: <span className="font-bold text-white">{property.tokensAvailable.toLocaleString()} / {property.totalTokens.toLocaleString()}</span></span></div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-400">Token Ownership</label>
                            <div className="w-full bg-slate-700 rounded-full h-2.5 mt-1"><div className="bg-amber-500 h-2.5 rounded-full" style={{ width: `${ownershipPercentage}%` }}></div></div>
                            <p className="text-right text-sm text-slate-400 mt-1">{ownershipPercentage.toFixed(1)}% sold</p>
                        </div>
                        <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-700">
                            <h3 className="font-bold text-white mb-2">AI-Powered Insights</h3>
                            <p className="text-sm text-slate-300">AI Estimated Value: <span className="font-semibold text-sky-400">~${(property.price * 1.05).toLocaleString()}</span></p>
                            <p className="text-sm text-slate-300">Document Verification: <span className="font-semibold text-green-400">Verified</span></p>
                        </div>
                    </div>
                )}
                {activeTab === 'Market Offers' && (
                     <div className="space-y-3 animate-fade-in">
                        {marketOffers.length > 0 ? marketOffers.map((offer, index) => (
                            <div key={index} className="bg-slate-700/50 p-3 rounded-lg flex justify-between items-center">
                                <div>
                                    <span className={`font-bold ${offer.type === 'Buy' ? 'text-green-400' : 'text-red-400'}`}>{offer.type}</span>
                                    <span className="text-white ml-2">{offer.tokens} tokens</span>
                                    <span className="text-slate-400 text-sm ml-2">by {offer.user}</span>
                                </div>
                                <div className="text-right">
                                     <p className="font-semibold text-white">${offer.pricePerToken.toFixed(2)} / token</p>
                                     <p className="text-xs text-slate-400">Total: ${(offer.tokens * offer.pricePerToken).toLocaleString()}</p>
                                </div>
                            </div>
                        )) : <p className="text-slate-400 text-center py-4">No open offers for this property.</p>}
                    </div>
                )}
                {activeTab === 'Ownership History' && (
                     <div className="space-y-3 animate-fade-in">
                        {ownershipHistory.length > 0 ? ownershipHistory.map((item, index) => (
                             <div key={index} className="bg-slate-700/50 p-3 rounded-lg">
                                <div className="flex justify-between items-center">
                                    <span className="font-bold text-white">{item.event}</span>
                                    <span className="text-slate-400 text-sm">{item.date}</span>
                                </div>
                                <p className="text-sm text-slate-300 mt-1 truncate">
                                    <span className="text-slate-400">From:</span> {item.from} <span className="text-slate-400">To:</span> {item.to}
                                </p>
                                 <p className="text-sm font-semibold text-white mt-1">{item.tokens} tokens</p>
                            </div>
                        )) : <p className="text-slate-400 text-center py-4">No transaction history found.</p>}
                    </div>
                )}
            </div>
          </div>

          <div className="p-6 bg-slate-800/50 border-t border-slate-700 mt-auto">
            <div className="flex gap-4">
              <input type="number" placeholder="Amount of tokens" className="w-full bg-slate-700 text-white rounded-md border-slate-600 focus:ring-amber-500 focus:border-amber-500" />
              <button className="bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-6 rounded-lg transition-all whitespace-nowrap">
                Buy Fractions
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetailsModal;
