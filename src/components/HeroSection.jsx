import React, { useEffect, useRef } from 'react';
import Soccer1SVG from '../components/svgs/Soccer1SVG.jsx';

const HeroSection = () => {
  const containerRef = useRef(null);

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
        duration: 3000, // decreased from 4000
        delay: function(el, i) {
          return i * 100; // decreased from 150
        },
        loop: true,
        direction: 'alternate'
      });

      const bodyLines = anime({
        targets: ".soccer1_line > *",
        strokeDashoffset: [anime.setDashoffset, 0],
        easing: "easeInOutSine",
        duration: 4000, // decreased from 6000
        delay: function(el, i) {
          return i * 75; // decreased from 100
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
          3, // decreased from 4
          { x: -3500, rotation: -1000, transformOrigin: "50% 50%" },
          { x: 0, rotation: 0, ease: Power4.easeOut },
          1.2 // decreased from 1.6
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
          0.9, // decreased from 1.2
          { x: -4500 },
          { x: 0 },
          0.09 // decreased from 0.12
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
      <div className="hero-content">
        <h1 className="hero-title">ATHLON</h1>
        <p className="hero-subtitle">Reserve Your Slot</p>
        <button className="hero-cta">^</button>
      </div>
      
      <div className="animation-container" id="container">
        <Soccer1SVG />
      </div>
      
      <div className="scroll-button">
        <div className="mouse"></div>
      </div>
    </section>
  );
};

export default HeroSection;