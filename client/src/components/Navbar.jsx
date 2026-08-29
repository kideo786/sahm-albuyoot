import React, { useState } from 'react';
import { FaSearch, FaFilter, FaShoppingCart, FaUser, FaBell, FaMenu, FaHome } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cartCount] = useState(3);

  return (
    <nav className="navbar">
      {/* Logo Section */}
      <div className="navbar-logo">
        <div className="logo-icon">🏠</div>
        <div className="logo-text">
          <h1>سهم البيوت</h1>
          <p>Sahm AlBuyoot</p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="navbar-search">
        <div className="search-container">
          <FaSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="ابحث عن أثاث، ديكور، مقاول..." 
            className="search-input"
          />
        </div>
      </div>

      {/* Right Section */}
      <div className="navbar-right">
        {/* Notifications */}
        <div className="navbar-icon-group">
          <FaBell className="navbar-icon" />
          <span className="notification-badge">2</span>
        </div>

        {/* Cart */}
        <div className="navbar-icon-group">
          <FaShoppingCart className="navbar-icon" />
          <span className="cart-badge">{cartCount}</span>
        </div>

        {/* Profile */}
        <div className="navbar-icon-group">
          <FaUser className="navbar-icon" />
        </div>

        {/* Mobile Menu */}
        <button 
          className="mobile-menu-btn"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <FaMenu />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="mobile-menu">
          <a href="/"><FaHome /> الرئيسية</a>
          <a href="/stores">المتاجر</a>
          <a href="/products">المنتجات</a>
          <a href="/profile">حسابي</a>
        </div>
      )}
    </nav>
  );
};

export default Navbar;