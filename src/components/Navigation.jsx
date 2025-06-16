import React, { useState, useEffect } from 'react';
// Add import for logo image
import logo from '../assets/texttrans.png';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

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

  useEffect(() => {
    // Updated to a future date - you can change this to your actual launch date
    const launchDate = new Date('2025-08-01').getTime();

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'How It Works', href: '#howitworks' },
    { name: 'Contact', href: '#contact' },
    { 
      name: 'Demo', 
      href: '#suggestions', 
      
    }
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = (index, event) => {
    event.preventDefault();
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  // Add formatTime helper
  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
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

        {/* Fixed countdown with dark navy blue numbers */}
        <div className="navbar-cta">
          <div className="countdown-container nav-countdown">
            <div className="countdown-timer">
              <div className="time-unit">
                <span className="time-number">{formatTime(timeLeft.days)}</span>
                <span className="time-label">Days</span>
              </div>
              <div className="time-separator">:</div>
              <div className="time-unit">
                <span className="time-number">{formatTime(timeLeft.hours)}</span>
                <span className="time-label">Hours</span>
              </div>
              <div className="time-separator">:</div>
              <div className="time-unit">
                <span className="time-number">{formatTime(timeLeft.minutes)}</span>
                <span className="time-label">Minutes</span>
              </div>
              <div className="time-separator">:</div>
              <div className="time-unit">
                <span className="time-number">{formatTime(timeLeft.seconds)}</span>
                <span className="time-label">Seconds</span>
              </div>
            </div>
          </div>
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