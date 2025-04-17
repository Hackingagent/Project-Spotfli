import React, { useState } from 'react';
import { FaQuestionCircle, FaHeadset, FaEnvelope, FaComments, FaClock } from 'react-icons/fa';
import './help-support.css';

const HelpSupport = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I book a service provider?",
      answer: "To book a service provider, simply search for the service you need, select a provider that matches your requirements, choose an available time slot, and confirm your booking."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, mobile money payments, and bank transfers. All payments are processed securely through our platform."
    },
    {
      question: "How do I cancel or reschedule a booking?",
      answer: "You can cancel or reschedule from your bookings page. Please note that cancellation policies may vary depending on the service provider."
    },
    {
      question: "Are service providers verified?",
      answer: "Yes, all service providers undergo a strict verification process including ID checks and professional certification verification where applicable."
    }
  ];
  return (
    <div className="help-support-container fade-up">
      <div className="help-header">
        <h2><FaQuestionCircle className="header-icon fade-up" /> Help & Support</h2>
        <p>We're here to help you with any questions or issues you may have.</p>
      </div>
      
      <div className="support-options  fade-up">
        {/* Live Chat Option */}
        <div className="support-card">
          <div className="card-icon live-chat">
            <FaComments />
          </div>
          <h3>Live Chat</h3>
          <p>Chat instantly with our support team</p>
          <button className="support-button">Start Chat</button>
          <div className="availability">
            <FaClock /> Available 24/7
          </div>
        </div>
        
        {/* Contact Support Option */}
        <div className="support-card  fade-up">
          <div className="card-icon contact-support">
            <FaHeadset />
          </div>
          <h3>Contact Support</h3>
          <p>Get help from our dedicated support team</p>
          <button className="support-button">Contact Us</button>
          <div className="availability">
            <FaClock /> Mon-Fri, 8am-6pm
          </div>
        </div>
        
        {/* Email Support Option */}
        <div className="support-card  fade-up">
          <div className="card-icon email-support">
            <FaEnvelope />
          </div>
          <h3>Email Support</h3>
          <p>Send us an email and we'll respond promptly</p>
          <button className="support-button">Send Email</button>
          <div className="availability">
            <FaClock /> Response within 24 hours
          </div>
        </div>
      </div>
      
      <div className="faq-section  fade-up">
        <h3>Frequently Asked Questions</h3>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div 
              className={`faq-item ${activeIndex === index ? 'active' : ''}`} 
              key={index}
            >
              <button 
                className="faq-question" 
                onClick={() => toggleFAQ(index)}
              >
                {faq.question}
                <span className="toggle-icon">
                  {activeIndex === index ? '−' : '+'}
                </span>
              </button>
              <div className="faq-answer">
                <p>{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button className="view-all-faq">View All FAQ</button>
      </div>
    </div>
  );
};

export default HelpSupport;