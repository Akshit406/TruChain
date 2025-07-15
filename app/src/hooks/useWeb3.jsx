import { useContext } from 'react';
import Web3Context  from '../contexts/Web3Context';

const useWeb3 = () => {
  return useContext(Web3Context);
};

export default useWeb3;