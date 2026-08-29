import React from 'react';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import './ProductsCarousel.css';

const ProductsCarousel = () => {
  const products = [
    {
      id: 1,
      name: 'كنبة جلدية فاخرة',
      price: 2500,
      originalPrice: 3500,
      rating: 4.8,
      reviews: 245,
      image: 'linear-gradient(135deg, #D4A574, #C69B60)',
      discount: 28
    },
    {
      id: 2,
      name: 'طاولة قهوة خشبية',
      price: 800,
      originalPrice: 1200,
      rating: 4.6,
      reviews: 128,
      image: 'linear-gradient(135deg, #8B6F47, #A0826D)',
      discount: 33
    },
    {
      id: 3,
      name: 'مصباح ديكور مودرن',
      price: 350,
      originalPrice: 500,
      rating: 4.9,
      reviews: 89,
      image: 'linear-gradient(135deg, #FFD700, #FFA500)',
      discount: 30
    },
    {
      id: 4,
      name: 'ستارة فاخرة',
      price: 450,
      originalPrice: 750,
      rating: 4.7,
      reviews: 156,
      image: 'linear-gradient(135deg, #9C27B0, #E91E63)',
      discount: 40
    },
  ];

  return (
    <section className="products-carousel">
      <div className="carousel-header">
        <h2>المنتجات المميزة</h2>
        <a href="/products" className="view-all">عرض الكل →</a>
      </div>
      <div className="products-grid">
        {products.map((product, index) => (
          <div key={product.id} className="product-card" style={{ animationDelay: `${index * 0.1}s` }}>
            <div className="product-image" style={{ background: product.image }}>
              <div className="discount-badge">{product.discount}%</div>
              <button className="wishlist-btn">
                <FaHeart />
              </button>
            </div>
            <div className="product-content">
              <h3>{product.name}</h3>
              <div className="rating">
                <span className="stars">
                  {'⭐'.repeat(Math.floor(product.rating))}
                </span>
                <span className="rating-text">({product.reviews})</span>
              </div>
              <div className="price">
                <span className="original">SAR {product.originalPrice}</span>
                <span className="current">SAR {product.price}</span>
              </div>
              <button className="add-cart-btn">
                <FaShoppingCart /> أضف للسلة
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductsCarousel;