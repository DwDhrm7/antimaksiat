"use client";

import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useProducts } from '../../context/ProductContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function AdminDashboard() {
  const { user, loading, logout } = useAuth();
  const { products, updateProduct, addProduct } = useProducts();
  const router = useRouter();
  
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: 0,
    category: 'Tops',
    stock: 0,
    img: '/images/product_shirt_1775644302740.png',
    description: '',
    sizes: ['S', 'M', 'L', 'XL']
  });

  useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== 'admin') {
    return <div style={{ backgroundColor: 'var(--black)', minHeight: '100vh', color: 'white', padding: '2rem' }}>VERIFYING AUTHORIZATION...</div>;
  }

  const handleStockChange = (id, delta) => {
    const product = products.find(p => p.id === id);
    if (product) {
      updateProduct(id, { stock: Math.max(0, product.stock + delta) });
    }
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    addProduct(newProduct);
    alert('SECURED: NEW ITEM ADDED TO CATALOGUE');
    setNewProduct({
      name: '',
      price: 0,
      category: 'Tops',
      stock: 0,
      img: '/images/product_shirt_1775644302740.png',
      description: '',
      sizes: ['S', 'M', 'L', 'XL']
    });
  };

  return (
    <div style={{ backgroundColor: 'var(--black)', minHeight: '100vh', color: 'var(--white)', padding: '2rem' }}>
      <div className="noise-overlay"></div>
      
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem', borderBottom: '2px solid white', paddingBottom: '1rem' }}>
        <h1 className="headline-huge" style={{ fontSize: '2rem' }}>ADMIN PANEL</h1>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <Link href="/" style={{ color: 'white' }}>SITE VIEW</Link>
          <button onClick={logout} style={{ background: 'red', color: 'white', border: 'none', padding: '0.5rem 1rem', cursor: 'pointer' }}>ABORT SESSION</button>
        </div>
      </nav>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
        
        {/* STOCK MANAGEMENT */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '2rem', borderBottom: '1px solid #444' }}>INVENTORY CONTROL</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {products.map(product => (
              <div key={product.id} style={{ backgroundColor: '#111', padding: '1rem', border: '1px solid #333', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 'bold' }}>{product.name}</div>
                  <div style={{ fontSize: '0.8rem', opacity: 0.6 }}>STOCK: {product.stock}</div>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button onClick={() => handleStockChange(product.id, -1)} style={{ padding: '0.5rem 1rem', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }}>-</button>
                  <button onClick={() => handleStockChange(product.id, 1)} style={{ padding: '0.5rem 1rem', background: '#8b0000', color: 'white', border: 'none', cursor: 'pointer' }}>+</button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ADD PRODUCT */}
        <section>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '2rem', marginBottom: '2rem', borderBottom: '1px solid #444' }}>ADD NEW ASSET</h2>
          <form onSubmit={handleAddProduct} style={{ display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#111', padding: '2rem', border: '1px solid #333' }}>
            <input 
              placeholder="PRODUCT NAME" 
              value={newProduct.name}
              onChange={e => setNewProduct({...newProduct, name: e.target.value})}
              style={{ padding: '0.8rem', background: 'black', border: '1px solid #444', color: 'white' }}
              required
            />
            <input 
              type="number" 
              placeholder="PRICE (USD)" 
              value={newProduct.price}
              onChange={e => setNewProduct({...newProduct, price: parseInt(e.target.value)})}
              style={{ padding: '0.8rem', background: 'black', border: '1px solid #444', color: 'white' }}
              required
            />
            <select 
              value={newProduct.category}
              onChange={e => setNewProduct({...newProduct, category: e.target.value})}
              style={{ padding: '0.8rem', background: 'black', border: '1px solid #444', color: 'white' }}
            >
              <option value="Tops">TOPS</option>
              <option value="Bottoms">BOTTOMS</option>
              <option value="Outerwear">OUTERWEAR</option>
              <option value="Accessories">ACCESSORIES</option>
            </select>
            <input 
              type="number" 
              placeholder="INITIAL STOCK" 
              value={newProduct.stock}
              onChange={e => setNewProduct({...newProduct, stock: parseInt(e.target.value)})}
              style={{ padding: '0.8rem', background: 'black', border: '1px solid #444', color: 'white' }}
              required
            />
            <textarea 
              placeholder="DESCRIPTION" 
              value={newProduct.description}
              onChange={e => setNewProduct({...newProduct, description: e.target.value})}
              style={{ padding: '0.8rem', background: 'black', border: '1px solid #444', color: 'white', minHeight: '100px' }}
              required
            />
            <button type="submit" style={{ padding: '1rem', background: 'white', color: 'black', fontFamily: 'var(--font-display)', cursor: 'pointer', border: 'none', fontSize: '1.2rem' }}>UPLOAD ASSET</button>
          </form>
        </section>
      </div>
    </div>
  );
}
