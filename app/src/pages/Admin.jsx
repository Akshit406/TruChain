import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import { useWeb3 } from '../hooks/useWeb3';

const Admin = () => {
  const { contract, account } = useWeb3();
  const [address, setAddress] = useState('');
  const [selectedRole, setSelectedRole] = useState('manufacturer');
  const [loading, setLoading] = useState(false);

  const handleAssignRole = async () => {
    if (!ethers.utils.isAddress(address)) {
      toast.error('Invalid Ethereum address');
      return;
    }

    try {
      setLoading(true);
      let tx;
      
      switch(selectedRole) {
        case 'manufacturer':
          tx = await contract.addManufacturer(address);
          break;
        case 'distributor':
          tx = await contract.addDistributor(address);
          break;
        case 'retailer':
          tx = await contract.addRetailer(address);
          break;
        case 'consumer':
          tx = await contract.addConsumer(address);
          break;
        default:
          throw new Error('Invalid role selected');
      }

      await tx.wait();
      toast.success(`Role ${selectedRole} assigned successfully!`);
      setAddress('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to assign role');
    } finally {
      setLoading(false);
    }
  };

  const handleRevokeRole = async () => {
    if (!ethers.utils.isAddress(address)) {
      toast.error('Invalid Ethereum address');
      return;
    }

    try {
      setLoading(true);
      let tx;
      
      switch(selectedRole) {
        case 'manufacturer':
          tx = await contract.removeManufacturer(address);
          break;
        case 'distributor':
          tx = await contract.removeDistributor(address);
          break;
        case 'retailer':
          tx = await contract.removeRetailer(address);
          break;
        case 'consumer':
          tx = await contract.removeConsumer(address);
          break;
        default:
          throw new Error('Invalid role selected');
      }

      await tx.wait();
      toast.success(`Role ${selectedRole} revoked successfully!`);
      setAddress('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to revoke role');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg max-w-2xl mx-auto">
        <h2 className="text-xl font-semibold mb-4">Manage Roles</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Wallet Address</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full bg-gray-700 rounded-md p-2 text-white focus:ring-2 focus:ring-blue-500"
              placeholder="0x..."
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              value={selectedRole}
              onChange={(e) => setSelectedRole(e.target.value)}
              className="w-full bg-gray-700 rounded-md p-2 text-white focus:ring-2 focus:ring-blue-500"
            >
              <option value="manufacturer">Manufacturer</option>
              <option value="distributor">Distributor</option>
              <option value="retailer">Retailer</option>
              <option value="consumer">Consumer</option>
            </select>
          </div>
          
          <div className="flex space-x-4 pt-2">
            <button
              onClick={handleAssignRole}
              disabled={loading || !address}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded-md disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Assign Role'}
            </button>
            
            <button
              onClick={handleRevokeRole}
              disabled={loading || !address}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-md disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Revoke Role'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;