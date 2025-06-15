import React from 'react';
import { Calendar, MapPin, Users, Brain, Search, Filter } from 'lucide-react';


const Features = () => {
  const features = [
    {
      id: 'real-time',
      icon: Calendar,
      title: 'Real-Time Booking',
      description: 'Check availability and book courts instantly with our real-time booking system.',
      category: 'Essential',
      color: 'bg-gradient-to-br from-blue-500 to-blue-600',
      accentColor: 'border-blue-400'
    },
    {
      id: 'multi-location',
      icon: MapPin,
      title: 'Multi-Location Support',
      description: 'Find and book courts across multiple locations with interactive maps.',
      category: 'Social',
      color: 'bg-gradient-to-br from-green-500 to-green-600',
      accentColor: 'border-green-400'
    },
    {
      id: 'group-booking',
      icon: Users,
      title: 'Group Booking',
      description: 'Easily organize group sessions with integrated cost splitting.',
      category: 'Smart',
      color: 'bg-gradient-to-br from-purple-500 to-purple-600',
      accentColor: 'border-purple-400'
    },
    {
      id: 'ai-recommendations',
      icon: Brain,
      title: 'AI Recommendations',
      description: 'Get personalized suggestions based on your preferences and booking history.',
      category: 'Discovery',
      color: 'bg-gradient-to-br from-orange-500 to-orange-600',
      accentColor: 'border-orange-400'
    },
    {
      id: 'smart-search',
      icon: Search,
      title: 'Smart Search',
      description: 'Find the perfect court with our AI-powered natural language search.',
      category: 'Utility',
      color: 'bg-gradient-to-br from-red-500 to-red-600',
      accentColor: 'border-red-400'
    },
    {
      id: 'dynamic-filtering',
      icon: Filter,
      title: 'Dynamic Filtering',
      description: 'Sort and filter facilities based on your specific requirements.',
      category: 'Utility',
      color: 'bg-gradient-to-br from-teal-500 to-teal-600',
      accentColor: 'border-teal-400'
    }
  ];

  return (
    <div className="live-demo-container">
      
      <div className="features-grid">
        {features.map((feature, index) => {
          const IconComponent = feature.icon;
          return (
            <div 
              key={feature.id} 
              className={`feature-card ${feature.accentColor}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="feature-header">
                <div className={`icon-container ${feature.color}`}>
                  <IconComponent className="feature-icon" size={24} />
                </div>
                <span className="feature-category">{feature.category}</span>
              </div>
              
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
              
              <div className="feature-footer">
                <button className="demo-button">
                  Try Demo
                  <div className="button-glow"></div>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Features;