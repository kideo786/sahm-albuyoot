import React, { useState } from 'react';
import { FaSearch, FaShoppingCart, FaUser, FaBell, FaHome } from 'react-icons/fa';
import './Navbar.css';

const Navbar = () => {
  const [cartCount] = useState(0);
  const [notifications] = useState(0);

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <span className="logo-icon">🏠</span>
        <div className="logo-text">
          <h1>سهم البيوت</h1>
          <p>Sahm AlBuyoot</p>
        </div>
      </div>

      {/* Search */}
      <div className="navbar-search">
        <input 
          type="text" 
          placeholder="ابحث عن أثاث، ديكور، خدمات..."
          className="search-input"
        />
        <FaSearch className="search-icon" />
      </div>

      {/* Right Icons */}
      <div className="navbar-icons">
        <div className="icon-group">
          <FaBell className="icon" />
          {notifications > 0 && <span className="badge">{notifications}</span>}
        </div>
        <div className="icon-group">
          <FaShoppingCart className="icon" />
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </div>
        <div className="icon-group">
          <FaUser className="icon" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;