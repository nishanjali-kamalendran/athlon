import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';


const Price = () => {
  const [hoveredPlan, setHoveredPlan] = useState(null);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
      offset: 100
    });
  }, []);

  const plans = [
    {
      id: 'starter',
      name: 'Starter',
      price: '29',
      period: 'month',
      description: 'Perfect for individuals getting started',
      features: [
        'Up to 5 projects',
        '10GB storage',
        'Basic support',
        'Standard templates',
        'Export to PDF'
      ],
      popular: false
    },
    {
      id: 'professional',
      name: 'Professional',
      price: '79',
      period: 'month',
      description: 'Ideal for growing teams and businesses',
      features: [
        'Unlimited projects',
        '100GB storage',
        'Priority support',
        'Premium templates',
        'Advanced analytics',
        'Team collaboration',
        'Custom branding'
      ],
      popular: true
    },
    {
      id: 'enterprise',
      name: 'Enterprise',
      price: '199',
      period: 'month',
      description: 'Advanced features for large organizations',
      features: [
        'Everything in Professional',
        'Unlimited storage',
        '24/7 phone support',
        'Custom integrations',
        'Advanced security',
        'Dedicated manager',
        'SLA guarantee'
      ],
      popular: false
    }
  ];

  return (
    <div className="pricing-container">
      <div className="pricing-wrapper">
        {/* Header */}
        <div className="pricing-header">
          <h2 className="pricing-title">Choose Your Plan</h2>
          <p className="pricing-subtitle">
            Unlock the perfect solution for your needs with our flexible pricing plans
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="pricing-grid">
          {plans.map((plan, index) => (
            <div
              key={plan.id}
              className={`pricing-card ${plan.popular ? 'popular' : ''} ${
                hoveredPlan === index ? 'hovered' : ''
              }`}
              data-aos="fade-up"
              data-aos-delay={index * 200}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="popular-badge">
                  <span>Most Popular</span>
                </div>
              )}

              {/* Plan Header */}
              <div className="plan-header">
                <h3 className="plan-name">{plan.name}</h3>
                <p className="plan-description">{plan.description}</p>
                
                <div className="price-display">
                  <span className="price">${plan.price}</span>
                  <span className="period">/{plan.period}</span>
                </div>
              </div>

              {/* Features List */}
              <div className="features-list">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="feature-item">
                    <div className="check-icon">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <polyline points="20,6 9,17 4,12"></polyline>
                      </svg>
                    </div>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button className={`cta-button ${plan.popular ? 'primary' : 'secondary'}`}>
                Get Started
              </button>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bottom-cta">
          <p className="bottom-text">
            Need a custom solution? We'd love to help you out.
          </p>
          <button className="contact-button">Contact Sales</button>
        </div>
      </div>
    </div>
  );
};

export default Price;