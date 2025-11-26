import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogIn, Loader2, Mail, Lock, ChefHat, Sparkles, Shield, Globe, User } from 'lucide-react';
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
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-6xl w-full grid md:grid-cols-2 gap-8 relative z-10">
        {/* Left Side - Branding */}
        <div className="hidden md:flex flex-col justify-center space-y-8 animate-fade-in">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 via-pink-500 to-orange-500 rounded-3xl flex items-center justify-center shadow-2xl transform hover:scale-110 transition-transform duration-300">
                <ChefHat className="w-10 h-10 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center shadow-lg">
                <Sparkles className="w-4 h-4 text-white" />
              </div>
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">Slooze</h1>
              <p className="text-gray-600 text-lg font-medium">Delicious Food, Fast Delivery</p>
            </div>
          </div>
          
          <div className="space-y-4 bg-white/40 backdrop-blur-sm rounded-2xl p-6 border border-white/60">
            <h2 className="text-3xl font-bold text-gray-900">
              🍕 Order your favorite food
            </h2>
            <p className="text-gray-700 text-lg leading-relaxed">
              Access restaurants and place orders based on your role and location. Experience seamless food delivery at your fingertips.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-start space-x-4 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/60 hover:bg-white/70 transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold text-xl">1</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Browse Restaurants</h3>
                <p className="text-sm text-gray-600">Discover amazing restaurants in your region</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/60 hover:bg-white/70 transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold text-xl">2</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Create Order</h3>
                <p className="text-sm text-gray-600">Add your favorite items to cart easily</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-white/60 hover:bg-white/70 transition-all duration-300 transform hover:scale-105">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <span className="text-white font-bold text-xl">3</span>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 text-lg">Checkout & Enjoy</h3>
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
