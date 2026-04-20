"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useProducts } from '../../context/ProductContext';

export default function Archive() {
  const { products: allProducts } = useProducts();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('default');

  let filtered = allProducts.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
  if (category !== 'All') {
    filtered = filtered.filter(p => p.category === category);
  }

  if (sort === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);

  return (
    <>
      <div className="noise-overlay"></div>
      <nav className="navbar" style={{ mixBlendMode: 'normal', backgroundColor: 'var(--black)', position: 'relative', borderBottom: '1px solid #333' }}>
        <div className="nav-logo">
          <Link href="/" style={{ display: 'flex', alignItems: 'center', fontFamily: 'var(--font-display)', fontSize: '2rem', textDecoration: 'none', color: 'var(--white)' }}>
            <span style={{ position: 'relative', display: 'inline-block' }}>
              ANTI
              <span style={{ position: 'absolute', top: '50%', left: '-5%', right: '-5%', height: '3px', backgroundColor: '#8b0000', transform: 'translateY(-50%)', zIndex: 2 }}></span>
            </span>
            <span>MAKSIAT<sup style={{ fontSize: '0.5em', marginLeft: '2px' }}>®</sup></span>
          </Link>
        </div>
        <div className="nav-links">
          <Link href="/" style={{ opacity: 1, textDecoration: 'underline' }}>BACK</Link>
        </div>
      </nav>

      <main style={{ padding: '4rem', minHeight: '100vh', backgroundColor: 'var(--black)' }}>
        <div style={{ marginBottom: '4rem', display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ position: 'relative', display: 'inline-block', transform: 'rotate(-2deg)' }}>
            <h1 className="headline-huge" style={{ fontSize: 'clamp(4rem, 10vw, 8rem)', color: 'var(--white)', textShadow: '6px 6px 0px #8b0000', margin: 0, textTransform: 'uppercase', letterSpacing: '2px' }}>
              FULL ARCHIVE
            </h1>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%) rotate(4deg)', backgroundColor: 'var(--white)', color: 'var(--black)', padding: '0.2rem 1rem', fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: '1.2rem', whiteSpace: 'nowrap', zIndex: 2, boxShadow: '4px 4px 0 #8b0000' }}>
              CLASSIFIED COLLECTION
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', backgroundColor: 'var(--white)', padding: '1rem', border: '4px solid black', boxShadow: '5px 5px 0 #8b0000', transform: 'rotate(1deg)' }}>
            <input 
              type="text" 
              placeholder="SEARCH CATALOGUE..." 
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ flex: 1, minWidth: '200px', padding: '0.8rem 1rem', border: '2px solid black', background: 'transparent', color: 'black', fontFamily: 'var(--font-body)', outline: 'none' }}
            />
            
            <select 
              value={category} 
              onChange={e => setCategory(e.target.value)}
              style={{ padding: '0.8rem 1rem', border: '2px solid black', background: 'black', color: 'white', fontFamily: 'var(--font-body)', outline: 'none', cursor: 'pointer' }}
            >
              <option value="All">ALL CATEGORIES</option>
              <option value="Tops">TOPS</option>
              <option value="Bottoms">BOTTOMS</option>
              <option value="Outerwear">OUTERWEAR</option>
              <option value="Accessories">ACCESSORIES</option>
            </select>

            <select 
              value={sort} 
              onChange={e => setSort(e.target.value)}
              style={{ padding: '0.8rem 1rem', border: '2px solid black', background: 'black', color: 'white', fontFamily: 'var(--font-body)', outline: 'none', cursor: 'pointer' }}
            >
              <option value="default">SORT BY: DEFAULT</option>
              <option value="price-asc">PRICE: LOW TO HIGH</option>
              <option value="price-desc">PRICE: HIGH TO LOW</option>
            </select>
          </div>
        </div>

        <div className="product-grid" style={{ maxWidth: '100%', gap: '3rem' }}>
          {filtered.length > 0 ? filtered.map(item => (
            <Link href={`/archive/${item.id}`} key={item.id} style={{ textDecoration: 'none' }}>
              <div className="product-card" style={{ cursor: 'pointer' }}>
                {item.isNew && <div className="badge-new">NEW CATALOGUE</div>}
                <img src={item.img} alt={item.alt} style={{ backgroundColor: '#f4f4f0' }} />
                <div className="product-info">
                  <span>{item.name}</span>
                  <span>${item.price}</span>
                </div>
              </div>
            </Link>
          )) : (
            <p style={{ color: 'white', fontFamily: 'var(--font-body)', fontSize: '1.5rem', textAlign: 'center', marginTop: '4rem' }}>NO ITEMS FOUND IN ARCHIVE.</p>
          )}
        </div>
      </main>
    </>
  );
}
