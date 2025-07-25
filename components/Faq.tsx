
import React, { useState } from 'react';
import { FAQ_DATA } from '../constants';
import { ChevronDownIcon } from '@heroicons/react/24/solid';

const FaqItem: React.FC<{ item: { question: string; answer: string }, isOpen: boolean, onClick: () => void }> = ({ item, isOpen, onClick }) => {
  return (
    <div className="border-b border-slate-700 py-6">
      <dt>
        <button onClick={onClick} className="flex w-full items-start justify-between text-left text-slate-300">
          <span className="text-lg font-medium text-white">{item.question}</span>
          <span className="ml-6 flex h-7 items-center">
            <ChevronDownIcon className={`h-6 w-6 transform transition-transform duration-200 ${isOpen ? '-rotate-180' : 'rotate-0'}`} />
          </span>
        </button>
      </dt>
      {isOpen && (
        <dd className="mt-4 pr-12">
          <p className="text-base leading-7 text-slate-400">{item.answer}</p>
        </dd>
      )}
    </div>
  );
};


const Faq: React.FC = () => {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const handleClick = (index: number) => {
        setOpenIndex(openIndex === index ? null : index);
    };

  return (
    <section id="faq" className="py-20 sm:py-24 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Frequently Asked Questions</h2>
          <p className="mt-4 text-lg text-slate-400">
            Find answers to common questions about our platform.
          </p>
        </div>
        <dl className="space-y-2">
            {FAQ_DATA.map((item, index) => (
                <FaqItem 
                    key={index}
                    item={item}
                    isOpen={openIndex === index}
                    onClick={() => handleClick(index)}
                />
            ))}
        </dl>
      </div>
    </section>
  );
};

export default Faq;
