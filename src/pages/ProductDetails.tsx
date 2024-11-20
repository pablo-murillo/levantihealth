import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Link as LinkIcon, Copy } from 'lucide-react';
import { products } from '../data/products';
import { encryptLinkData } from '../utils/encryption';

export function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expirationTime, setExpirationTime] = useState('24');
  const [generatedLink, setGeneratedLink] = useState('');
  const product = products.find(p => p.itemId === id);

  if (!product) {
    return <div>Product not found</div>;
  }

  const generateLink = () => {
    // Convert to milliseconds - handle minutes and hours
    const multiplier = expirationTime === '0.0167' ? 60 * 1000 : parseInt(expirationTime) * 60 * 60 * 1000;
    const expiresAt = Date.now() + multiplier;
    
    const linkData = {
      productId: product.itemId,
      expiresAt
    };
    
    const encryptedData = encryptLinkData(linkData);
    const link = `${window.location.origin}/view/${encryptedData}`;
    setGeneratedLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedLink);
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/dashboard')}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Dashboard
        </button>

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">{product.itemName}</h1>
          <div className="mb-8">
            <p className="text-gray-600 mb-2">Item ID: {product.itemId}</p>
            <p className="text-gray-600">{product.description}</p>
          </div>

          <div className="mb-8">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Expiration Time
            </label>
            <div className="flex items-center">
              <Clock className="h-5 w-5 text-gray-400 mr-2" />
              <select
                value={expirationTime}
                onChange={(e) => setExpirationTime(e.target.value)}
                className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 rounded-md"
              >
                <option value="0.0167">1 minute</option>
                <option value="12">12 hours</option>
                <option value="24">24 hours</option>
                <option value="48">48 hours</option>
              </select>
            </div>
          </div>

          <button
            onClick={generateLink}
            className="w-full mb-6 flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <LinkIcon className="h-5 w-5 mr-2" />
            Generate Link
          </button>

          {generatedLink && (
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 mr-4">
                  <p className="text-sm font-medium text-gray-900">Generated Link:</p>
                  <p className="text-sm text-gray-500 break-all">{generatedLink}</p>
                </div>
                <button
                  onClick={copyToClipboard}
                  className="flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  <Copy className="h-4 w-4 mr-2" />
                  Copy
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}