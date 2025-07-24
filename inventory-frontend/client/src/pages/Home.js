import React from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h1>Welcome to Inventory App</h1>
      <div style={{ marginTop: '20px' }}>
        <button onClick={() => navigate('/register')} style={{ marginRight: '10px' }}>
          Signup
        </button>
        <button onClick={() => navigate('/login')}>Login</button>
      </div>
    </div>
  );
}

export default Home;
