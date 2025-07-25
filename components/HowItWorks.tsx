import React from 'react';
import { ShieldCheckIcon, CubeTransparentIcon, ArrowsRightLeftIcon, CircleStackIcon, CodeBracketSquareIcon, CpuChipIcon, UserGroupIcon, BuildingStorefrontIcon } from '@heroicons/react/24/outline';

const HowItWorks: React.FC = () => {
  return (
    <section id="how-it-works" className="py-20 sm:py-24 bg-slate-800/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">How Real-World Assets are Tokenized On-Chain</h2>
          <p className="mt-4 text-lg text-slate-400">
            Our platform transforms illiquid, real-world assets into tradable digital tokens on the Andromeda blockchain using a modular, secure, and transparent framework.
          </p>
        </div>
        
        <div className="space-y-16">
            {/* Step 1 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h3 className="text-2xl font-bold text-amber-400 mb-4">1. Tokenize Your Asset</h3>
                     <p className="text-slate-300 space-y-3">
                        <span>A property owner uploads documents like the title deed. Our AI scans them using OCR to verify ownership and runs a valuation.</span>
                        <br/>
                        <span>Once verified, the property is represented as a unique <strong className="text-white">CW721 NFT</strong>, acting as the digital certificate of authenticity on-chain.</span>
                    </p>
                </div>
                <div className="flex justify-center items-center gap-4">
                     <CodeBracketSquareIcon className="h-16 w-16 text-sky-400" />
                     <CpuChipIcon className="h-16 w-16 text-sky-400" />
                     <CubeTransparentIcon className="h-16 w-16 text-sky-400" />
                </div>
            </div>

            {/* Step 2 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
                 <div className="flex justify-center items-center gap-4 md:order-2">
                     <CircleStackIcon className="h-16 w-16 text-green-400" />
                     <UserGroupIcon className="h-16 w-16 text-green-400" />
                </div>
                <div className="md:order-1">
                    <h3 className="text-2xl font-bold text-amber-400 mb-4">2. Create a Revenue Sharing Model</h3>
                    <p className="text-slate-300 space-y-3">
                        <span>The Property NFT is linked to a <strong className="text-white">CW20 token contract</strong>. These CW20s represent fractional shares of the property.</span>
                        <br/>
                        <span>A powerful <strong className="text-white">Splitter ADO</strong> is attached to automatically and transparently divide income (like rent) among all token holders.</span>
                    </p>
                </div>
            </div>
            
            {/* Step 3 */}
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                    <h3 className="text-2xl font-bold text-amber-400 mb-4">3. Enable Marketplace Listing & Trading</h3>
                    <p className="text-slate-300 space-y-3">
                        <span>Property tokens are listed on our secure marketplace, available to a global pool of investors.</span>
                        <br/>
                        <span>Investors can buy, sell, or bid on fractions 24/7, bringing unprecedented liquidity to real estate.</span>
                    </p>
                </div>
                <div className="flex justify-center items-center gap-4">
                     <BuildingStorefrontIcon className="h-16 w-16 text-purple-400" />
                     <ArrowsRightLeftIcon className="h-16 w-16 text-purple-400" />
                </div>
            </div>
        </div>

        {/* User Journey */}
        <div className="mt-20">
            <h3 className="text-2xl font-bold text-white text-center mb-8">User Journey Flowchart</h3>
            <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-center">
                <div className="p-4 rounded-lg bg-slate-700"><span className="font-bold text-sky-400">Owner:</span> Upload → AI Verify → Mint NFT</div>
                <div className="text-2xl text-amber-400 font-sans transform rotate-90 md:rotate-0">→</div>
                <div className="p-4 rounded-lg bg-slate-700"><span className="font-bold text-purple-400">Platform:</span> List on Marketplace</div>
                <div className="text-2xl text-amber-400 font-sans transform rotate-90 md:rotate-0">→</div>
                 <div className="p-4 rounded-lg bg-slate-700"><span className="font-bold text-green-400">Investor:</span> Browse → Buy → Earn & Claim</div>
            </div>
        </div>
        
        {/* Security Section */}
        <div className="mt-20 p-8 bg-slate-900/50 rounded-xl border border-slate-700 text-center">
             <ShieldCheckIcon className="h-12 w-12 text-amber-400 mx-auto mb-4"/>
             <h3 className="text-2xl font-bold text-white mb-4">Security, Transparency, and The Andromeda Advantage</h3>
             <p className="text-slate-400 max-w-3xl mx-auto">
                By building on Andromeda, we leverage audited, battle-tested ADOs for core functions like marketplaces, token standards, and revenue splitting. This modular approach drastically reduces development time, minimizes security risks, and ensures every action is transparently recorded on the blockchain. The result is a more secure, efficient, and accessible real estate market for everyone.
             </p>
        </div>

      </div>
    </section>
  );
};

export default HowItWorks;
