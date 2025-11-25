import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, ShoppingCart, User, Home, Store, Package, CreditCard } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import { useCartStore } from '../store/cartStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  const { getItemCount } = useCartStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const cartCount = getItemCount();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-pink-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">S</span>
              </div>
              <span className="font-bold text-xl text-gray-900">Slooze</span>
            </Link>

            <div className="hidden md:flex space-x-1">
              <Link
                to="/dashboard"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/dashboard')
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </Link>

              <Link
                to="/restaurants"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/restaurants') || location.pathname.startsWith('/restaurants/')
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Store className="w-4 h-4" />
                <span>Restaurants</span>
              </Link>

              <Link
                to="/orders"
                className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  isActive('/orders')
                    ? 'bg-red-50 text-red-600'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Package className="w-4 h-4" />
                <span>Orders</span>
              </Link>

              {user?.role === 'admin' && (
                <Link
                  to="/payment-methods"
                  className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/payment-methods')
                      ? 'bg-red-50 text-red-600'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Payments</span>
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ShoppingCart className="w-6 h-6" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            <div className="flex items-center space-x-3 pl-4 border-l border-gray-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500 capitalize">{user?.role} • {user?.country}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="w-5 h-5 text-white" />
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-full transition-colors"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-gray-200 px-4 py-2">
        <div className="flex justify-around">
          <Link
            to="/dashboard"
            className={`flex flex-col items-center py-2 px-3 rounded-lg ${
              isActive('/dashboard') ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            <Home className="w-5 h-5" />
            <span className="text-xs mt-1">Home</span>
          </Link>

          <Link
            to="/restaurants"
            className={`flex flex-col items-center py-2 px-3 rounded-lg ${
              isActive('/restaurants') || location.pathname.startsWith('/restaurants/')
                ? 'text-red-600'
                : 'text-gray-600'
            }`}
          >
            <Store className="w-5 h-5" />
            <span className="text-xs mt-1">Restaurants</span>
          </Link>

          <Link
            to="/orders"
            className={`flex flex-col items-center py-2 px-3 rounded-lg ${
              isActive('/orders') ? 'text-red-600' : 'text-gray-600'
            }`}
          >
            <Package className="w-5 h-5" />
            <span className="text-xs mt-1">Orders</span>
          </Link>

          {user?.role === 'admin' && (
            <Link
              to="/payment-methods"
              className={`flex flex-col items-center py-2 px-3 rounded-lg ${
                isActive('/payment-methods') ? 'text-red-600' : 'text-gray-600'
              }`}
            >
              <CreditCard className="w-5 h-5" />
              <span className="text-xs mt-1">Payments</span>
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
