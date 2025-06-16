import React, { useState, useEffect } from 'react';


const About = () => {
  const [text, setText] = useState('');
  const fullText = 'What is ATHLON?';

  useEffect(() => {
    let currentIndex = 0;
    const typingInterval = setInterval(() => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
      } else {
        setTimeout(() => {
          currentIndex = 0;
          setText('');
        }, 2000);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

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
    
      <div className="about-hero">
        <div className="hero-content">
          <h1 className="hero-title">{text}<span className="cursor">|</span></h1>
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