import { useNavigate } from 'react-router-dom';
import { LogOut, Package } from 'lucide-react';
import { useAuthStore } from '../stores/authStore';
import { products } from '../data/products';

export function Dashboard() {
  const navigate = useNavigate();
  const logout = useAuthStore(state => state.logout);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <button
            onClick={() => {
              logout();
              navigate('/login');
            }}
            className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Sign Out
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.itemId}
              onClick={() => navigate(`/product/${product.itemId}`)}
              className="bg-white rounded-lg shadow-md p-6 cursor-pointer transition-transform hover:scale-105"
            >
              <div className="flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-lg mb-4">
                <Package className="h-6 w-6 text-indigo-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {product.itemName}
              </h3>
              <p className="text-sm text-gray-600">ID: {product.itemId}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}