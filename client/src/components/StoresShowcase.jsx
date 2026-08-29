import React from 'react';
import { FaStar, FaUsers, FaStore } from 'react-icons/fa';
import './StoresShowcase.css';

const StoresShowcase = () => {
  const stores = [
    {
      id: 1,
      name: 'متجر الفخامة',
      category: 'أثاث',
      rating: 4.9,
      followers: 2500,
      products: 350,
      logo: '🏢'
    },
    {
      id: 2,
      name: 'ديكور الأحلام',
      category: 'ديكورات',
      rating: 4.7,
      followers: 1800,
      products: 280,
      logo: '✨'
    },
    {
      id: 3,
      name: 'مواد البناء الأولى',
      category: 'مواد بناء',
      rating: 4.8,
      followers: 3200,
      products: 450,
      logo: '🔨'
    },
    {
      id: 4,
      name: 'المقاول الموثوق',
      category: 'مقاولون',
      rating: 4.9,
      followers: 1500,
      products: 120,
      logo: '👨‍💼'
    },
  ];

  return (
    <section className="stores-showcase">
      <div className="stores-header">
        <h2>المتاجر الموثوقة</h2>
        <p>اكتشف أفضل المتاجر والبائعين</p>
      </div>
      <div className="stores-grid">
        {stores.map((store, index) => (
          <div key={store.id} className="store-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="store-header-bg"></div>
            <div className="store-logo">{store.logo}</div>
            <h3>{store.name}</h3>
            <p className="store-category">{store.category}</p>
            
            <div className="store-stats">
              <div className="stat">
                <FaStar className="icon" />
                <span>{store.rating}</span>
              </div>
              <div className="stat">
                <FaUsers className="icon" />
                <span>{store.followers}+</span>
              </div>
              <div className="stat">
                <FaStore className="icon" />
                <span>{store.products}</span>
              </div>
            </div>
            
            <button className="visit-store-btn">زيارة المتجر</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default StoresShowcase;