import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Dashboard.css';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalValue: 0,
    lowStock: 0,
    outOfStock: 0
  });
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  const fetchUser = async () => {
    try {
      const res = await axios.get('http://localhost:8000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(res.data.user);
    } catch (err) {
      console.error('User fetch error', err);
      if (err.response?.status === 401) {
        handleLogout();
      }
    }
  };

  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await axios.get(`http://localhost:8000/api/products?page=${page}&limit=10`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data.products);
      
      // Calculate stats
      const totalProducts = res.data.products.length;
      const totalValue = res.data.products.reduce((sum, product) => sum + (product.price * product.quantity), 0);
      const lowStock = res.data.products.filter(product => product.quantity <= 5 && product.quantity > 0).length;
      const outOfStock = res.data.products.filter(product => product.quantity === 0).length;
      
      setStats({
        totalProducts,
        totalValue,
        lowStock,
        outOfStock
      });
    } catch (error) {
      console.error('Error fetching products:', error.response?.data?.message || error.message);
      if (error.response?.status === 401) {
        handleLogout();
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const getStockStatus = (quantity) => {
    if (quantity === 0) return 'out-of-stock';
    if (quantity <= 5) return 'low-stock';
    return 'in-stock';
  };

  const getStockStatusText = (quantity) => {
    if (quantity === 0) return 'Out of Stock';
    if (quantity <= 5) return 'Low Stock';
    return 'In Stock';
  };

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }
    fetchUser();
    fetchProducts();
  }, [page, token, navigate]);

  if (isLoading) {
    return (
      <div className="dashboard-loading">
        <div className="loading-spinner"></div>
        <p>Loading your dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <h1 className="dashboard-title">
              <span className="title-icon">📊</span>
              Inventory Dashboard
            </h1>
            <p className="dashboard-subtitle">Manage your products and track inventory</p>
          </div>
          
          <div className="header-right">
            <button 
              className="add-product-btn"
              onClick={() => navigate('/add-product')}
            >
              <span className="btn-icon">➕</span>
              Add Product
            </button>
            
            {user && (
              <div className="user-info">
                <div className="user-avatar">
                  <span>{user.name.charAt(0).toUpperCase()}</span>
                </div>
                <div className="user-details">
                  <span className="user-name">{user.name}</span>
                  <span className="user-email">{user.email}</span>
                </div>
                <button className="logout-btn" onClick={handleLogout}>
                  <span>🚪</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <section className="stats-section">
        <div className="stats-grid">
          <div className="stat-card total-products">
            <div className="stat-icon">📦</div>
            <div className="stat-content">
              <h3>{stats.totalProducts}</h3>
              <p>Total Products</p>
            </div>
          </div>
          
          <div className="stat-card total-value">
            <div className="stat-icon">💰</div>
            <div className="stat-content">
              <h3>₹{stats.totalValue.toLocaleString()}</h3>
              <p>Total Value</p>
            </div>
          </div>
          
          <div className="stat-card low-stock">
            <div className="stat-icon">⚠️</div>
            <div className="stat-content">
              <h3>{stats.lowStock}</h3>
              <p>Low Stock</p>
            </div>
          </div>
          
          <div className="stat-card out-of-stock">
            <div className="stat-icon">❌</div>
            <div className="stat-content">
              <h3>{stats.outOfStock}</h3>
              <p>Out of Stock</p>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="products-section">
        <div className="section-header">
          <h2>Product Inventory</h2>
          <div className="view-controls">
            <button className="view-btn active">
              <span>📋</span> List View
            </button>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h3>No products found</h3>
            <p>Start by adding your first product to the inventory</p>
            <button 
              className="add-first-product-btn"
              onClick={() => navigate('/add-product')}
            >
              Add Your First Product
            </button>
          </div>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <div key={product._id} className="product-card">
                <div className="product-header">
                  <h3 className="product-name">{product.name}</h3>
                  <span className={`stock-badge ${getStockStatus(product.quantity)}`}>
                    {getStockStatusText(product.quantity)}
                  </span>
                </div>
                
                <div className="product-details">
                  <div className="detail-item">
                    <span className="detail-label">Quantity:</span>
                    <span className="detail-value">{product.quantity} units</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Price:</span>
                    <span className="detail-value">₹{product.price}</span>
                  </div>
                  <div className="detail-item">
                    <span className="detail-label">Total Value:</span>
                    <span className="detail-value total-value">₹{(product.price * product.quantity).toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="product-actions">
                  <button 
                    className="update-btn"
                    onClick={() => navigate(`/update-product/${product._id}`)}
                  >
                    <span>✏️</span> Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination */}
        {products.length > 0 && (
          <div className="pagination">
            <button 
              className="pagination-btn"
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
            >
              ← Previous
            </button>
            <span className="page-info">Page {page}</span>
            <button 
              className="pagination-btn"
              onClick={() => setPage((prev) => prev + 1)}
              disabled={products.length < 10}
            >
              Next →
            </button>
          </div>
        )}
      </section>
    </div>
  );
}

export default Dashboard;
