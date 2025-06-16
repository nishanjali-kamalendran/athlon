import React, { useEffect, useRef, useState } from 'react';
import Soccer1SVG from '../components/svgs/Soccer1SVG.jsx';

const HeroSection = () => {
  const containerRef = useRef(null);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 768);

  // Update launch date to match Navigation
  const launchDate = new Date('2025-08-01').getTime();

  // Add resize listener
  useEffect(() => {
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const difference = launchDate - now;

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ days, hours, minutes, seconds });

      if (difference < 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [launchDate]);

  useEffect(() => {
    // Load GSAP and Anime.js dynamically
    const loadScripts = async () => {
      // Load GSAP
      if (!window.TweenMax) {
        const gsapScript = document.createElement('script');
        gsapScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/2.0.2/TweenMax.min.js';
        document.head.appendChild(gsapScript);
        await new Promise(resolve => gsapScript.onload = resolve);
      }
      
      // Load Anime.js
      if (!window.anime) {
        const animeScript = document.createElement('script');
        animeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/animejs/2.2.0/anime.min.js';
        document.head.appendChild(animeScript);
        await new Promise(resolve => animeScript.onload = resolve);
      }
      
      // Initialize animations after scripts are loaded
      initializeAnimations();
    };

    const initializeAnimations = () => {
      const { TweenMax, TimelineMax, Power4 } = window;
      const { anime } = window;

      // Mark as loaded to hide loading spinner
      if (containerRef.current) {
        containerRef.current.classList.add('loaded');
      }

      // Initial setup
      TweenMax.set("#soccer1", { opacity: 1 });

      // Soccer 1 animations
      const backLines = anime({
        targets: ".soccer1_extra-line > *",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 3000,
        delay: function(el, i) {
          return i * 100;
        },
        loop: true,
        direction: 'alternate'
      });

      const bodyLines = anime({
        targets: ".soccer1_line > *",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 4000,
        delay: function(el, i) {
          return i * 75;
        },
        loop: true,
        direction: 'alternate'
      });

      function step1_backTL() {
        const back = new TimelineMax({
          repeat: -1,
          onStart: function() {
            backLines.play();
          }
        });

        back.staggerFromTo(
          ".soccer1_extra-line > g",
          3,
          { x: -3500, rotation: -1000, transformOrigin: "50% 50%" },
          { x: 0, rotation: 0, ease: Power4.easeOut },
          1.2
        );

        return back;
      }

      function step1_bodyTL() {
        const timeline = new TimelineMax({
          repeat: -1,
          ease: Power4.easeOut,
          onStart: bodyLines.play()
        });

        timeline.staggerFromTo(
          ".soccer1_fill > *",
          0.9,
          { x: -4500 },
          { x: 0 },
          0.09
        );

        return timeline;
      }

      // Main timeline
      function init() {
        const mainTL = new TimelineMax({});
        mainTL
          .add(step1_bodyTL(), "step1")
          .add(step1_backTL(), "step1");
      }

      init();
    };

    loadScripts();

    // Cleanup function
    return () => {
      // Clean up GSAP timelines if they exist
      if (window.TweenMax) {
        window.TweenMax.killAll();
      }
    };
  }, []);

  const formatTime = (time) => {
    return time.toString().padStart(2, '0');
  };

  const handleCTAClick = () => {
    // Add your CTA functionality here
    console.log('CTA clicked - Reserve slot functionality');
    // Example: scroll to next section, open modal, navigate to form, etc.
  };

  return (
    <section className="hero-section" ref={containerRef}>
      <div className="hero-container">
        {/* Only render animation if screen is large enough */}
        {isLargeScreen && (
          <div className="hero-left">
            <div className="animation-container" id="container">
              <Soccer1SVG />
            </div>
          </div>
        )}

        {/* Right side - Simplified Content */}
        <div className="hero-right">
          <div className="hero-content">
            
            <p className="hero-subtitle">Reserve Your Elite Slot</p>
            
            <div className="sports-platform-text">
              <h2 className="platform-title">Sports Booking Platform</h2>
              <p className="platform-description">Book sports facilities instantly in Sri Lanka.</p>
            </div>
            
            <div className="countdown-container white-countdown">
              <div className="countdown-title">Launching In</div>
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

            <button className="hero-cta" onClick={handleCTAClick}>
              Explore for more
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;