import React, { createContext, useContext, useEffect, useState } from 'react';
import { ethers } from 'ethers';
import SupplyChainABI from '../../../build/contracts/SupplyChain.json';

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [contract, setContract] = useState(null);
  const [provider, setProvider] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [roles, setRoles] = useState({
    isManufacturer: false,
    isDistributor: false,
    isRetailer: false,
    isConsumer: false,
  });
  const [loading, setLoading] = useState(false);

  const contractAddress = import.meta.env.VITE_CONTRACT_ADDRESS;

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        alert('Please install MetaMask!');
        return;
      }

      setLoading(true);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);
      setProvider(provider);

      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, SupplyChainABI.abi, signer);
      setContract(contract);

      await checkRoles(contract, accounts[0]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const checkRoles = async (contract, account) => {
    try {
      const admin = await contract.isAdmin(account);
      setIsAdmin(admin);

      const newRoles = {
        isManufacturer: await contract.isManufacturer(account),
        isDistributor: await contract.isDistributor(account),
        isRetailer: await contract.isRetailer(account),
        isConsumer: await contract.isConsumer(account),
      };
      setRoles(newRoles);
    } catch (error) {
      console.error('Error checking roles:', error);
    }
  };

  useEffect(() => {
    if (!window.ethereum) return;

    const handleAccountsChanged = (accounts) => {
      if (accounts.length > 0) {
        setAccount(accounts[0]);
        checkRoles(contract, accounts[0]);
      } else {
        setAccount('');
        setIsAdmin(false);
        setRoles({
          isManufacturer: false,
          isDistributor: false,
          isRetailer: false,
          isConsumer: false,
        });
      }
    };

    window.ethereum.on('accountsChanged', handleAccountsChanged);

    return () => {
      window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
    };
  }, [contract]);

  return (
    <Web3Context.Provider
      value={{
        account,
        contract,
        provider,
        isAdmin,
        roles,
        loading,
        connectWallet,
        checkRoles,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export default Web3Context;
