const BASE = 'http://localhost:5000';

async function login(email, password) {
  const res = await fetch(`${BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  const data = await res.json();
  return data;
}

async function getProfile(token) {
  const res = await fetch(`${BASE}/api/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

async function adminOverview(token) {
  const res = await fetch(`${BASE}/api/admin/overview`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return await res.json();
}

async function getProducts() {
  const res = await fetch(`${BASE}/api/products`);
  return await res.json();
}

(async function run() {
  try {
    console.log('Logging in as customer...');
    const cust = await login('customer@vastra.com', 'password123');
    console.log('Customer login:', cust);

    if (cust.token) {
      const profile = await getProfile(cust.token);
      console.log('Customer profile:', profile);
    }

    console.log('Logging in as admin...');
    const admin = await login('admin@vastra.com', 'password123');
    console.log('Admin login:', admin);

    if (admin.token) {
      const overview = await adminOverview(admin.token);
      console.log('Admin overview:', overview);
    }

    console.log('Fetching products (sample)...');
    const products = await getProducts();
    console.log('Products count:', Array.isArray(products) ? products.length : 'error', '\nSample:', products[0]);
  } catch (err) {
    console.error('Test script error:', err);
  }
})();
