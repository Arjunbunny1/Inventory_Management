import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Dashboard() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [user, setUser] = useState(null);
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
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/api/products?page=${page}&limit=5`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setProducts(res.data.products);
    } catch (error) {
      console.error('Error fetching products:', error.response?.data?.message || error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  useEffect(() => {
    fetchUser();
    fetchProducts();
  }, [page]);

  return (
    <div style={{ padding: '20px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2>Dashboard</h2>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <button onClick={() => navigate('/add-product')} style={{ padding: '6px 12px' }}>
            ➕ Add Product
          </button>
          {user && (
            <span>
              <strong>{user.name}</strong> ({user.email}) &nbsp;
              <button onClick={handleLogout}>Logout</button>
            </span>
          )}
        </div>
      </div>

      {/* Product List */}
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product._id}>
                <strong>{product.name}</strong> — {product.quantity} in stock — ₹{product.price} &nbsp;
                <button onClick={() => navigate(`/update-product/${product._id}`)}>Update Quantity</button>
             </li>
             ))}
        </ul>
      )}

      {/* Pagination */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => setPage((prev) => Math.max(prev - 1, 1))}>Prev</button>
        <span style={{ margin: '0 10px' }}>Page: {page}</span>
        <button onClick={() => setPage((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
}

export default Dashboard;
