import React, { useState, useEffect } from 'react';


const About = () => {
  // State for animated typing effect
  const [text, setText] = useState('');
  const fullText = 'What is ATHLON?';

  useEffect(() => {
    // Typing animation logic
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        // After typing, reset after a delay
        setTimeout(() => {
          currentIndex = 0;
          setText('');
        }, 2000);
      }
    }, 100);

    // Cleanup interval on unmount
    return () => clearInterval(typingInterval);
  }, []);

  // About section content (not rendered in this snippet, but can be used for expansion)
  const sections = [
    {
      id: 'vision',
      title: 'Our Vision',
      content: 'Revolutionizing sports facility booking by making it seamless and accessible for all.'
    },
    {
      id: 'team',
      title: 'Our Team',
      content: 'Passionate tech enthusiasts and sports lovers building a user-friendly booking platform.'
    },
    {
      id: 'commitment',
      title: 'Our Commitment',
      content: 'Ensuring top-notch service with verified facilities for the best experience.'
    }
  ];

  return (
    // Main About hero section
    <div className="about-hero">
      <div className="hero-content">
        {/* Animated title */}
        <h1 className="hero-title">{text}<span className="cursor">|</span></h1>
        {/* Platform description */}
        <p className="hero-description">
          Athlon is your ultimate sports facility booking platform, designed to bridge the gap between 
          sports enthusiasts and quality venues. We simplify the process of finding and booking sports 
          facilities, making it easier than ever to stay active and engaged in your favorite sports.
        </p>
      </div>
    </div>
  );
};

export default About;