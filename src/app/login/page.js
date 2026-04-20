"use client";

import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/';

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = login(email, password);
    if (user.role === 'admin') {
      router.push('/admin');
    } else {
      router.push(redirect);
    }
  };

  return (
    <div style={{ backgroundColor: 'var(--black)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="noise-overlay"></div>
      
      <div style={{ 
        backgroundColor: 'var(--white)', 
        padding: '3rem', 
        width: '90%', 
        maxWidth: '450px', 
        boxShadow: '15px 15px 0 #8b0000', 
        border: '4px solid black',
        transform: 'rotate(-1deg)',
        zIndex: 10
      }}>
        <h1 className="headline-huge" style={{ fontSize: '3rem', color: 'black', marginBottom: '2rem', textAlign: 'center' }}>ACCESS GATE</h1>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>E-MAIL ADDRESS</label>
            <input 
              type="email" 
              required 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ padding: '1rem', border: '3px solid black', width: '100%', fontFamily: 'var(--font-body)' }}
              placeholder="YOUR@IDENTITY.COM"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-display)', marginBottom: '0.5rem' }}>PASSPHRASE</label>
            <input 
              type="password" 
              required 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ padding: '1rem', border: '3px solid black', width: '100%', fontFamily: 'var(--font-body)' }}
              placeholder="••••••••"
            />
          </div>
          
          <button 
            type="submit"
            style={{ 
              backgroundColor: 'black', 
              color: 'white', 
              padding: '1.2rem', 
              fontFamily: 'var(--font-display)', 
              fontSize: '1.5rem', 
              border: 'none', 
              cursor: 'pointer',
              marginTop: '1rem' 
            }}
          >
            ENTER THE SYSTEM
          </button>
        </form>
        
        <div style={{ marginTop: '2rem', textAlign: 'center', fontFamily: 'var(--font-body)', fontSize: '0.8rem', opacity: 0.7 }}>
          <p>FOR ADMIN ACCESS: admin@antimaksiat.co / admin69</p>
          <Link href="/" style={{ color: 'black', display: 'inline-block', marginTop: '1rem' }}>RETURN TO MAIN SITE</Link>
        </div>
      </div>
    </div>
  );
}
