import { useEffect, useState } from 'react';
import { adminAPI } from '../services/api';

export default function Admin() {
  const [overview, setOverview] = useState<{ users: number; orders: number; products: number } | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    adminAPI.getOverview()
      .then(data => setOverview(data))
      .catch(err => setError(err.message || 'Unable to load admin data'));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 py-16">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-8 shadow-xl">
        <h1 className="text-3xl font-serif mb-4">Admin Dashboard</h1>
        <p className="text-slate-600 mb-8">This section is restricted to admin users only. It provides an overview of inventory, orders, and integration options.</p>

        {error && <p className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}

        {overview ? (
          <div className="grid gap-6 md:grid-cols-3 mb-10">
            <div className="rounded-3xl border border-slate-200 p-6">
              <h2 className="text-xl font-semibold">Total Products</h2>
              <p className="mt-4 text-4xl font-bold text-slate-900">{overview.products}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-6">
              <h2 className="text-xl font-semibold">Total Orders</h2>
              <p className="mt-4 text-4xl font-bold text-slate-900">{overview.orders}</p>
            </div>
            <div className="rounded-3xl border border-slate-200 p-6">
              <h2 className="text-xl font-semibold">Total Users</h2>
              <p className="mt-4 text-4xl font-bold text-slate-900">{overview.users}</p>
            </div>
          </div>
        ) : (
          <div className="text-slate-500">Loading admin overview…</div>
        )}

        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-slate-200 p-6 bg-slate-50">
            <h2 className="text-xl font-semibold mb-3">Payment Integrations</h2>
            <ul className="space-y-3 text-slate-700">
              <li>• Razorpay</li>
              <li>• PayU</li>
              <li>• Stripe</li>
              <li>• Third-party plugin API support</li>
            </ul>
          </div>
          <div className="rounded-3xl border border-slate-200 p-6 bg-slate-50">
            <h2 className="text-xl font-semibold mb-3">Delivery & Logistics</h2>
            <ul className="space-y-3 text-slate-700">
              <li>• Shiprocket</li>
              <li>• Delhivery</li>
              <li>• Fee-based shipping partners</li>
              <li>• Private inventory subnet support</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
