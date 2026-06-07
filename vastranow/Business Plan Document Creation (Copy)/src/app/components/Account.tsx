import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';

export default function Account() {
  const [profile, setProfile] = useState<{ email: string; firstName: string; lastName: string; phone?: string; role?: string } | null>(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    authAPI.getProfile()
      .then(data => setProfile(data))
      .catch(() => {
        setError('Please login to access your account.');
      });
  }, []);

  const handleLogout = () => {
    authAPI.logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-slate-100 py-16">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-8 shadow-xl">
        {error ? (
          <div className="space-y-4 text-center">
            <p className="text-lg text-slate-700">{error}</p>
            <Link to="/auth" className="rounded-2xl bg-black px-6 py-3 text-white transition hover:bg-slate-900">
              Go to Login
            </Link>
          </div>
        ) : profile ? (
          <div className="space-y-8">
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6">
              <h1 className="text-3xl font-serif mb-4">Hi, {profile.firstName || 'Vastra Shopper'}</h1>
              <p className="text-slate-600">Manage your profile and track your orders here.</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-3xl border border-slate-200 p-6">
                <h2 className="text-xl font-semibold mb-3">Profile Details</h2>
                <p><span className="font-semibold">Name:</span> {profile.firstName} {profile.lastName}</p>
                <p><span className="font-semibold">Email:</span> {profile.email}</p>
                <p><span className="font-semibold">Phone:</span> {profile.phone || 'Not set'}</p>
                <p><span className="font-semibold">Role:</span> {profile.role || 'Customer'}</p>
              </div>
              <div className="rounded-3xl border border-slate-200 p-6 bg-slate-50">
                <h2 className="text-xl font-semibold mb-3">Account Actions</h2>
                <button
                  onClick={handleLogout}
                  className="w-full rounded-2xl bg-black px-6 py-3 text-white transition hover:bg-slate-900"
                >
                  Logout
                </button>
                {profile.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="mt-4 inline-flex w-full justify-center rounded-2xl border border-black px-6 py-3 text-black transition hover:bg-black hover:text-white"
                  >
                    Admin Dashboard
                  </Link>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center text-slate-500">Loading account details…</div>
        )}
      </div>
    </div>
  );
}
