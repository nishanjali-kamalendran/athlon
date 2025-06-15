import React from 'react';
import { ChevronDown } from 'lucide-react';

const FAQSection = ({ faqs, faqOpen, toggleFAQ }) => {
    return (
        <section className="faq">
            <div className="faq-container">
                <h2 className="faq-title">
                    Frequently Asked Questions
                </h2>

                <div className="faq-list">
                    {faqs.map((faq, index) => (
                        <div key={index} className="faq-item">
                            <button
                                onClick={() => toggleFAQ(index)}
                                className="faq-question"
                            >
                                <span className="faq-question-text">{faq.question}</span>
                                <ChevronDown
                                    size={20}
                                    className={`faq-chevron ${faqOpen[index] ? 'open' : ''}`}
                                />
                            </button>
                            {faqOpen[index] && (
                                <div className="faq-answer">
                                    <p>{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FAQSection;