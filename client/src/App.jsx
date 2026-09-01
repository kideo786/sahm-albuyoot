import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Categories from './components/Categories';
import Products from './components/Products';
import './App.css';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="container">
        <Hero />
        <Categories />
        <Products />
      </main>
      <footer className="footer">
        <p>© 2026 سهم البيوت - Sahm AlBuyoot. جميع الحقوق محفوظة.</p>
      </footer>
    </div>
  );
}

export default App;