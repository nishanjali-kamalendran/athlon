import React, { useState, useEffect, useCallback, useRef } from 'react';
// Add import for logo image
import logo from '../assets/texttrans.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  
  const navRef = useRef(null);
  const timeoutRef = useRef(null);

  // Enhanced scroll handler with show/hide functionality
  const handleScroll = useCallback(() => {
    const currentScrollY = window.scrollY;
    
    // Determine if navbar should be scrolled state
    setIsScrolled(currentScrollY > 50);
    
    // Hide/show navbar based on scroll direction (optional feature)
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setIsVisible(false);
    } else {
      setIsVisible(true);
    }
    
    setLastScrollY(currentScrollY);
  }, [lastScrollY]);

  // Handle clicks outside dropdown
  const handleClickOutside = useCallback((event) => {
    if (!event.target.closest('.nav-dropdown')) {
      setActiveDropdown(null);
    }
  }, []);

  // Handle escape key
  const handleEscapeKey = useCallback((event) => {
    if (event.key === 'Escape') {
      setActiveDropdown(null);
      setIsMobileMenuOpen(false);
    }
  }, []);

  // Handle resize to close mobile menu on desktop
  const handleResize = useCallback(() => {
    if (window.innerWidth > 768 && isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // Throttled scroll handler
    let ticking = false;
    const throttledScrollHandler = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScrollHandler, { passive: true });
    document.addEventListener('click', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('scroll', throttledScrollHandler);
      document.removeEventListener('click', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
      window.removeEventListener('resize', handleResize);
    };
  }, [handleScroll, handleClickOutside, handleEscapeKey, handleResize]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#howitworks' },
    { name: 'Demo', href: '#demo' },
    { name: 'Contact', href: '#contact' }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null); // Close any open dropdowns
  };

  const toggleDropdown = (index, event) => {
    event.preventDefault();
    event.stopPropagation();
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleNavClick = (href, event) => {
    // Close mobile menu and dropdowns when navigation link is clicked
    setIsMobileMenuOpen(false);
    setActiveDropdown(null);
    
    // Smooth scroll to section
    if (href.startsWith('#')) {
      event.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        const offsetTop = element.offsetTop - 80; // Account for navbar height
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    }
  };

  const handleCTAClick = () => {
    // Add your CTA functionality here
    console.log('Coming Soon button clicked');
    // You can add analytics tracking, modal opening, etc.
  };

  return (
    <nav 
      ref={navRef}
      className={`navbar ${isScrolled ? 'navbar-scrolled' : ''} ${!isVisible ? 'navbar-hidden' : ''}`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="navbar-container">
        {/* Enhanced Logo */}
        <div className="navbar-logo">
          <a 
            href="#home" 
            className="logo-link"
            onClick={(e) => handleNavClick('#home', e)}
            aria-label="Go to homepage"
          >
            <img 
              src={logo} 
              alt="Brand Logo" 
              className="logo-image"
              loading="eager"
            />
            <div className="logo-glow" aria-hidden="true"></div>
          </a>
        </div>

        {/* Desktop Navigation */}
        <ul className="navbar-menu" role="menubar">
          {navItems.map((item, index) => (
            <li 
              key={item.name} 
              className={`nav-item ${item.dropdown ? 'nav-dropdown' : ''}`}
              role="none"
            >
              <a 
                href={item.href} 
                className="nav-link"
                role="menuitem"
                onClick={item.dropdown ? (e) => toggleDropdown(index, e) : (e) => handleNavClick(item.href, e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.dropdown ? toggleDropdown(index, e) : handleNavClick(item.href, e);
                  }
                }}
                aria-expanded={item.dropdown ? activeDropdown === index : undefined}
                aria-haspopup={item.dropdown ? 'true' : undefined}
              >
                <span className="nav-text">{item.name}</span>
                {item.dropdown && (
                  <svg 
                    className={`dropdown-arrow ${activeDropdown === index ? 'dropdown-arrow-active' : ''}`}
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none"
                    aria-hidden="true"
                  >
                    <path 
                      d="M3 4.5L6 7.5L9 4.5" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
                <div className="nav-link-glow" aria-hidden="true"></div>
              </a>
              
              {item.dropdown && (
                <ul 
                  className={`dropdown-menu ${activeDropdown === index ? 'dropdown-active' : ''}`}
                  role="menu"
                  aria-labelledby={`nav-${index}`}
                >
                  {item.dropdown.map((dropItem, dropIndex) => (
                    <li key={dropIndex} className="dropdown-item" role="none">
                      <a 
                        href="#" 
                        className="dropdown-link"
                        role="menuitem"
                        onClick={(e) => handleNavClick('#', e)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleNavClick('#', e);
                          }
                        }}
                      >
                        <span>{dropItem}</span>
                        <div className="dropdown-link-glow" aria-hidden="true"></div>
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>

        {/* Enhanced CTA Button */}
        <div className="navbar-cta">
          <button 
            className="coming-soon-button"
            onClick={handleCTAClick}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleCTAClick();
              }
            }}
            aria-label="Coming Soon - Get notified when we launch"
          >
            <span>Coming Soon</span>
          </button>
        </div>

        {/* Enhanced Mobile Menu Toggle */}
        <button 
          className={`mobile-toggle ${isMobileMenuOpen ? 'mobile-toggle-active' : ''}`}
          onClick={toggleMobileMenu}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              toggleMobileMenu();
            }
          }}
          aria-label={isMobileMenuOpen ? 'Close mobile menu' : 'Open mobile menu'}
          aria-expanded={isMobileMenuOpen}
          aria-controls="mobile-menu"
        >
          <span className="hamburger-line" aria-hidden="true"></span>
          <span className="hamburger-line" aria-hidden="true"></span>
          <span className="hamburger-line" aria-hidden="true"></span>
        </button>
      </div>

      {/* Enhanced Mobile Menu */}
      <div 
        id="mobile-menu"
        className={`mobile-menu ${isMobileMenuOpen ? 'mobile-menu-active' : ''}`}
        role="navigation"
        aria-label="Mobile navigation"
        aria-hidden={!isMobileMenuOpen}
      >
        <div className="mobile-menu-content">
          {navItems.map((item, index) => (
            <div key={item.name} className="mobile-nav-item">
              <a 
                href={item.href} 
                className="mobile-nav-link"
                onClick={item.dropdown ? (e) => toggleDropdown(index, e) : (e) => handleNavClick(item.href, e)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    item.dropdown ? toggleDropdown(index, e) : handleNavClick(item.href, e);
                  }
                }}
                aria-expanded={item.dropdown ? activeDropdown === index : undefined}
                aria-haspopup={item.dropdown ? 'true' : undefined}
              >
                <span>{item.name}</span>
                {item.dropdown && (
                  <svg 
                    className={`mobile-dropdown-arrow ${activeDropdown === index ? 'mobile-dropdown-arrow-active' : ''}`}
                    width="12" 
                    height="12" 
                    viewBox="0 0 12 12" 
                    fill="none"
                    aria-hidden="true"
                  >
                    <path 
                      d="M3 4.5L6 7.5L9 4.5" 
                      stroke="currentColor" 
                      strokeWidth="1.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    />
                  </svg>
                )}
              </a>
              
              {item.dropdown && (
                <div 
                  className={`mobile-dropdown ${activeDropdown === index ? 'mobile-dropdown-active' : ''}`}
                  aria-hidden={activeDropdown !== index}
                >
                  {item.dropdown.map((dropItem, dropIndex) => (
                    <a 
                      key={dropIndex} 
                      href="#" 
                      className="mobile-dropdown-link"
                      onClick={(e) => handleNavClick('#', e)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          handleNavClick('#', e);
                        }
                      }}
                    >
                      {dropItem}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
          
          <div className="mobile-cta">
            <button 
              className="mobile-cta-button"
              onClick={handleCTAClick}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCTAClick();
                }
              }}
              aria-label="Get started with our platform"
            >
              <span>Get Started</span>
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Mobile Menu Overlay */}
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'mobile-overlay-active' : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            setIsMobileMenuOpen(false);
          }
        }}
        role="button"
        tabIndex={isMobileMenuOpen ? 0 : -1}
        aria-label="Close mobile menu"
        aria-hidden={!isMobileMenuOpen}
      ></div>
    </nav>
  );
};

export default Navigation;