import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    sku: '',
    image_url: '',
    description: '',
    quantity: 0,
    price: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === 'quantity' || name === 'price' ? Number(value) : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const res = await axios.post('http://localhost:8000/api/products', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert('Product added successfully!');
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Error adding product');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Add New Product</h2>
      <form onSubmit={handleSubmit}>
        {Object.entries(formData).map(([key, val]) => (
          <div key={key} style={{ marginBottom: '10px' }}>
            <label>{key.charAt(0).toUpperCase() + key.slice(1)}:</label><br />
            <input
              type={key === 'quantity' || key === 'price' ? 'number' : 'text'}
              name={key}
              value={val}
              onChange={handleChange}
              required
            />
          </div>
        ))}
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default AddProduct;
