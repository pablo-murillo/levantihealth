import { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { decryptLinkData } from '../utils/encryption';

export function ProductView() {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate('/expired');
      return;
    }

    const linkData = decryptLinkData(id);
    if (!linkData || linkData.expiresAt < Date.now()) {
      navigate('/expired');
      return;
    }

    // Apply styles to the button when the component mounts
    const styleButton = () => {
      const button = document.querySelector('form[name="PrePage"] input[type="submit"]');
      if (button) {
        button.className = 'w-full py-3 px-6 text-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md transition-colors duration-200 cursor-pointer';
      }
    };

    // Wait for the DOM to be ready
    setTimeout(styleButton, 0);
  }, [id, navigate]);

  if (!id) return null;

  const linkData = decryptLinkData(id);
  if (!linkData) return null;

  const product = products.find(p => p.itemId === linkData.productId);
  if (!product) return null;

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">{product.itemName}</h1>
          <div className="prose max-w-none">
            <style>
              {`
                form[name="PrePage"] {
                  display: flex;
                  justify-content: center;
                  padding: 2rem 0;
                }
                
                form[name="PrePage"] input[type="submit"] {
                  width: 100%;
                  padding: 0.75rem 1.5rem;
                  font-size: 1.125rem;
                  font-weight: 600;
                  color: white;
                  background-color: rgb(79, 70, 229);
                  border: none;
                  border-radius: 0.5rem;
                  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
                  cursor: pointer;
                  transition: background-color 200ms;
                }
                
                form[name="PrePage"] input[type="submit"]:hover {
                  background-color: rgb(67, 56, 202);
                }
              `}
            </style>
            <div dangerouslySetInnerHTML={{ __html: product.embeddedCode }} />
          </div>
        </div>
      </div>
    </div>
  );
}