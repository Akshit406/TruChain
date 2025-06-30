import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useSupplyChain } from '../../hooks/useSupplyChain';
import ProductTable from '../ProductTable';

const DistributorPanel = () => {
  const { products, shipProduct } = useSupplyChain();
  const [productId, setProductId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleShipProduct = async () => {
    if (!productId) {
      toast.error('Please select a product');
      return;
    }

    try {
      setLoading(true);
      await shipProduct(productId);
      toast.success('Product shipped successfully!');
      setProductId('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to ship product');
    } finally {
      setLoading(false);
    }
  };

  const shipableProducts = products.filter(p => p.status === 'Created');

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Distributor Dashboard</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product ID</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full bg-gray-700 rounded-md p-2 text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a product</option>
              {shipableProducts.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} (ID: {product.id})
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleShipProduct}
            disabled={loading || !productId}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md disabled:opacity-50"
          >
            {loading ? 'Shipping...' : 'Ship Product'}
          </button>
        </div>
      </div>
      
      <ProductTable products={products} />
    </div>
  );
};

export default DistributorPanel;