import React from 'react';
import { Link } from 'react-router-dom';
import  useWeb3  from '../hooks/useWeb3';
import ConnectWallet from './ConnectWallet';

const Navbar = () => {
  const { account, isAdmin } = useWeb3();

  return (
    <nav className="bg-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-white font-bold">SupplyChain DApp</span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <Link
                  to="/"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                >
                  Dashboard
                </Link>
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700"
                  >
                    Admin
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <ConnectWallet />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;