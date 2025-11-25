import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../utils/api';
import { useAuthStore } from '../store/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuthStore();

  const quickLogins = [
    { name: 'Admin (Nick Fury)', email: 'nick@slooze.xyz', role: 'admin', country: 'Global' },
    { name: 'Manager India (Captain Marvel)', email: 'marvel@slooze.xyz', role: 'manager', country: 'India' },
    { name: 'Manager America (Captain America)', email: 'america@slooze.xyz', role: 'manager', country: 'America' },
    { name: 'Member India (Thanos)', email: 'thanos@slooze.xyz', role: 'member', country: 'India' },
    { name: 'Member America (Travis)', email: 'travis@slooze.xyz', role: 'member', country: 'America' },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data } = await api.post('/auth/login', { email, password });
      
      if (data.success) {
        setAuth(data.data.user, data.data.token);
        toast.success(`Welcome back, ${data.data.user.name}!`);
        navigate('/dashboard');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const quickLogin = (email) => {
    setEmail(email);
    setPassword('password123');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-pink-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8">
        {/* Left Side - Branding */}
        <div className="hidden md:flex flex-col justify-center space-y-6">
          <div className="flex items-center space-x-3">
            <div className="w-16 h-16 bg-gradient-to-br from-red-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-3xl">S</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Slooze</h1>
              <p className="text-gray-600">Food Delivery</p>
            </div>
          </div>
          
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-gray-900">
              Order your favorite food
            </h2>
            <p className="text-gray-600 text-lg">
              Access restaurants and place orders based on your role and location.
            </p>
          </div>

          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Browse Restaurants</h3>
                <p className="text-sm text-gray-600">Discover restaurants in your region</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Create Order</h3>
                <p className="text-sm text-gray-600">Add your favorite items to cart</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-red-600 font-semibold">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Checkout & Enjoy</h3>
                <p className="text-sm text-gray-600">Complete payment and track your order</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-red-600 to-pink-600 text-white py-3 rounded-lg font-semibold hover:from-red-700 hover:to-pink-700 transition flex items-center justify-center space-x-2 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="w-5 h-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">Quick Login (Demo)</span>
            </div>
          </div>

          <div className="space-y-2">
            {quickLogins.map((user) => (
              <button
                key={user.email}
                onClick={() => quickLogin(user.email)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition text-left"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-red-600 capitalize">{user.role}</p>
                    <p className="text-xs text-gray-500">{user.country}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>

          <p className="text-xs text-center text-gray-500">
            Default password: <span className="font-mono bg-gray-100 px-2 py-1 rounded">password123</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
