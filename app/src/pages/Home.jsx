import React from 'react';
import  useWeb3  from '../hooks/useWeb3';
import RoleViewSwitcher from '../components/RoleViewSwitcher';

const Home = () => {
  const { account } = useWeb3();

  return (
    <div className="container mx-auto px-4 py-8">
      {account ? (
        <RoleViewSwitcher />
      ) : (
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold mb-4">Welcome to SupplyChain DApp</h1>
          <p className="text-gray-400 mb-6">Please connect your wallet to continue</p>
        </div>
      )}
    </div>
  );
};

export default Home;