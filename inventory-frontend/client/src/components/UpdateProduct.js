import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState('');
  const [productName, setProductName] = useState('');

  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/api/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setQuantity(res.data.quantity);
        setProductName(res.data.name);
      } catch (err) {
        console.error('Error fetching product', err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
     `http://localhost:8000/api/products/${id}/quantity`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Quantity updated!');
      navigate('/dashboard');
    } catch (err) {
      console.error('Update error:', err.response?.data?.message || err.message);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Update Quantity for: {productName}</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Quantity: &nbsp;
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        <br /><br />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default UpdateProduct;
