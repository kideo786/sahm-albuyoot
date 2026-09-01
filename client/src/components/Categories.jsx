import React from 'react';
import './Categories.css';

const Categories = () => {
  const categories = [
    { id: 1, name: 'الأثاث', icon: '🛋️', color: '#3498db' },
    { id: 2, name: 'الديكورات', icon: '✨', color: '#e74c3c' },
    { id: 3, name: 'مواد البناء', icon: '🔨', color: '#27ae60' },
    { id: 4, name: 'المقاولون', icon: '👷', color: '#f39c12' },
    { id: 5, name: 'الإصلاح', icon: '🔧', color: '#9b59b6' },
  ];

  return (
    <section className="categories">
      <h2>التصنيفات</h2>
      <div className="categories-grid">
        {categories.map((cat) => (
          <div key={cat.id} className="category-card" style={{ borderTopColor: cat.color }}>
            <span className="category-icon">{cat.icon}</span>
            <h3>{cat.name}</h3>
            <button>استعرض</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Categories;