import React from 'react';
import { useWeb3 } from '../hooks/useWeb3';

const ConnectWallet = () => {
  const { account, connectWallet, loading } = useWeb3();

  if (loading) {
    return (
      <div className="px-4 py-2 rounded-md bg-gray-700 text-white">
        Connecting...
      </div>
    );
  }

  if (account) {
    return (
      <div className="px-4 py-2 rounded-md bg-green-600 text-white">
        {`${account.substring(0, 6)}...${account.substring(38)}`}
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
    >
      Connect Wallet
    </button>
  );
};

export default ConnectWallet;