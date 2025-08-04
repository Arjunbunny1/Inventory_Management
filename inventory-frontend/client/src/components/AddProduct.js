import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API_ENDPOINTS } from '../config/api';
import './AddProduct.css';

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    sku: '',
    image_url: '',
    description: '',
    quantity: '',
    price: '',
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ 
      ...formData, 
      [name]: value 
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!formData.type.trim()) {
      newErrors.type = 'Product type is required';
    }
    
    if (!formData.sku.trim()) {
      newErrors.sku = 'SKU is required';
    }
    
    if (!formData.description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!formData.quantity || formData.quantity < 0) {
      newErrors.quantity = 'Valid quantity is required';
    }
    
    if (!formData.price || formData.price < 0) {
      newErrors.price = 'Valid price is required';
    }
    
    // Removed image_url validation - users can enter any string
    
    return newErrors;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      const submitData = {
        ...formData,
        quantity: Number(formData.quantity),
        price: Number(formData.price)
      };
      
      const res = await axios.post(API_ENDPOINTS.PRODUCTS, submitData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      alert('Product added successfully!');
      navigate('/dashboard');
    } catch (err) {
      if (err.response?.status === 401) {
        alert('Session expired. Please login again.');
        navigate('/login');
      } else {
        alert(err.response?.data?.message || 'Error adding product');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/dashboard');
  };

  return (
    <div className="add-product-container">
      <div className="add-product-background">
        <div className="bg-elements">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
        </div>
      </div>
      
      <div className="add-product-content">
        <div className="add-product-card">
          <div className="form-header">
            <div className="header-icon">
              <span>📦</span>
            </div>
            <h1>Add New Product</h1>
            <p>Fill in the details to add a new product to your inventory</p>
          </div>
          
          <form className="product-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">🏷️</span>
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Enter product name"
                  required
                />
                {errors.name && <span className="error-message">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">📂</span>
                  Product Type *
                </label>
                <input
                  type="text"
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className={`form-input ${errors.type ? 'error' : ''}`}
                  placeholder="e.g., Electronics, Clothing, Books"
                  required
                />
                {errors.type && <span className="error-message">{errors.type}</span>}
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">🔢</span>
                  SKU *
                </label>
                <input
                  type="text"
                  name="sku"
                  value={formData.sku}
                  onChange={handleChange}
                  className={`form-input ${errors.sku ? 'error' : ''}`}
                  placeholder="e.g., ABC-123"
                  required
                />
                {errors.sku && <span className="error-message">{errors.sku}</span>}
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">🖼️</span>
                  Image URL
                </label>
                <input
                  type="text"
                  name="image_url"
                  value={formData.image_url}
                  onChange={handleChange}
                  className={`form-input ${errors.image_url ? 'error' : ''}`}
                  placeholder="Enter image URL or path"
                />
                {errors.image_url && <span className="error-message">{errors.image_url}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">
                <span className="label-icon">📝</span>
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className={`form-textarea ${errors.description ? 'error' : ''}`}
                placeholder="Enter product description..."
                rows="4"
                required
              />
              {errors.description && <span className="error-message">{errors.description}</span>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">📊</span>
                  Quantity *
                </label>
                <input
                  type="number"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  className={`form-input ${errors.quantity ? 'error' : ''}`}
                  placeholder="0"
                  min="0"
                  required
                />
                {errors.quantity && <span className="error-message">{errors.quantity}</span>}
              </div>
              
              <div className="form-group">
                <label className="form-label">
                  <span className="label-icon">💰</span>
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className={`form-input ${errors.price ? 'error' : ''}`}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  required
                />
                {errors.price && <span className="error-message">{errors.price}</span>}
              </div>
            </div>

            <div className="form-actions">
              <button 
                type="button" 
                className="cancel-btn"
                onClick={handleCancel}
                disabled={isLoading}
              >
                <span className="btn-icon">❌</span>
                Cancel
              </button>
              
              <button 
                type="submit" 
                className={`submit-btn ${isLoading ? 'loading' : ''}`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="spinner"></span>
                    Adding Product...
                  </>
                ) : (
                  <>
                    <span className="btn-icon">✅</span>
                    Add Product
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

export default AddProduct;
