import React, { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import HowItWorksSection from './components/HowItWorksSection';
import Features from './components/Features.jsx';
import ContactSection from './components/ContactSection';
import Suggestions from './components/Suggestions.jsx';
//import Price from './components/Price.jsx';
import Footer from './components/Footer';
import Download from './components/Download.jsx';
import './App.css';
import About from './components/About.jsx';


const App = () => {
    const [scrollY, setScrollY] = useState(0);
    const [activeSection, setActiveSection] = useState('players');
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const heroRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="app">
            <Navigation 
                mobileMenuOpen={mobileMenuOpen}
                setMobileMenuOpen={setMobileMenuOpen}
            />

            <div id="home">
                <HeroSection
                    heroRef={heroRef}
                    scrollY={scrollY}
                />
            </div>

            <div id="about">
                <About/>
            </div>

            <div id="howitworks">
                <HowItWorksSection
                    activeSection={activeSection}
                    setActiveSection={setActiveSection}
                />
            </div>

            <Suggestions/>

            <div id="features">
                <Features />
            </div>
            
            <Download />

            <div id="contact">
                <ContactSection />
            </div>

            <Footer />
        </div>
    );
};

export default App;