
import React, { useState, useCallback } from 'react';
import { XMarkIcon, SparklesIcon, DocumentCheckIcon, ArrowUpOnSquareIcon, CpuChipIcon } from '@heroicons/react/24/outline';
import { getPropertyValuation, verifyDocument } from '../services/geminiService';
import { type AIEvaluation, type AIDocumentVerification } from '../types';

interface ListPropertyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const fileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve((reader.result as string).split(',')[1]);
        reader.onerror = error => reject(error);
    });
};


const ListPropertyModal: React.FC<ListPropertyModalProps> = ({ isOpen, onClose }) => {
  const [address, setAddress] = useState('');
  const [documentFile, setDocumentFile] = useState<File | null>(null);
  const [isValuating, setIsValuating] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [aiEvaluation, setAIEvaluation] = useState<AIEvaluation | null>(null);
  const [aiVerification, setAIVerification] = useState<AIDocumentVerification | null>(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setDocumentFile(file);
      setFileName(file.name);
      setAIVerification(null); // Reset verification on new file
    }
  };

  const handleGetValuation = useCallback(async () => {
    if (!address) return;
    setIsValuating(true);
    setAIEvaluation(null);
    try {
      const result = await getPropertyValuation(address);
      setAIEvaluation(result);
    } catch (error) {
      console.error("Valuation failed:", error);
    } finally {
      setIsValuating(false);
    }
  }, [address]);

  const handleVerifyDocument = useCallback(async () => {
    if (!documentFile) return;
    setIsVerifying(true);
    setAIVerification(null);
    try {
      const fileBase64 = await fileToBase64(documentFile);
      const result = await verifyDocument(fileBase64, documentFile.type);
      setAIVerification(result);
    } catch (error) {
      console.error("Verification failed:", error);
    } finally {
      setIsVerifying(false);
    }
  }, [documentFile]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4">
      <div className="bg-slate-800 rounded-lg shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-slate-700 flex justify-between items-center sticky top-0 bg-slate-800 z-10">
          <h2 className="text-2xl font-bold text-white">List New Property</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>
        <div className="p-6 space-y-6">
          {/* Step 1: Property Details & AI Valuation */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Property Address</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="e.g., 123 Main St, Anytown, USA"
                className="w-full bg-slate-700 text-white rounded-md border-slate-600 focus:ring-amber-500 focus:border-amber-500"
              />
              <button onClick={handleGetValuation} disabled={!address || isValuating} className="flex items-center gap-2 bg-sky-600 hover:bg-sky-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed">
                {isValuating ? <CpuChipIcon className="h-5 w-5 animate-spin"/> : <SparklesIcon className="h-5 w-5" />}
                <span>{isValuating ? 'Valuating...' : 'AI Value'}</span>
              </button>
            </div>
            {aiEvaluation && (
              <div className="mt-4 p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                <p className="text-lg font-bold text-white">AI Valuation: ~${aiEvaluation.estimatedValue.toLocaleString()}</p>
                <p className="text-sm text-slate-400">Confidence: {aiEvaluation.confidence}</p>
                 <p className="text-xs text-slate-500 mt-2">*AI valuation is for reference only.</p>
              </div>
            )}
          </div>
          
          {/* Step 2: Document Upload & AI Verification */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Property Deed Document</label>
            <div className="flex gap-2">
                 <div className="relative w-full">
                    <input type="file" id="file-upload" className="sr-only" onChange={handleFileChange} accept="image/*,.pdf"/>
                    <label htmlFor="file-upload" className="w-full flex items-center justify-center gap-2 bg-slate-700 text-slate-300 rounded-md border-slate-600 py-2 px-3 cursor-pointer hover:bg-slate-600">
                      <ArrowUpOnSquareIcon className="h-5 w-5"/>
                      <span>{fileName || 'Upload Document'}</span>
                    </label>
                 </div>
              <button onClick={handleVerifyDocument} disabled={!documentFile || isVerifying} className="flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-semibold py-2 px-4 rounded-lg transition-all duration-300 disabled:bg-slate-600 disabled:cursor-not-allowed">
                 {isVerifying ? <CpuChipIcon className="h-5 w-5 animate-spin"/> : <DocumentCheckIcon className="h-5 w-5" />}
                <span>{isVerifying ? 'Verifying...' : 'AI Verify'}</span>
              </button>
            </div>
             {aiVerification && (
              <div className={`mt-4 p-4 bg-slate-700/50 rounded-lg border ${aiVerification.isValid ? 'border-green-500' : 'border-red-500'}`}>
                <p className={`text-lg font-bold ${aiVerification.isValid ? 'text-green-400' : 'text-red-400'}`}>
                    Document Verification: {aiVerification.isValid ? 'Looks Valid' : 'Issues Found'}
                </p>
                <p className="text-sm text-slate-300">Owner: {aiVerification.ownerName}</p>
                <p className="text-sm text-slate-300">Address Match: {aiVerification.propertyAddress}</p>
                {aiVerification.issues.length > 0 && <p className="text-sm text-red-400">Issues: {aiVerification.issues.join(', ')}</p>}
              </div>
            )}
          </div>

          {/* Step 3: Tokenization Details */}
           <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Total Fractional Tokens</label>
            <input type="number" placeholder="e.g., 1000" className="w-full bg-slate-700 text-white rounded-md border-slate-600 focus:ring-amber-500 focus:border-amber-500" />
          </div>
           <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Price per Token (in USD)</label>
            <input type="number" placeholder="e.g., 1250.00" className="w-full bg-slate-700 text-white rounded-md border-slate-600 focus:ring-amber-500 focus:border-amber-500" />
          </div>

        </div>
        <div className="p-6 border-t border-slate-700 sticky bottom-0 bg-slate-800 z-10">
          <button
            onClick={onClose}
            className="w-full bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold py-3 px-4 rounded-lg transition-all duration-300"
          >
            Submit for Listing
          </button>
        </div>
      </div>
    </div>
  );
};

export default ListPropertyModal;
