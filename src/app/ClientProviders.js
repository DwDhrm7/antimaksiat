"use client";

import { AuthProvider } from '../context/AuthContext';
import { ProductProvider } from '../context/ProductContext';

export default function ClientProviders({ children }) {
  return (
    <AuthProvider>
      <ProductProvider>
        {children}
      </ProductProvider>
    </AuthProvider>
  );
}
