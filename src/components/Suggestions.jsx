import React, { useState, useRef, useEffect } from 'react';
import { Clock, MapPin, Star, Users, Zap, Trophy, Calendar, ArrowRight } from 'lucide-react';


// Import your images here - adjust paths as needed
import tennisImage from '../assets/tennis-court.jpg';
import basketballImage from '../assets/basketball.jpg';
import badmintonImage from '../assets/badminton.jpg';
import footballImage from '../assets/football.jpg';
import squashImage from '../assets/squash-court.jpg';
import volleyballImage from '../assets/volleyball-court.jpg';

const Suggestions = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [visibleCards, setVisibleCards] = useState([]);
  const sectionRef = useRef(null);

  const courtTypes = [
    {
      id: 1,
      name: 'Tennis Courts',
      image: tennisImage,
      description: 'Professional clay and hard courts with stadium lighting',
      priceRange: 'Rs. 800 - 1,200/hour',
      popularity: 95,
      availableSlots: 12,
      features: ['Professional Surface', 'Stadium Lighting', 'Equipment Rental'],
      rating: 4.8,
      bookingsToday: 24,
      peakHours: '6:00 AM - 10:00 AM, 5:00 PM - 9:00 PM',
      icon: <Trophy className="court-icon" />,
      gradient: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    },
    {
      id: 2,
      name: 'Basketball Courts',
      image: basketballImage,
      description: 'Indoor and outdoor courts with maple flooring',
      priceRange: 'Rs. 600 - 900/hour',
      popularity: 88,
      availableSlots: 8,
      features: ['Maple Flooring', 'Professional Hoops', 'Air Conditioning'],
      rating: 4.7,
      bookingsToday: 19,
      peakHours: '7:00 AM - 11:00 AM, 6:00 PM - 10:00 PM',
      icon: <Users className="court-icon" />,
      gradient: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)'
    },
    {
      id: 3,
      name: 'Badminton Courts',
      image: badmintonImage,
      description: 'Air-conditioned courts with premium synthetic flooring',
      priceRange: 'Rs. 500 - 800/hour',
      popularity: 92,
      availableSlots: 15,
      features: ['Synthetic Flooring', 'Climate Control', 'Equipment Available'],
      rating: 4.6,
      bookingsToday: 31,
      peakHours: '6:00 AM - 9:00 AM, 4:00 PM - 8:00 PM',
      icon: <Zap className="court-icon" />,
      gradient: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)'
    },
    {
      id: 4,
      name: 'Football Fields',
      image: footballImage,
      description: 'Artificial turf fields with floodlight systems',
      priceRange: 'Rs. 1,000 - 1,500/hour',
      popularity: 90,
      availableSlots: 6,
      features: ['Artificial Turf', 'Floodlights', 'Changing Rooms'],
      rating: 4.9,
      bookingsToday: 16,
      peakHours: '5:00 AM - 8:00 AM, 5:00 PM - 10:00 PM',
      icon: <Trophy className="court-icon" />,
      gradient: 'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)'
    },
    {
      id: 5,
      name: 'Squash Courts',
      image: squashImage,
      description: 'Glass-backed courts with professional lighting',
      priceRange: 'Rs. 700 - 1,000/hour',
      popularity: 78,
      availableSlots: 4,
      features: ['Glass Back Wall', 'Pro Lighting', 'Air Conditioning'],
      rating: 4.5,
      bookingsToday: 12,
      peakHours: '7:00 AM - 10:00 AM, 6:00 PM - 9:00 PM',
      icon: <Zap className="court-icon" />,
      gradient: 'linear-gradient(135deg, #fa709a 0%, #fee140 100%)'
    },
    {
      id: 6,
      name: 'Volleyball Courts',
      image: volleyballImage,
      description: 'Beach and indoor volleyball courts available',
      priceRange: 'Rs. 600 - 900/hour',
      popularity: 82,
      availableSlots: 7,
      features: ['Beach & Indoor', 'Net Included', 'Sand Courts'],
      rating: 4.4,
      bookingsToday: 14,
      peakHours: '6:00 AM - 9:00 AM, 5:00 PM - 8:00 PM',
      icon: <Users className="court-icon" />,
      gradient: 'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)'
    }
  ];

  // Intersection Observer for scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cardIndex = parseInt(entry.target.dataset.index);
            setVisibleCards(prev => [...new Set([...prev, cardIndex])]);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = document.querySelectorAll('.court-card');
    cards.forEach(card => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  const handleCardHover = (cardId) => {
    setHoveredCard(cardId);
  };

  const handleBookNow = (courtType) => {
    console.log(`Booking ${courtType.name}`);
    // Add booking logic here
  };

  return (
    <section className="suggestions-section" ref={sectionRef}>
      <div className="suggestions-container">
        {/* Header */}
        

        {/* Courts Grid */}
        <div className="courts-grid">
          {courtTypes.map((court, index) => (
            <div
              key={court.id}
              className={`court-card ${visibleCards.includes(index) ? 'visible' : ''} ${hoveredCard === court.id ? 'hovered' : ''}`}
              data-index={index}
              onMouseEnter={() => handleCardHover(court.id)}
              onMouseLeave={() => handleCardHover(null)}
              style={{ '--card-gradient': court.gradient }}
            >
              {/* Card Background */}
              <div className="card-background">
                <img src={court.image} alt={court.name} className="court-image" />
                <div className="card-overlay"></div>
              </div>

              {/* Card Content */}
              <div className="card-content">
                {/* Header */}
                <div className="card-header">
                  <div className="court-icon-wrapper">
                    {court.icon}
                  </div>
                  <div className="popularity-badge">
                    <span className="popularity-text">{court.popularity}% Popular</span>
                    <div className="popularity-bar">
                      <div 
                        className="popularity-fill" 
                        style={{ width: `${court.popularity}%` }}
                      ></div>
                    </div>
                  </div>
                </div>

                {/* Main Info */}
                <div className="card-main">
                  <h3 className="court-name">{court.name}</h3>
                  <p className="court-description">{court.description}</p>
                  
                  <div className="court-stats">
                    <div className="stat">
                      <Star className="stat-icon" />
                      <span>{court.rating}</span>
                    </div>
                    <div className="stat">
                      <Calendar className="stat-icon" />
                      <span>{court.bookingsToday} today</span>
                    </div>
                    <div className="stat available">
                      <Clock className="stat-icon" />
                      <span>{court.availableSlots} slots</span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="court-features">
                  {court.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="card-footer">
                  <div className="price-info">
                    <span className="price-label">Starting from</span>
                    <span className="price-range">{court.priceRange}</span>
                  </div>
                  <button 
                    className="book-button"
                    onClick={() => handleBookNow(court)}
                  >
                    <span>Book Now</span>
                    <ArrowRight className="button-icon" />
                  </button>
                </div>
              </div>

              {/* Hover Details */}
              <div className="hover-details">
                <div className="peak-hours">
                  <h4>Peak Hours</h4>
                  <p>{court.peakHours}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        
      </div>
    </section>
  );
};

export default Suggestions;