/**
 * API Service for Vastra Frontend
 * Handles all communication with the backend API
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Store token in localStorage
const setToken = (token) => {
  if (token) {
    localStorage.setItem('authToken', token);
  }
};

const setUserRole = (role) => {
  if (role) {
    localStorage.setItem('userRole', role);
  }
};

const getToken = () => {
  return localStorage.getItem('authToken');
};

const removeToken = () => {
  localStorage.removeItem('authToken');
};

// Helper function to make API calls
const apiCall = async (endpoint, options = {}) => {
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  // Add auth token if available
  const token = getToken();
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
};

// Auth API
export const authAPI = {
  register: async (email, password, firstName, lastName) => {
    const data = await apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, firstName, lastName }),
    });
    setToken(data.token);
    setUserRole(data.user?.role || 'customer');
    return data;
  },

  login: async (email, password) => {
    const data = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setToken(data.token);
    setUserRole(data.user?.role || 'customer');
    return data;
  },

  logout: () => {
    removeToken();
    localStorage.removeItem('userRole');
  },

  getProfile: async () => {
    return apiCall('/auth/profile');
  },

  updateProfile: async (firstName, lastName, phone) => {
    return apiCall('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify({ firstName, lastName, phone }),
    });
  },
};

// Products API
export const productsAPI = {
  getAll: async (limit = 20, offset = 0) => {
    return apiCall(`/products?limit=${limit}&offset=${offset}`);
  },

  getById: async (id) => {
    return apiCall(`/products/${id}`);
  },

  getByCategory: async (category, limit = 20, offset = 0) => {
    return apiCall(
      `/products/category/${encodeURIComponent(category)}?limit=${limit}&offset=${offset}`
    );
  },

  getFeatured: async () => {
    return apiCall('/products/featured');
  },

  getNewArrivals: async () => {
    return apiCall('/products/new-arrivals');
  },

  search: async (query) => {
    return apiCall(`/products/search?q=${encodeURIComponent(query)}`);
  },
};

// Cart API
export const cartAPI = {
  getCart: async () => {
    return apiCall('/cart');
  },

  addItem: async (productId, quantity, size, color) => {
    return apiCall('/cart', {
      method: 'POST',
      body: JSON.stringify({ productId, quantity, size, color }),
    });
  },

  updateItem: async (itemId, quantity) => {
    return apiCall(`/cart/${itemId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity }),
    });
  },

  removeItem: async (itemId) => {
    return apiCall(`/cart/${itemId}`, {
      method: 'DELETE',
    });
  },

  clearCart: async () => {
    return apiCall('/cart', {
      method: 'DELETE',
    });
  },
};

// Orders API
export const ordersAPI = {
  create: async (shippingAddress) => {
    return apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify({ shippingAddress }),
    });
  },

  getOrders: async (limit = 20, offset = 0) => {
    return apiCall(`/orders?limit=${limit}&offset=${offset}`);
  },

  getOrderById: async (id) => {
    return apiCall(`/orders/${id}`);
  },
};

export const adminAPI = {
  getOverview: async () => {
    return apiCall('/admin/overview');
  },
};

// Health check
export const checkBackendHealth = async () => {
  try {
    const response = await fetch(`${API_BASE_URL.replace('/api', '')}/api/health`);
    return response.ok;
  } catch {
    return false;
  }
};

export default {
  authAPI,
  productsAPI,
  cartAPI,
  ordersAPI,
  checkBackendHealth,
};
