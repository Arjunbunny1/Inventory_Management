import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-content">
          <div className="hero-text">
            <h1 className="hero-title">
              <span className="gradient-text">Inventory</span> Management
            </h1>
            <p className="hero-subtitle">
              Streamline your business operations with our powerful inventory management system. 
              Track, manage, and optimize your stock levels with ease.
            </p>
          </div>
          
          <div className="cta-buttons">
            <button 
              className="btn btn-primary"
              onClick={() => navigate('/register')}
            >
              Get Started
              <span className="btn-icon">→</span>
            </button>
            <button 
              className="btn btn-secondary"
              onClick={() => navigate('/login')}
            >
              Sign In
            </button>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="floating-elements">
          <div className="floating-box box-1"></div>
          <div className="floating-box box-2"></div>
          <div className="floating-box box-3"></div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="features-section">
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">📦</div>
            <h3>Track Inventory</h3>
            <p>Monitor your stock levels in real-time</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Analytics</h3>
            <p>Get insights with detailed reports</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <h3>Fast & Secure</h3>
            <p>Lightning fast with enterprise security</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
