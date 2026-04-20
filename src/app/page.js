"use client";

import { useEffect, useState, useRef } from 'react';
import { useProducts } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import Link from 'next/link';

export default function Home() {
  const [activeSection, setActiveSection] = useState('home');
  const [manifestoIndex, setManifestoIndex] = useState(0);
  const [isManifestoHovered, setIsManifestoHovered] = useState(false);
  const [isVideoPaused, setIsVideoPaused] = useState(false);
  const [flash, setFlash] = useState(false);
  const [isLocked, setIsLocked] = useState(true);
  const [showExplore, setShowExplore] = useState(false);
  const sliderRef = useRef(null);
  const videoRef = useRef(null);

  // Forced focus on hero video by locking body scroll
  useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      document.documentElement.style.overflow = 'auto';
    }
  }, [isLocked]);

  useEffect(() => {
    setFlash(true);
    const timer = setTimeout(() => setFlash(false), 150);
    return () => clearTimeout(timer);
  }, [manifestoIndex]);

  useEffect(() => {
    // Automatically unlock scroll after 5 seconds
    const unlockTimer = setTimeout(() => {
      setIsLocked(false);
    }, 5000);

    // Start showing the explore button at 4 seconds
    const exploreTimer = setTimeout(() => {
      setShowExplore(true);
    }, 4000);

    const videoTimer = setTimeout(() => {
      setIsVideoPaused(true);
      if (videoRef.current) {
        videoRef.current.pause();
      }
    }, 8000); // Paused at exactly 8 seconds

    return () => {
      clearTimeout(unlockTimer);
      clearTimeout(exploreTimer);
      clearTimeout(videoTimer);
    };
  }, []);

  const handleExploreUs = () => {
    setIsLocked(false);
    setTimeout(() => {
      const collection = document.getElementById('collection');
      if (collection) {
        collection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const manifestoImages = [
    '/images/manifesto_3_1775655403934.png',
    '/images/baggy_silhouette_lookbook_1775802562337.png',
    '/images/blokecore_street_crossroad_1775803089630.png',
    '/images/gallery_chain_neon_1775798641607.png',
    '/images/baggy_culture_hangout_1775803104700.png',
    '/images/zipup_oversized_studio_1775802530734.png',
    '/images/oversized_hoodie_baggy_pants_1775802496499.png'
  ];

  const { user, logout } = useAuth();
  const { products: collectionData } = useProducts();

  useEffect(() => {
    if (isManifestoHovered) return;
    const slideInterval = setInterval(() => {
      setManifestoIndex((prev) => (prev + 1) % manifestoImages.length);
    }, 5000);
    return () => clearInterval(slideInterval);
  }, [isManifestoHovered, manifestoImages.length]);

  const handlePrevManifesto = () => {
    setManifestoIndex((prev) => (prev - 1 + manifestoImages.length) % manifestoImages.length);
  };

  const handleNextManifesto = () => {
    setManifestoIndex((prev) => (prev + 1) % manifestoImages.length);
  };

  // Collection auto-scrolling
  useEffect(() => {
    const collectionInterval = setInterval(() => {
      const slider = sliderRef.current;
      if (slider) {
        if (slider.scrollLeft >= slider.scrollWidth - slider.clientWidth - 10) {
          slider.scrollTo({ left: 0, behavior: 'smooth' }); // Rewind
        } else {
          slider.scrollBy({ left: 398, behavior: 'smooth' }); // One card wide (including gap)
        }
      }
    }, 3500);
    return () => clearInterval(collectionInterval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    const sections = document.querySelectorAll('section');
    sections.forEach((section) => observer.observe(section));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal-up, .reveal-scale, .reveal-left, .reveal-right');
    revealElements.forEach((el) => revealObserver.observe(el));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
      revealElements.forEach((el) => revealObserver.unobserve(el));
    };
  }, [collectionData]);

  const isLightSection = activeSection === 'about';
  const navTextColor = isLightSection ? 'var(--black)' : 'var(--white)';

  return (
    <>
      <div className="noise-overlay"></div>

      <nav className="navbar" style={{ pointerEvents: isLocked ? 'none' : 'auto', opacity: isLocked ? 0.7 : 1, transition: 'opacity 1s' }}>
        <div className="nav-logo">
          <a href="#home" style={{ display: 'flex', alignItems: 'center', fontFamily: 'var(--font-display)', fontSize: '2rem', textDecoration: 'none' }}>
            <span style={{ position: 'relative', display: 'inline-block' }}>
              <span style={{ color: navTextColor, transition: 'color 0.3s' }}>ANTI</span>
              <span style={{ position: 'absolute', top: '50%', left: '-5%', right: '-5%', height: '3px', backgroundColor: '#8b0000', transform: 'translateY(-50%)', zIndex: 2 }}></span>
            </span>
            <span style={{ color: navTextColor, transition: 'color 0.3s' }}>MAKSIAT<sup style={{ fontSize: '0.5em', marginLeft: '2px' }}>®</sup></span>
          </a>
        </div>
        <div className="nav-links">
          <a href="#home" style={{ color: navTextColor, transition: 'color 0.3s' }} className={activeSection === 'home' ? 'active' : ''}>Home</a>
          <a href="#about" style={{ color: navTextColor, transition: 'color 0.3s' }} className={activeSection === 'about' ? 'active' : ''}>Manifesto</a>
          <a href="#collection" style={{ color: navTextColor, transition: 'color 0.3s' }} className={activeSection === 'collection' ? 'active' : ''}>Collection</a>
          <a href="#gallery" style={{ color: navTextColor, transition: 'color 0.3s' }} className={activeSection === 'gallery' ? 'active' : ''}>Gallery</a>
          <a href="#contact" style={{ color: navTextColor, transition: 'color 0.3s' }} className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
          {user ? (
            <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
              {user.role === 'admin' && <Link href="/admin" style={{ color: '#8b0000', fontFamily: 'var(--font-display)', fontSize: '1.2rem', textDecoration: 'none' }}>ADMIN</Link>}
              <button onClick={logout} style={{ background: 'transparent', border: 'none', color: navTextColor, fontFamily: 'var(--font-display)', fontSize: '1.2rem', cursor: 'pointer', textDecoration: 'underline' }}>LOGOUT</button>
            </div>
          ) : (
            <Link href="/login" style={{ color: navTextColor, transition: 'color 0.3s', display: 'flex', alignItems: 'center' }} aria-label="Login">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </Link>
          )}
        </div>
      </nav>

      <main>
        {/* HERO SECTION */}
        <section id="home">
          <div className="ticker-wrap">
            <div className="ticker-content">
              <span>WEAR AM . BE I AM</span>
              <span>ANTIMAKSIAT.CO</span>
              <span>WEAR AM . BE I AM</span>
              <span>ANTIMAKSIAT.CO</span>
              <span>WEAR AM . BE I AM</span>
              <span>ANTIMAKSIAT.CO</span>
              <span>WEAR AM . BE I AM</span>
              <span>ANTIMAKSIAT.CO</span>
            </div>
            {/* Duplicate for seamless infinite loop */}
            <div className="ticker-content">
              <span>WEAR AM . BE I AM</span>
              <span>ANTIMAKSIAT.CO</span>
              <span>WEAR AM . BE I AM</span>
              <span>ANTIMAKSIAT.CO</span>
              <span>WEAR AM . BE I AM</span>
              <span>ANTIMAKSIAT.CO</span>
              <span>WEAR AM . BE I AM</span>
              <span>ANTIMAKSIAT.CO</span>
            </div>
          </div>

          <div className={`home-bg-video-wrapper ${isVideoPaused ? 'faded' : ''}`}>
            <video
              ref={videoRef}
              src="/videos/hero_club_video.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="home-bg-video"
            ></video>
          </div>
          <div className="home-content reveal-up">
            <h1 className="headline-huge">69 A.M Society</h1>
            <div className="home-subtitle delay-100">LATE NIGHT CULTURE. BE AESTHETICS!.</div>
            <p className="home-description delay-200">
              Antimaksiat is an ironic take on modern nightlife. We bridge the gap between floor-culture and underground streetwear for the kids who own the night.
            </p>
          </div>

          {showExplore && (
            <div className="explore-overlay-container">
              <button onClick={handleExploreUs} className="explore-btn-capsule" aria-label="Explore Us">
                <span>SCROLL TO EXPLORE</span>
                <span className="arrow-down">↓</span>
              </button>
            </div>
          )}
        </section>

        {/* ABOUT SECTION */}
        <section id="about">
          <div className="torn-top"></div>
          <div className="about-container">
            <div className="reveal-left">
              <h2 className="about-title">MANIFESTO</h2>
              <div className="about-text">
                <p><strong>THE NIGHT BELONGS TO US.</strong> Antimaksiat is born in the strobe lights and basslines of the underground clubbing scene. We embrace the irony of our name while celebrating the raw, unfiltered culture of the youth. From late-night afterparties to the streets of the neon district, our streetwear is the uniform of the new Y2K generation.</p>
                <br />
                <p>We are the architects of the dancefloor. Our vision is simple: <strong>Identity, Culture, Community.</strong> Wear it loud, move fast, and leave a trail of motion blur.</p>
              </div>
            </div>
            <div className="reveal-right">
              <div
                className="manifesto-slider-container"
                onMouseEnter={() => setIsManifestoHovered(true)}
                onMouseLeave={() => setIsManifestoHovered(false)}
              >
                <div
                  className="about-image-wrapper cursor-pointer"
                  onClick={handleNextManifesto}
                  title="Next image"
                >
                  {manifestoImages.map((src, index) => (
                    <img
                      key={src}
                      src={src}
                      alt={`Rave youth ${index + 1}`}
                      className={index === manifestoIndex ? 'manifesto-img-active' : 'manifesto-img-hidden'}
                    />
                  ))}
                  <div className={`manifesto-flash ${flash ? 'active' : ''}`}></div>
                </div>
              </div>
            </div>
          </div>
          <div className="torn-bottom"></div>
        </section>

        {/* COLLECTION SECTION */}
        <section id="collection">
          <h2 className="collection-title reveal-up">COLLECTION</h2>

          <div
            className="product-slider"
            ref={sliderRef}
          >
            {collectionData.map((item, index) => {
              const delayClass = ['', 'delay-100', 'delay-200', 'delay-300'][index % 4];
              return (
                <div key={item.id} className={`reveal-up ${delayClass}`.trim()}>
                  <div className="product-card">
                    {item.isNew && <div className="badge-new">NEW CATALOGUE</div>}
                    <img src={item.img} alt={item.alt} />
                    <div className="product-info">
                      <span>{item.name}</span>
                      <span>${item.price}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="browse-container reveal-up delay-300">
            <Link href="/archive" className="browse-btn">BROWSE MORE</Link>
          </div>
        </section>

        {/* GALLERY SECTION */}
        <section id="gallery" className="gallery-section">
          <div className="section-header reveal-up">
            <h2 className="gallery-title">THE ARCHIVES</h2>
            <p className="gallery-subtitle delay-100">Candid fragments of the underground. Captured moments from the 69 A.M Society.</p>
          </div>
          <div className="gallery-grid">
            <div className="gallery-item reveal-scale"><img src="/images/blokecore_street_crossroad_1775803089630.png" alt="Shibuya Crossroad Squad" /></div>
            <div className="gallery-item reveal-scale delay-100"><img src="/images/y2k_club_squad_baggy_1775803071531.png" alt="Cyberia Club Mob" /></div>
            <div className="gallery-item reveal-scale delay-200"><img src="/images/gallery_streetwear_flash_1775798622177.png" alt="Late Night Bloke Core" /></div>
            <div className="gallery-item reveal-scale delay-100"><img src="/images/baggy_culture_hangout_1775803104700.png" alt="Urban Concrete Hangout" /></div>
            <div className="gallery-item reveal-scale delay-200"><img src="/images/blokecore_baggy_football_1775802731932.png" alt="Football Heritage Archive" /></div>
            <div className="gallery-item reveal-scale delay-300"><img src="/images/blokecore_racing_baggy_1775802748216.png" alt="Racing Culture Moto" /></div>
          </div>
        </section>

        {/* CONTACT / FOOTER SECTION */}
        <footer id="contact" className="footer-section">
          <div className="footer-top reveal-up">
            <div className="footer-brand">
              <h2>ANTIMAKSIAT®</h2>
              <p>Wear the message, break the norm. Late night culture since MMXXV.</p>
            </div>
            <div className="footer-comms">
              <h3>TRANSMISSION</h3>
              <form onSubmit={(e) => e.preventDefault()} className="footer-form">
                <input type="email" placeholder="CONNECT EMAIL" required />
                <button type="submit"> SEND </button>
              </form>
            </div>
            <div className="footer-links">
              <h3>SOCIALS</h3>
              <ul>
                <li><a href="#">INSTAGRAM</a></li>
                <li><a href="#">TIKTOK</a></li>
                <li><a href="#">EMAIL</a></li>
              </ul>
            </div>
          </div>
          <div className="footer-bottom">
            <div className="footer-hq">
            </div>
            <div className="footer-credits">
              <p>&copy;{new Date().getFullYear()} ANTIMAKSIAT.CO. ALL RIGHTS RESERVED.</p>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
