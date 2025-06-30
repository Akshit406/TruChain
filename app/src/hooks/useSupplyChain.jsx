import { useState, useEffect } from 'react';
import  useWeb3  from './useWeb3';
import { toast } from 'react-hot-toast';

const useSupplyChain = () => {
  const { contract, account } = useWeb3();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchProducts = async () => {
    if (!contract) return;

    try {
      setLoading(true);
      const productCount = await contract.productCounter();
      const productArray = [];

      for (let i = 1; i <= productCount; i++) {
        const product = await contract.getProduct(i);
        productArray.push({
          id: i,
          name: product.name,
          status: getStatusName(product.state),
          manufacturers: product.manufacturers,
          distributors: product.distributors,
          retailers: product.retailers,
          consumers: product.consumers
        });
      }

      setProducts(productArray);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusName = (statusCode) => {
    switch(statusCode) {
      case 0: return 'Created';
      case 1: return 'Shipped';
      case 2: return 'Stocked';
      case 3: return 'Purchased';
      default: return 'Unknown';
    }
  };

  const addProduct = async (name) => {
    if (!contract) return;

    try {
      setLoading(true);
      const tx = await contract.addProduct(name);
      await tx.wait();
      await fetchProducts();
      toast.success('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Failed to add product');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const shipProduct = async (productId) => {
    if (!contract) return;

    try {
      setLoading(true);
      const tx = await contract.shipProduct(productId);
      await tx.wait();
      await fetchProducts();
      toast.success('Product shipped successfully!');
    } catch (error) {
      console.error('Error shipping product:', error);
      toast.error('Failed to ship product');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const stockProduct = async (productId) => {
    if (!contract) return;

    try {
      setLoading(true);
      const tx = await contract.stockProduct(productId);
      await tx.wait();
      await fetchProducts();
      toast.success('Product stocked successfully!');
    } catch (error) {
      console.error('Error stocking product:', error);
      toast.error('Failed to stock product');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const purchaseProduct = async (productId) => {
    if (!contract) return;

    try {
      setLoading(true);
      const tx = await contract.purchaseProduct(productId);
      await tx.wait();
      await fetchProducts();
      toast.success('Product purchased successfully!');
    } catch (error) {
      console.error('Error purchasing product:', error);
      toast.error('Failed to purchase product');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [contract, account]);

  return {
    products,
    loading,
    addProduct,
    shipProduct,
    stockProduct,
    purchaseProduct,
    fetchProducts
  };
};

export default useSupplyChain;