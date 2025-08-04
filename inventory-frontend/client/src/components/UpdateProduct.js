import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import './UpdateProduct.css';

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState('');
  const [originalQuantity, setOriginalQuantity] = useState('');
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setIsLoading(true);
        setError('');
        const res = await axios.get(API_ENDPOINTS.PRODUCT_BY_ID(id), {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        console.log('Product response:', res.data); // Debug log
        
        // Handle different possible response structures
        const productData = res.data.product || res.data;
        
        if (productData) {
          setProduct(productData);
          setQuantity(productData.quantity.toString());
          setOriginalQuantity(productData.quantity.toString());
        } else {
          setError('Product data not found in response');
        }
      } catch (err) {
        console.error('Error fetching product:', err);
        setError('Failed to load product details');
        if (err.response?.status === 401) {
          navigate('/login');
        } else if (err.response?.status === 404) {
          setError('Product not found');
        } else {
          setError(err.response?.data?.message || 'Failed to load product');
        }
      } finally {
        setIsLoading(false);
      }
    };

    if (!token) {
      navigate('/login');
      return;
    }

    fetchProduct();
  }, [id, token, navigate]);

  const handleQuantityChange = (e) => {
    const value = e.target.value;
    if (value === '' || (Number(value) >= 0 && Number(value) <= 999999)) {
      setQuantity(value);
      setError('');
    }
  };

  const handleIncrement = () => {
    const newQuantity = Number(quantity) + 1;
    if (newQuantity <= 999999) {
      setQuantity(newQuantity.toString());
    }
  };

  const handleDecrement = () => {
    const newQuantity = Math.max(0, Number(quantity) - 1);
    setQuantity(newQuantity.toString());
  };

  const handleQuickAdd = (amount) => {
    const newQuantity = Number(quantity) + amount;
    if (newQuantity >= 0 && newQuantity <= 999999) {
      setQuantity(newQuantity.toString());
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!quantity || Number(quantity) < 0) {
      setError('Please enter a valid quantity');
      return;
    }

    if (Number(quantity) === Number(originalQuantity)) {
      setError('Quantity is the same as before');
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.put(
        API_ENDPOINTS.UPDATE_PRODUCT_QUANTITY(id),
        { quantity: Number(quantity) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Quantity updated successfully!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Update error:', err.response?.data?.message || err.message);
      if (err.response?.status === 401) {
        alert('Session expired. Please login again.');
        navigate('/login');
      } else {
        setError(err.response?.data?.message || 'Failed to update quantity');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  if (isLoading) {
    return (
      <div className="update-loading">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (!product && !isLoading) {
    return (
      <div className="update-error">
        <div className="error-icon">❌</div>
        <h2>Product Not Found</h2>
        <p>{error || 'The product you\'re looking for doesn\'t exist or has been removed.'}</p>
        <p><strong>Product ID:</strong> {id}</p>
        <button className="back-btn" onClick={() => navigate('/dashboard')}>
          Back to Dashboard
        </button>
      </div>
    );
  }

  const quantityDifference = Number(quantity) - Number(originalQuantity);
  const isIncreasing = quantityDifference > 0;
  const isDecreasing = quantityDifference < 0;

  return (
    <div className="update-product-container">
      <div className="update-background">
        <div className="bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
      </div>
      
      <div className="update-content">
        <div className="update-card">
          <div className="update-header">
            <div className="header-icon">
              <span>📊</span>
            </div>
            <h1>Update Quantity</h1>
            <div className="product-info">
              <h2 className="product-name">{product.name}</h2>
              <div className="product-details">
                <span className="detail-item">
                  <span className="detail-label">SKU:</span>
                  <span className="detail-value">{product.sku}</span>
                </span>
                <span className="detail-item">
                  <span className="detail-label">Type:</span>
                  <span className="detail-value">{product.type}</span>
                </span>
                <span className="detail-item">
                  <span className="detail-label">Price:</span>
                  <span className="detail-value">₹{product.price}</span>
                </span>
              </div>
            </div>
          </div>

          <form className="quantity-form" onSubmit={handleSubmit}>
            <div className="current-stock">
              <div className="stock-display">
                <span className="stock-label">Current Stock</span>
                <span className="stock-value">{originalQuantity} units</span>
              </div>
            </div>

            <div className="quantity-section">
              <label className="quantity-label">
                <span className="label-icon">📦</span>
                New Quantity
              </label>
              
              <div className="quantity-controls">
                <button
                  type="button"
                  className="quantity-btn decrease"
                  onClick={handleDecrement}
                  disabled={Number(quantity) <= 0}
                >
                  −
                </button>
                
                <input
                  type="number"
                  className="quantity-input"
                  value={quantity}
                  onChange={handleQuantityChange}
                  min="0"
                  max="999999"
                  required
                />
                
                <button
                  type="button"
                  className="quantity-btn increase"
                  onClick={handleIncrement}
                  disabled={Number(quantity) >= 999999}
                >
                  +
                </button>
              </div>

              {quantityDifference !== 0 && (
                <div className={`quantity-change ${isIncreasing ? 'increase' : 'decrease'}`}>
                  <span className="change-icon">
                    {isIncreasing ? '📈' : '📉'}
                  </span>
                  <span className="change-text">
                    {isIncreasing ? '+' : ''}{quantityDifference} units
                  </span>
                </div>
              )}
            </div>

            <div className="quick-actions">
              <span className="quick-label">Quick Actions:</span>
              <div className="quick-buttons">
                <button
                  type="button"
                  className="quick-btn"
                  onClick={() => handleQuickAdd(10)}
                >
                  +10
                </button>
                <button
                  type="button"
                  className="quick-btn"
                  onClick={() => handleQuickAdd(50)}
                >
                  +50
                </button>
                <button
                  type="button"
                  className="quick-btn"
                  onClick={() => handleQuickAdd(100)}
                >
                  +100
                </button>
                <button
                  type="button"
                  className="quick-btn reset"
                  onClick={() => setQuantity(originalQuantity.toString())}
                >
                  Reset
                </button>
              </div>
            </div>

            {error && (
              <div className="error-message">
                <span className="error-icon">⚠️</span>
                {error}
              </div>
            )}

            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={handleCancel}
                disabled={isSubmitting}
              >
                <span className="btn-icon">❌</span>
                Cancel
              </button>
              
              <button 
                type="submit" 
                className={`update-btn ${isSubmitting ? 'loading' : ''}`}
                disabled={isSubmitting || Number(quantity) === Number(originalQuantity)}
              >
                {isSubmitting ? (
                  <>
                    <span className="spinner"></span>
                    Updating...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">💾</span>
                    Update Quantity
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default UpdateProduct;
