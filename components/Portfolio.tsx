import React, { useState, useCallback } from 'react';
import { MOCK_USER_HOLDINGS, MOCK_PROPERTIES } from '../constants';
import { type UserHolding } from '../types';
import { GiftIcon, CheckCircleIcon, CurrencyDollarIcon, CpuChipIcon, InformationCircleIcon, UserGroupIcon } from '@heroicons/react/24/outline';

const Tooltip: React.FC<{ text: string, children: React.ReactNode }> = ({ text, children }) => {
    return (
        <div className="relative flex items-center group">
            {children}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-60 p-2 bg-slate-600 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 shadow-lg pointer-events-none">
                {text}
            </div>
        </div>
    );
};

const Portfolio: React.FC = () => {
  const [holdings, setHoldings] = useState<UserHolding[]>(MOCK_USER_HOLDINGS);
  const [claimingId, setClaimingId] = useState<number | null | 'all'>(null);

  const handleClaimRent = useCallback((propertyId: number) => {
    setClaimingId(propertyId);
    setTimeout(() => {
      setHoldings(prevHoldings => 
        prevHoldings.map(h => 
          h.propertyId === propertyId ? { ...h, accruedRent: 0 } : h
        )
      );
      setClaimingId(null);
    }, 1500);
  }, []);

  const handleClaimAll = useCallback(() => {
    setClaimingId('all');
    setTimeout(() => {
      setHoldings(prevHoldings => 
        prevHoldings.map(h => ({ ...h, accruedRent: 0 }))
      );
      setClaimingId(null);
    }, 2000);
  }, []);

  const totalAccruedRent = holdings.reduce((acc, h) => acc + h.accruedRent, 0);
  
  const totalInvestmentValue = holdings.reduce((acc, h) => {
    const property = MOCK_PROPERTIES.find(p => p.id === h.propertyId);
    if (!property) return acc;
    const ownershipValue = (h.tokensOwned / property.totalTokens) * property.price;
    return acc + ownershipValue;
  }, 0);

  return (
    <section id="portfolio" className="py-20 sm:py-24 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className='mb-4 md:mb-0'>
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">My Portfolio</h2>
              <p className="mt-2 text-lg text-slate-400">Your personal dashboard for tokenized assets and revenue.</p>
            </div>
             <div className="grid grid-cols-2 gap-4 text-right w-full md:w-auto">
                <div className="bg-slate-800 p-3 rounded-lg">
                    <p className="text-sm text-slate-400">Total Accrued Rent</p>
                    <p className="text-xl font-bold text-amber-400">${totalAccruedRent.toFixed(2)}</p>
                </div>
                <div className="bg-slate-800 p-3 rounded-lg">
                    <p className="text-sm text-slate-400">Total Investment Value</p>
                    <p className="text-xl font-bold text-white">${totalInvestmentValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
                </div>
            </div>
          </div>
          {totalAccruedRent > 0 && (
            <div className="mb-12 text-center">
            <button 
                onClick={handleClaimAll}
                disabled={!!claimingId}
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-6 rounded-lg transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {claimingId === 'all' ? <CpuChipIcon className="h-6 w-6 animate-spin" /> : <GiftIcon className="h-6 w-6" />}
                <span>{claimingId === 'all' ? 'Claiming All...' : `Claim All ($${totalAccruedRent.toFixed(2)})`}</span>
            </button>
            </div>
          )}
          <div className="space-y-6">
            {holdings.map(holding => {
              const property = MOCK_PROPERTIES.find(p => p.id === holding.propertyId);
              if (!property) return null;

              const isClaiming = claimingId === holding.propertyId;
              const hasClaimed = holding.accruedRent === 0 && MOCK_USER_HOLDINGS.find(h => h.propertyId === holding.propertyId)!.accruedRent > 0;

              return (
                <div key={property.id} className="bg-slate-800 rounded-xl p-4 flex flex-col sm:flex-row items-center gap-4 shadow-lg border border-slate-700 transition-all hover:border-amber-500/50 hover:shadow-amber-500/10">
                  <img src={property.imageUrl} alt={property.name} className="w-full sm:w-32 h-32 sm:h-24 object-cover rounded-lg flex-shrink-0" />
                  <div className="flex-grow text-center sm:text-left">
                    <h3 className="text-xl font-bold text-white">{property.name}</h3>
                    <div className="flex items-center justify-center sm:justify-start gap-x-4 gap-y-1 mt-2 text-slate-300 text-sm flex-wrap">
                        <span>{holding.tokensOwned} Tokens Owned</span>
                        <span className="text-slate-600 hidden sm:inline">•</span>
                        <div className="flex items-center gap-1">
                            <UserGroupIcon className="h-4 w-4" />
                            <span>{property.fractionalHolders} Holders</span>
                            <Tooltip text="This is the number of co-investors in this property.">
                                <InformationCircleIcon className="h-4 w-4 text-slate-500" />
                            </Tooltip>
                        </div>
                    </div>
                  </div>
                  <div className="w-full sm:w-auto flex-shrink-0 bg-slate-700/50 p-4 rounded-lg text-center">
                    <p className="text-sm text-slate-400 font-medium flex items-center justify-center gap-1">
                      Accrued Rent
                      <Tooltip text="Rental income is automatically collected and distributed to token holders via a secure Splitter ADO. This is your share, ready to be claimed.">
                        <InformationCircleIcon className="h-4 w-4 text-slate-500" />
                      </Tooltip>
                    </p>
                    <p className="text-2xl font-bold text-amber-400 my-1">${holding.accruedRent.toFixed(2)}</p>
                    <button 
                      onClick={() => handleClaimRent(property.id)} 
                      disabled={holding.accruedRent === 0 || !!claimingId}
                      className="w-full mt-2 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed"
                    >
                      {isClaiming ? <CpuChipIcon className="h-5 w-5 animate-spin" /> : hasClaimed ? <CheckCircleIcon className="h-5 w-5" /> : <GiftIcon className="h-5 w-5" />}
                      <span>{isClaiming ? 'Claiming...' : hasClaimed ? 'Claimed' : 'Claim Rent'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
             {MOCK_USER_HOLDINGS.length === 0 && (
                <div className="text-center py-16 bg-slate-800 rounded-xl border border-dashed border-slate-700">
                    <h3 className="text-xl font-semibold text-white">You haven’t invested in any properties yet.</h3>
                    <p className="text-slate-400 mt-2">Your portfolio will appear here once you buy your first property fractions.</p>
                     <a href="#featured-properties" className="mt-4 inline-block rounded-md bg-amber-500 px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm hover:bg-amber-400">
                        Explore the Marketplace →
                    </a>
                </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;