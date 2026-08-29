import React from 'react';
import { FaMapMarkerAlt, FaStar, FaArrowLeft } from 'react-icons/fa';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <div className="hero-section">
      <div className="hero-overlay"></div>
      <div className="hero-content">
        <h1 className="hero-title">سهم البيوت</h1>
        <p className="hero-subtitle">منصتك الأولى للديكورات والأثاث والخدمات المنزلية</p>
        <div className="hero-search">
          <input 
            type="text" 
            placeholder="ابحث عن ما تريد..."
            className="hero-search-input"
          />
          <button className="hero-search-btn">
            بحث <FaArrowLeft />
          </button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <h3>500+</h3>
            <p>متجر موثق</p>
          </div>
          <div className="stat">
            <h3>50K+</h3>
            <p>منتج</p>
          </div>
          <div className="stat">
            <h3>4.8★</h3>
            <p>تقييم</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;