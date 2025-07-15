import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import useSupplyChain from '../../hooks/useSupplyChain';

const ManufacturerPanel = () => {
  const { addProduct } = useSupplyChain();
  const [productName, setProductName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAddProduct = async () => {
    if (!productName.trim()) {
      toast.error('Product name cannot be empty');
      return;
    }

    try {
      setLoading(true);
      await addProduct(productName);
      toast.success('Product added successfully!');
      setProductName('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to add product');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Manufacturer Dashboard</h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="w-full bg-gray-700 rounded-md p-2 text-white focus:ring-2 focus:ring-blue-500"
            placeholder="Enter product name"
          />
        </div>
        
        <button
          onClick={handleAddProduct}
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-md disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Product'}
        </button>
      </div>
    </div>
  );
};

export default ManufacturerPanel;