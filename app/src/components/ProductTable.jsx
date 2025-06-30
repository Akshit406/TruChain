import React from 'react';
import RoleBadge from './RoleBadge';

const statusColors = {
  Created: 'bg-blue-500',
  Shipped: 'bg-orange-500',
  Stocked: 'bg-purple-500',
  Purchased: 'bg-green-500'
};

const ProductTable = ({ products }) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 shadow-lg overflow-x-auto">
      <h2 className="text-xl font-semibold mb-4">Product Inventory</h2>
      
      <table className="min-w-full divide-y divide-gray-700">
        <thead>
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">ID</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Manufacturers</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Distributors</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Retailers</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Consumers</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-700">
          {products.map((product) => (
            <tr key={product.id} className="hover:bg-gray-700">
              <td className="px-6 py-4 whitespace-nowrap">{product.id}</td>
              <td className="px-6 py-4 whitespace-nowrap">{product.name}</td>
              <td className="px-6 py-4 whitespace-nowrap">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColors[product.status]}`}>
                  {product.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-wrap gap-1">
                  {product.manufacturers.map((addr, idx) => (
                    <RoleBadge key={idx} address={addr} />
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-wrap gap-1">
                  {product.distributors.map((addr, idx) => (
                    <RoleBadge key={idx} address={addr} />
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-wrap gap-1">
                  {product.retailers.map((addr, idx) => (
                    <RoleBadge key={idx} address={addr} />
                  ))}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex flex-wrap gap-1">
                  {product.consumers.map((addr, idx) => (
                    <RoleBadge key={idx} address={addr} />
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;