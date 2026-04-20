"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { getProducts as getInitialProducts } from '../data/products';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const savedProducts = localStorage.getItem('am_products');
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    } else {
      const initial = getInitialProducts();
      setProducts(initial);
      localStorage.setItem('am_products', JSON.stringify(initial));
    }
  }, []);

  const addProduct = (newProduct) => {
    const updated = [...products, { ...newProduct, id: String(Date.now()) }];
    setProducts(updated);
    localStorage.setItem('am_products', JSON.stringify(updated));
  };

  const updateProduct = (id, updates) => {
    const updated = products.map(p => p.id === id ? { ...p, ...updates } : p);
    setProducts(updated);
    localStorage.setItem('am_products', JSON.stringify(updated));
  };

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
