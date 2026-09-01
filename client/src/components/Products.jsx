import React from 'react';
import { FaStar, FaShoppingCart, FaHeart } from 'react-icons/fa';
import './Products.css';

const Products = () => {
  const products = [
    {
      id: 1,
      name: 'كنبة جلدية فاخرة',
      price: 2500,
      originalPrice: 3500,
      rating: 4.8,
      reviews: 245,
      discount: 28,
      image: 'linear-gradient(135deg, #D4A574, #C69B60)'
    },
    {
      id: 2,
      name: 'طاولة قهوة خشبية',
      price: 800,
      originalPrice: 1200,
      rating: 4.6,
      reviews: 128,
      discount: 33,
      image: 'linear-gradient(135deg, #8B6F47, #A0826D)'
    },
    {
      id: 3,
      name: 'مصباح ديكور حديث',
      price: 350,
      originalPrice: 500,
      rating: 4.9,
      reviews: 89,
      discount: 30,
      image: 'linear-gradient(135deg, #FFD700, #FFA500)'
    },
    {
      id: 4,
      name: 'ستارة فاخرة',
      price: 450,
      originalPrice: 750,
      rating: 4.7,
      reviews: 156,
      discount: 40,
      image: 'linear-gradient(135deg, #9C27B0, #E91E63)'
    },
  ];

  return (
    <section className="products">
      <h2>المنتجات المميزة</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <div className="product-image" style={{ background: product.image }}>
              <span className="discount-badge">-{product.discount}%</span>
              <button className="wishlist-btn">
                <FaHeart />
              </button>
            </div>
            <div className="product-info">
              <h3>{product.name}</h3>
              <div className="rating">
                <FaStar className="star" />
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

export default Products;