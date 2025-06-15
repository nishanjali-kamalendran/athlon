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

  // Set your launch date here (example: 3 months from now)
  const launchDate = new Date();
  launchDate.setMonth(launchDate.getMonth() + 3);
  launchDate.setDate(15); // 15th of the month
  launchDate.setHours(12, 0, 0, 0); // 12:00 PM

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

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

  return (
    <section className="hero-section" ref={containerRef}>
      <div className="hero-container">
        {/* Left side - SVG Animation */}
        <div className="hero-left">
          <div className="animation-container" id="container">
            <Soccer1SVG />
          </div>
        </div>

        {/* Right side - Content */}
        <div className="hero-right">
          <div className="hero-content">
            <h1 className="hero-title">ATHLON</h1>
            <p className="hero-subtitle">Reserve Your Slot</p>
            
            {/* Countdown Timer */}
            <div className="countdown-container">
              <div className="countdown-title">Launching In</div>
              <div className="countdown-timer">
                <div className="time-unit">
                  <span className="time-number">{timeLeft.days.toString().padStart(2, '0')}</span>
                  <span className="time-label">Days</span>
                </div>
                <div className="time-separator">:</div>
                <div className="time-unit">
                  <span className="time-number">{timeLeft.hours.toString().padStart(2, '0')}</span>
                  <span className="time-label">Hours</span>
                </div>
                <div className="time-separator">:</div>
                <div className="time-unit">
                  <span className="time-number">{timeLeft.minutes.toString().padStart(2, '0')}</span>
                  <span className="time-label">Minutes</span>
                </div>
                <div className="time-separator">:</div>
                <div className="time-unit">
                  <span className="time-number">{timeLeft.seconds.toString().padStart(2, '0')}</span>
                  <span className="time-label">Seconds</span>
                </div>
              </div>
            </div>

            <button className="hero-cta">^</button>
          </div>
        </div>
      </div>

      <div className="scroll-button">
        <div className="mouse"></div>
      </div>
    </section>
  );
};

export default HeroSection;
