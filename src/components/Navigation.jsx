import React, { useState, useEffect } from 'react';
// Add import for logo image
import logo from '../assets/texttrans.png';


const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav-dropdown')) {
        setActiveDropdown(null);
      }
    };

    window.addEventListener('scroll', handleScroll);
    document.addEventListener('click', handleClickOutside);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const navItems = [
    { name: 'About', href: '/about' },
    { name: 'Features', href: '#features' },
    { name: 'Demo', href: '/how-it-works' },
    { name: 'Contact', href: '#contact' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (index, event) => {
    event.preventDefault();
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <a href="#home" className="logo-link">
            <img src={logo} alt="Brand Logo" className="logo-image" />
            <div className="logo-glow"></div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <ul className="navbar-menu">
          {navItems.map((item, index) => (
            <li key={item.name} className={`nav-item ${item.dropdown ? 'nav-dropdown' : ''}`}>
              <a 
                href={item.href} 
                className="nav-link"
                onClick={item.dropdown ? (e) => toggleDropdown(index, e) : undefined}
              >
                <span className="nav-text">{item.name}</span>
                {item.dropdown && (
                  <svg 
                    className={`dropdown-arrow ${activeDropdown === index ? 'dropdown-arrow-active' : ''}`}
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none"
                  >
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
                <div className="nav-link-glow"></div>
              </a>
              
              {item.dropdown && (
                <ul className={`dropdown-menu ${activeDropdown === index ? 'dropdown-active' : ''}`}>
                  {item.dropdown.map((dropItem, dropIndex) => (
                    <li key={dropIndex} className="dropdown-item">
                      <a href="#" className="dropdown-link">
                        <span>{dropItem}</span>
                        <div className="dropdown-link-glow"></div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <div className="navbar-cta">
          <button className="cta-button">
            <span className="cta-text">Coming Soon</span>
            <div className="cta-glow"></div>
            <div className="cta-ripple"></div>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`mobile-toggle ${isMobileMenuOpen ? 'mobile-toggle-active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
          <span className="hamburger-line"></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`}>
        <div className="mobile-menu-content">
          {navItems.map((item, index) => (
            <div key={item.name} className="mobile-nav-item">
              <a 
                href={item.href} 
                className="mobile-nav-link"
                onClick={item.dropdown ? (e) => toggleDropdown(index, e) : undefined}
              >
                <span>{item.name}</span>
                {item.dropdown && (
                  <svg 
                    className={`mobile-dropdown-arrow ${activeDropdown === index ? 'mobile-dropdown-arrow-active' : ''}`}
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none"
                  >
                    <path d="M3 4.5L6 7.5L9 4.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </a>
              
              {item.dropdown && (
                <div className={`mobile-dropdown ${activeDropdown === index ? 'mobile-dropdown-active' : ''}`}>
                  {item.dropdown.map((dropItem, dropIndex) => (
                    <a key={dropIndex} href="#" className="mobile-dropdown-link">
                      {dropItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="mobile-cta">
            <button className="mobile-cta-button">
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'mobile-overlay-active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      ></div>
    </nav>
  );
};

export default Navigation;