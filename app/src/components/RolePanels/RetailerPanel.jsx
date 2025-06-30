import React, { useState } from 'react';
import { useSupplyChain } from '../../hooks/useSupplyChain';
import ProductTable from '../ProductTable';

const RetailerPanel = () => {
  const { products, stockProduct } = useSupplyChain();
  const [productId, setProductId] = useState('');
  const [loading, setLoading] = useState(false);

  const handleStockProduct = async () => {
    if (!productId) {
      toast.error('Please select a product');
      return;
    }

    try {
      setLoading(true);
      await stockProduct(productId);
      setProductId('');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const stockableProducts = products.filter(p => p.status === 'Shipped');

  return (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Retailer Dashboard</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Product ID</label>
            <select
              value={productId}
              onChange={(e) => setProductId(e.target.value)}
              className="w-full bg-gray-700 rounded-md p-2 text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a product</option>
              {stockableProducts.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name} (ID: {product.id})
                </option>
              ))}
            </select>
          </div>
          
          <button
            onClick={handleStockProduct}
            disabled={loading || !productId}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md disabled:opacity-50"
          >
            {loading ? 'Processing...' : 'Stock Product'}
          </button>
        </div>
      </div>
      
      <ProductTable products={products} />
    </div>
  );
};

export default RetailerPanel;