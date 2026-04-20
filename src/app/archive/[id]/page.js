"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { useProducts } from '../../../context/ProductContext';

export default function ProductDetail({ params }) {
  const { user } = useAuth();
  const { products } = useProducts();
  const router = useRouter();
  const pathname = usePathname();

  // Safe unwrapping for Next.js 15+ dynamic params
  const unwrappedParams = React.use ? React.use(params) : params;
  const id = unwrappedParams?.id;
  
  const product = products.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState('');
  const [isSecuring, setIsSecuring] = useState(false);
  const [secured, setSecured] = useState(false);
  const [showBack, setShowBack] = useState(false);

  const handleSecureItem = () => {
    if (!user) {
      router.push(`/login?redirect=${pathname}`);
      return;
    }
    if (!selectedSize) {
      alert("WARNING: PLEASE SELECT A SIZE BEFORE SECURING ITEM");
      return;
    }
    setIsSecuring(true);
    // Simulate pinging bank and sending encrypted email receipt
    setTimeout(() => {
      setIsSecuring(false);
      setSecured(true);
    }, 2500);
  };

  if (!product) {
    return (
      <div style={{ backgroundColor: 'var(--black)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
        <div style={{ textAlign: 'center' }}>
          <h1 className="headline-huge" style={{ transform: 'rotate(-2deg)' }}>ARCHIVE NOT FOUND</h1>
          <Link href="/archive" style={{ display: 'inline-block', marginTop: '2rem', textDecoration: 'none', color: 'var(--black)', backgroundColor: 'var(--white)', border: '4px solid var(--black)', padding: '1rem 2rem', fontFamily: 'var(--font-display)', fontSize: '1.5rem', textTransform: 'uppercase', boxShadow: '6px 6px 0 #8b0000', transform: 'rotate(1deg)', transition: 'transform 0.2s' }}>GO BACK</Link>
        </div>
      </div>
    );
  }

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
          <Link href="/archive" style={{ opacity: 1, textDecoration: 'underline' }}>BACK</Link>
        </div>
      </nav>

      <main style={{ padding: '4rem', minHeight: '100vh', backgroundColor: 'var(--black)', color: 'var(--white)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '4rem', maxWidth: '1200px', margin: '0 auto' }}>
          
          <div style={{ position: 'relative', height: 'fit-content', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div 
              style={{ position: 'relative', backgroundColor: 'var(--white)', border: '4px solid black', padding: '1rem', boxShadow: '15px 15px 0 #8b0000', transform: 'rotate(-1deg)', cursor: product.imgBack ? 'pointer' : 'default' }}
              onMouseEnter={() => product.imgBack && setShowBack(true)}
              onMouseLeave={() => product.imgBack && setShowBack(false)}
            >
              <img 
                src={showBack && product.imgBack ? product.imgBack : product.img} 
                alt={product.alt} 
                style={{ width: '100%', height: 'auto', transition: 'all 0.3s' }} 
              />
              {product.imgBack && (
                <div style={{ position: 'absolute', bottom: '10px', right: '10px', backgroundColor: 'black', color: 'white', padding: '0.2rem 0.6rem', fontFamily: 'var(--font-body)', fontSize: '0.7rem' }}>
                  {showBack ? 'BACK' : 'FRONT'} (HOVER TO FLIP)
                </div>
              )}
            </div>
            
            {product.imgBack && (
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <img src={product.img} onClick={() => setShowBack(false)} style={{ width: '80px', height: '80px', objectFit: 'cover', border: !showBack ? '3px solid #8b0000' : '2px solid black', cursor: 'pointer', backgroundColor: 'white' }} />
                <img src={product.imgBack} onClick={() => setShowBack(true)} style={{ width: '80px', height: '80px', objectFit: 'cover', border: showBack ? '3px solid #8b0000' : '2px solid black', cursor: 'pointer', backgroundColor: 'white' }} />
              </div>
            )}
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginTop: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <h1 className="headline-huge" style={{ fontSize: 'clamp(3rem, 5vw, 5rem)', lineHeight: 0.9, textShadow: '4px 4px 0 #8b0000' }}>{product.name}</h1>
              </div>
              <p style={{ fontSize: '2rem', fontFamily: 'var(--font-display)', marginTop: '2rem', color: 'var(--white)', borderBottom: '2px solid white', paddingBottom: '1rem', display: 'inline-block' }}>${product.price} USD</p>
            </div>

            <p style={{ fontSize: '1.2rem', fontFamily: 'var(--font-body)', lineHeight: 1.6 }}>
              {product.description}
            </p>

            <div>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', marginBottom: '1rem', letterSpacing: '1px' }}>SELECT SIZE</h3>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                {product.sizes.map(size => (
                  <button 
                    key={size} 
                    onClick={() => setSelectedSize(size)}
                    style={{
                      padding: '1rem 2rem',
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.2rem',
                      backgroundColor: selectedSize === size ? 'var(--white)' : 'var(--black)',
                      color: selectedSize === size ? 'var(--black)' : 'var(--white)',
                      border: '3px solid var(--white)',
                      cursor: 'pointer',
                      transition: 'all 0.2s',
                      boxShadow: selectedSize === size ? '4px 4px 0 #8b0000' : 'none',
                      transform: selectedSize === size ? 'translate(-2px, -2px)' : 'none'
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: '2rem' }}>
              <button 
                disabled={product.stock === 0 || isSecuring || secured}
                onClick={handleSecureItem}
                style={{
                  width: '100%',
                  padding: '1.5rem',
                  fontFamily: 'var(--font-display)',
                  fontSize: '2rem',
                  backgroundColor: (product.stock === 0 || isSecuring || secured) ? '#333' : 'var(--white)',
                  color: (product.stock === 0 || isSecuring || secured) ? '#666' : 'var(--black)',
                  border: (product.stock === 0 || isSecuring || secured) ? '4px solid #444' : '4px solid var(--black)',
                  cursor: (product.stock === 0 || isSecuring || secured) ? 'not-allowed' : 'pointer',
                  boxShadow: (product.stock === 0 || isSecuring || secured) ? 'none' : '8px 8px 0 #8b0000',
                  transition: 'all 0.2s',
                  textTransform: 'uppercase'
                }}
                onMouseOver={(e) => {
                  if (product.stock > 0 && !isSecuring && !secured) {
                    e.currentTarget.style.transform = 'translate(-3px, -3px)';
                    e.currentTarget.style.boxShadow = '11px 11px 0 #8b0000';
                  }
                }}
                onMouseOut={(e) => {
                  if (product.stock > 0 && !isSecuring && !secured) {
                    e.currentTarget.style.transform = 'translate(0, 0)';
                    e.currentTarget.style.boxShadow = '8px 8px 0 #8b0000';
                  }
                }}
              >
                {product.stock === 0 
                  ? 'SOLD OUT' 
                  : isSecuring 
                    ? 'CONNECTING TO SECURE SERVER...' 
                    : secured 
                      ? 'RECEIPT SENT TO MAILBOX' 
                      : 'SECURE ITEM'}
              </button>
              <p style={{ marginTop: '1rem', fontFamily: 'var(--font-body)', fontSize: '0.9rem', color: secured ? '#4CAF50' : (product.stock < 10 && product.stock > 0 ? '#ff4d4d' : 'var(--gray)') }}>
                {product.stock === 0 ? 'RESTOCKING SOON' : secured ? 'PAYMENT VERIFIED. YOUR ASSET IS BEING PREPARED FOR SHIPPING.' : `${product.stock} ITEMS REMAINING IN THE WAREHOUSE`}
              </p>
            </div>
            
            <div style={{ marginTop: '3rem', borderTop: '2px dashed #444', paddingTop: '2rem' }}>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--gray)', lineHeight: 1.8 }}>
                [ SPECIFICATIONS ]<br/>
                • Premium Heavyweight Materials<br/>
                • Shipping worldwide from Jakarta<br/>
                • All sales final on limited drops
              </p>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
