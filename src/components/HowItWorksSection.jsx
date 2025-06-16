import React, { useState, useEffect, useRef } from 'react';
import { Search, MapPin, Clock, Star, X, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import useIntersectionObserver from '../hooks/useIntersectionObserver';
import pic1 from '../assets/badminton.jpg';
import pic2 from '../assets/basketball.jpg';
import pic3 from '../assets/football.jpg';


const EnhancedSlideshow = () => {
  const courtImages = [
    {
      url: pic1,
      title: 'Premium Tennis Court',
      description: 'Professional clay court with stadium lighting'
    },
    {
      url: pic2,
      title: 'Basketball Arena',
      description: 'Indoor court with maple flooring'
    },
    {
      url: pic3,
      title: 'Football Court',
      description: 'Air-conditioned multi-court facility'
    },
    {
      url: pic1,
      title: 'Badminton Center',
      description: 'Artificial turf with floodlights'
    },
    {
      url: pic2,
      title: 'Squash Court',
      description: 'Glass-backed court with premium lighting'
    }
  ];

  const slideshowRef = useRef(null);
  const isVisible = useIntersectionObserver(slideshowRef, { threshold: 0.3 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && !isTransitioning && isVisible) {
        setIsTransitioning(true);
        setCurrentIndex(current => 
          current === courtImages.length - 1 ? 0 : current + 1
        );
        setTimeout(() => setIsTransitioning(false), 500);
      }
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [isPlaying, isTransitioning, courtImages.length, isVisible]);

  const goToSlide = (index) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToPrevious = () => {
    if (isTransitioning) return;
    goToSlide(currentIndex === 0 ? courtImages.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    if (isTransitioning) return;
    goToSlide(currentIndex === courtImages.length - 1 ? 0 : currentIndex + 1);
  };

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="enhanced-slideshow" ref={slideshowRef}>
      {/* Header with controls */}
      <div className="slideshow-header">
        <div className="slideshow-title">
          <h3>Our Premium Courts</h3>
          <p>Discover world-class facilities</p>
        </div>
        <button onClick={togglePlayPause} className="play-pause-btn">
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
      </div>

      {/* Main slideshow */}
      <div className="slideshow-wrapper">
        <div className="slides-container">
          {courtImages.map((image, index) => (
            <div 
              key={index} 
              className={`slide ${
                index === currentIndex ? 'active' : 
                index === (currentIndex - 1 + courtImages.length) % courtImages.length ? 'prev' : 
                index === (currentIndex + 1) % courtImages.length ? 'next' : ''
              }`}
            >
              <div className="slide-image-container">
                <img 
                  src={image.url} 
                  alt={image.title} 
                  className="slide-image"
                />
                <div className="slide-overlay">
                  <div className="slide-content">
                    <h4 className="slide-title">{image.title}</h4>
                    <p className="slide-description">{image.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Optional navigation arrows */}
        <button onClick={goToPrevious} className="nav-arrow nav-arrow-left">
          <ChevronLeft size={28} />
        </button>
        
        <button onClick={goToNext} className="nav-arrow nav-arrow-right">
          <ChevronRight size={28} />
        </button>
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  const sectionRef = useRef(null);
  const searchSectionRef = useRef(null); // Add this ref
  const isVisible = useIntersectionObserver(sectionRef, { threshold: 0.3 });
  const isSearchVisible = useIntersectionObserver(searchSectionRef, { threshold: 0.3 }); // Add this observer
  const [hasStartedDemo, setHasStartedDemo] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [filteredCourts, setFilteredCourts] = useState([]);
  const [selectedCourt, setSelectedCourt] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const courts = [
    {
      id: 1,
      name: "Supreme Court Complex",
      distance: "0.8 km",
      rating: 4.8,
      price: "Rs. 800/hour",
      availability: "Available Now",
      type: "Tennis Court",
      location: "Bambalapity"
    },
    {
      id: 2,
      name: "Ocean View Tennis Club",
      distance: "1.2 km",
      rating: 4.6,
      price: "Rs. 850/hour",
      availability: "Next slot: 6:00 PM",
      type: "Tennis Court",
      location: "Kollupity"
    },
    {
      id: 3,
      name: "Lumbini Basketball Court",
      distance: "1.5 km",
      rating: 4.7,
      price: "Rs. 700/hour",
      availability: "Available Now",
      type: "Basketball Court",
      location: "Bambalapity"
    },
    {
      id: 4,
      name: "City Badminton Center",
      distance: "0.9 km",
      rating: 4.5,
      price: "Rs. 800/hour",
      availability: "Available Now",
      type: "Badminton Court",
      location: "Bambalapity"
    }
  ];

  const simulateSearch = async (query) => {
    setIsSearching(true);
    setShowResults(false);

    await new Promise(resolve => setTimeout(resolve, 1500));

    const results = courts.filter(court => 
      court.location.toLowerCase().includes(query.toLowerCase()) ||
      court.type.toLowerCase().includes(query.toLowerCase()) ||
      court.name.toLowerCase().includes(query.toLowerCase())
    );

    setFilteredCourts(results);
    setShowResults(true);
    setCurrentStep(1);
    setIsSearching(false);
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    if (value.length >= 3) {
      simulateSearch(value);
    } else {
      setShowResults(false);
      setFilteredCourts([]);
    }
  };

  useEffect(() => {
    if (isSearchVisible && !hasStartedDemo) {
      setHasStartedDemo(true);
      const text = "Bambalapity";
      let index = 0;

      const typeInterval = setInterval(() => {
        if (index <= text.length) {
          setSearchTerm(text.slice(0, index));
          index++;
          
          // When typing is complete, trigger the search
          if (index > text.length) {
            clearInterval(typeInterval);
            simulateSearch(text);
          }
        }
      }, 100);

      return () => clearInterval(typeInterval);
    }
  }, [isSearchVisible]); // Change dependency from isVisible to isSearchVisible

  const handleCourtClick = (court) => {
    setSelectedCourt(court);
    setShowModal(true);
  };

  const CourtModal = ({ court, onClose }) => (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <X size={24} />
        </button>
        <div className="modal-grid">
          <div className="modal-image">
            <img 
              src={court.type.includes('Tennis') ? pic1 : 
                  court.type.includes('Basketball') ? pic2 : pic3}
              alt={court.name}
              className="court-preview"
            />
          </div>
          <div className="modal-details">
            <h3 className="modal-title">{court.name}</h3>
            <div className="modal-rating">
              <Star className="star-icon" />
              <span>{court.rating}</span>
            </div>
            <p className="modal-type">{court.type}</p>
            <p className="modal-price">{court.price}</p>
            <div className="modal-info">
              <div className="info-item">
                <MapPin className="info-icon" />
                <span>{court.distance}</span>
              </div>
              <div className="info-item">
                <Clock className="info-icon" />
                <span>{court.availability}</span>
              </div>
            </div>
            <button className="modal-book-button">
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) {
        const rightSection = document.querySelector('.right-section');
        if (rightSection) {
          const rect = rightSection.getBoundingClientRect();
          const triggerPoint = window.innerHeight * 0.8; // Increased to 80% of viewport height
          
          if (rect.top <= triggerPoint) {
            rightSection.classList.add('visible');
          } else {
            rightSection.classList.remove('visible');
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="main-container" ref={sectionRef}>
      <div className="main-header">
        <h2 className="main-title">How It Works</h2>
      </div>

      <div className="content-wrapper">
        {/* Left Section - Search Tool */}
        <div className="left-section" ref={searchSectionRef}> {/* Add ref here */}
          <div className="search-results-wrapper">
            <div className="search-section">
              <div className="demo-section">
                <div className="demo-grid">
                  <div className="search-panel">
                    <div className="search-card">
                      <div className="search-input-wrapper">
                        <Search className="search-icon" />
                        <input
                          type="text"
                          placeholder="Enter location (e.g., Bambalapitiya)"
                          className="search-input"
                          value={searchTerm}
                          onChange={(e) => handleSearch(e.target.value)}
                        />
                      </div>
                      
                      <button
                        onClick={() => handleSearch("Bambalapitiya")}
                        className="demo-button"
                      >
                        Find Court
                      </button>
                    </div>
                  </div>

                  {isSearching && (
                    <div className="loading-section">
                      <div className="loading-content">
                        <div className="spinner"></div>
                        <span>Searching for courts...</span>
                      </div>
                    </div>
                  )}

                  {showResults && (
                    <div className="results-panel animate-fade-in">
                      <div className="results-card">
                        <div className="results-header">
                          <h3 className="card-title">Available Courts</h3>
                          <span className="results-count">{filteredCourts.length} found</span>
                        </div>

                        <div className="courts-list">
                          {filteredCourts.map((court) => (
                            <div key={court.id} 
                                 className="court-item" 
                                 onClick={() => handleCourtClick(court)}>
                              <div className="court-header">
                                <div className="court-info">
                                  <h4 className="court-name">{court.name}</h4>
                                  <p className="court-type">{court.type}</p>
                                </div>
                                <div className="court-price-rating">
                                  <p className="court-price">{court.price}</p>
                                  <div className="rating">
                                    <Star className="star-icon" />
                                    <span className="rating-value">{court.rating}</span>
                                  </div>
                                </div>
                              </div>

                              <div className="court-footer">
                                <div className="court-details">
                                  <div className="detail-item">
                                    <MapPin className="detail-icon" />
                                    <span>{court.distance}</span>
                                  </div>
                                  <div className="detail-item available">
                                    <Clock className="detail-icon" />
                                    <span>{court.availability}</span>
                                  </div>
                                </div>
                                <button className="book-button">Book Now</button>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>  
          </div>
        </div>

        {/* Right Section - Slideshow */}
        <div className="right-section">
          <EnhancedSlideshow />
        </div>
      </div>

      {showModal && selectedCourt && (
        <CourtModal 
          court={selectedCourt} 
          onClose={() => setShowModal(false)} 
        />
      )}

      
    </div>
  );
};

export default HowItWorksSection;