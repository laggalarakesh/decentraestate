
import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturedProperties from './components/FeaturedProperties';
import HowItWorks from './components/HowItWorks';
import Faq from './components/Faq';
import Footer from './components/Footer';
import ListPropertyModal from './components/ListPropertyModal';
import { type Property } from './types';
import PropertyDetailsModal from './components/PropertyDetailsModal';
import { MOCK_PROPERTIES } from './constants';
import Portfolio from './components/Portfolio';

export default function App() {
  const [isListPropertyModalOpen, setListPropertyModalOpen] = useState(false);
  const [isPropertyDetailsModalOpen, setPropertyDetailsModalOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  const handleOpenListPropertyModal = () => setListPropertyModalOpen(true);
  const handleCloseListPropertyModal = () => setListPropertyModalOpen(false);

  const handleSelectProperty = (property: Property) => {
    setSelectedProperty(property);
    setPropertyDetailsModalOpen(true);
  };
  
  const handleClosePropertyDetails = () => {
    setPropertyDetailsModalOpen(false);
    // Delay clearing to allow for exit animation
    setTimeout(() => setSelectedProperty(null), 300);
  };

  useEffect(() => {
    // Prevent body scroll when a modal is open
    if (isListPropertyModalOpen || isPropertyDetailsModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isListPropertyModalOpen, isPropertyDetailsModalOpen]);

  return (
    <div className="bg-slate-900 min-h-screen font-sans">
      <Header onListPropertyClick={handleOpenListPropertyModal} />
      <main>
        <Hero onExploreClick={() => document.getElementById('featured-properties')?.scrollIntoView({ behavior: 'smooth' })} />
        <Portfolio />
        <FeaturedProperties properties={MOCK_PROPERTIES} onSelectProperty={handleSelectProperty} />
        <HowItWorks />
        <Faq />
      </main>
      <Footer />
      
      <ListPropertyModal 
        isOpen={isListPropertyModalOpen} 
        onClose={handleCloseListPropertyModal} 
      />

      {selectedProperty && (
        <PropertyDetailsModal
          isOpen={isPropertyDetailsModalOpen}
          onClose={handleClosePropertyDetails}
          property={selectedProperty}
        />
      )}
    </div>
  );
}