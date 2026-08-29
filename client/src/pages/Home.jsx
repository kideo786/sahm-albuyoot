import React, { useState } from 'react';
import { FaHome, FaCouch, FaPalette, FaTools, FaWrench, FaChevronLeft } from 'react-icons/fa';
import HeroSection from '../components/HeroSection';
import CategorySection from '../components/CategorySection';
import ProductsCarousel from '../components/ProductsCarousel';
import StoresShowcase from '../components/StoresShowcase';
import './Home.css';

const Home = () => {
  const categories = [
    {
      id: 1,
      name: 'الأثاث',
      icon: <FaCouch />,
      color: '#3498db',
      description: 'أثاث منزلي عصري'
    },
    {
      id: 2,
      name: 'الديكورات',
      icon: <FaPalette />,
      color: '#E67E22',
      description: 'ديكورات جميلة'
    },
    {
      id: 3,
      name: 'مواد البناء',
      icon: <FaTools />,
      color: '#27AE60',
      description: 'مواد بناء أصلية'
    },
    {
      id: 4,
      name: 'المقاولون',
      icon: <FaHome />,
      color: '#E74C3C',
      description: 'خدمات متخصصة'
    },
    {
      id: 5,
      name: 'الإصلاح',
      icon: <FaWrench />,
      color: '#9B59B6',
      description: 'خدمات صيانة'
    }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <section className="categories-section">
        <h2>الفئات الرئيسية</h2>
        <div className="categories-container">
          {categories.map((category) => (
            <div key={category.id} className="category-card" style={{ borderTopColor: category.color }}>
              <div className="category-icon" style={{ color: category.color }}>
                {category.icon}
              </div>
              <h3>{category.name}</h3>
              <p>{category.description}</p>
              <button className="category-btn">
                استعرض
                <FaChevronLeft className="chevron" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Products Carousel */}
      <ProductsCarousel />

      {/* Stores Showcase */}
      <StoresShowcase />

      {/* Deals Section */}
      <section className="deals-section">
        <div className="deals-header">
          <h2>عروض خاصة 🎉</h2>
          <p>خصومات تصل إلى 50%</p>
        </div>
        <div className="deals-grid">
          {[1, 2, 3, 4].map((deal) => (
            <div key={deal} className="deal-card" style={{ animationDelay: `${deal * 0.1}s` }}>
              <div className="deal-image"></div>
              <div className="deal-content">
                <span className="discount-badge">-{20 + deal * 5}%</span>
                <h3>منتج رائع</h3>
                <p className="original-price">500 ريال</p>
                <p className="sale-price">250 ريال</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;