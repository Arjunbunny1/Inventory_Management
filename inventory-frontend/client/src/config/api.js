// API Configuration
const API_BASE_URL = 'https://inventory-management-backend-gmji.onrender.com';
// const API_BASE_URL = 'http://localhost:8000';

export const API_ENDPOINTS = {
  // Auth endpoints
  REGISTER: `${API_BASE_URL}/api/auth/register`,
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  ME: `${API_BASE_URL}/api/auth/me`,
  
  // Product endpoints
  PRODUCTS: `${API_BASE_URL}/api/products`,
  PRODUCT_BY_ID: (id) => `${API_BASE_URL}/api/products/${id}`,
  UPDATE_PRODUCT_QUANTITY: (id) => `${API_BASE_URL}/api/products/${id}/quantity`,
};

export default API_BASE_URL;
