import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Store, Package, CreditCard, TrendingUp, MapPin, User2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import api from '../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuthStore();
  const [stats, setStats] = useState({
    restaurants: 0,
    orders: 0,
    paymentMethods: 0
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const [restaurantsRes, ordersRes, paymentsRes] = await Promise.all([
        api.get('/restaurants'),
        api.get('/orders'),
        user.role === 'admin' ? api.get('/payment-methods') : Promise.resolve({ data: { count: 0 } })
      ]);

      setStats({
        restaurants: restaurantsRes.data.count,
        orders: ordersRes.data.count,
        paymentMethods: paymentsRes.data.count || 0
      });

      setRecentOrders(ordersRes.data.data.slice(0, 5));
    } catch (error) {
      toast.error('Failed to fetch dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      preparing: 'bg-purple-100 text-purple-800',
      delivered: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back, {user.name}! 👋
          </h1>
          <p className="text-gray-600 mt-2">
            Here's what's happening with your food orders today.
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-2xl shadow-lg p-6 mb-8 text-white">
          <div className="flex items-center justify-between">
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <User2 className="w-6 h-6" />
                <span className="text-lg font-semibold">{user.name}</span>
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-1">
                  <span className="opacity-90">Role:</span>
                  <span className="font-semibold capitalize">{user.role}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="w-4 h-4" />
                  <span className="font-semibold">{user.country}</span>
                </div>
              </div>
              <p className="text-sm opacity-90">{user.email}</p>
            </div>
            <div className="hidden sm:block">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <User2 className="w-10 h-10" />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            to="/restaurants"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Restaurants</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.restaurants}</p>
                <p className="text-sm text-gray-500 mt-1">Available to order</p>
              </div>
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                <Store className="w-6 h-6 text-red-600" />
              </div>
            </div>
          </Link>

          <Link
            to="/orders"
            className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 text-sm font-medium">Total Orders</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats.orders}</p>
                <p className="text-sm text-gray-500 mt-1">Your order history</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Package className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </Link>

          {user.role === 'admin' && (
            <Link
              to="/payment-methods"
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Payment Methods</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{stats.paymentMethods}</p>
                  <p className="text-sm text-gray-500 mt-1">Saved methods</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </Link>
          )}

          {user.role !== 'admin' && (
            <div className="bg-white rounded-xl shadow-md p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Your Region</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">{user.country}</p>
                  <p className="text-sm text-gray-500 mt-1">Access restricted</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Link
              to="/restaurants"
              className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition"
            >
              <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                <Store className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">Browse Restaurants</p>
                <p className="text-xs text-gray-500">Discover new places</p>
              </div>
            </Link>

            <Link
              to="/orders"
              className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition"
            >
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Package className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="font-semibold text-gray-900">View Orders</p>
                <p className="text-xs text-gray-500">Track your orders</p>
              </div>
            </Link>

            {user.role === 'admin' && (
              <Link
                to="/payment-methods"
                className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition"
              >
                <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                  <CreditCard className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Manage Payments</p>
                  <p className="text-xs text-gray-500">Add payment methods</p>
                </div>
              </Link>
            )}
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white rounded-xl shadow-md p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Recent Orders</h2>
            <Link to="/orders" className="text-red-600 hover:text-red-700 text-sm font-medium">
              View All
            </Link>
          </div>

          {recentOrders.length === 0 ? (
            <div className="text-center py-8">
              <Package className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-600">No orders yet</p>
              <Link to="/restaurants" className="text-red-600 hover:text-red-700 text-sm font-medium mt-2 inline-block">
                Start ordering now
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order._id} className="border border-gray-200 rounded-lg p-4 hover:border-red-500 transition">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <img
                        src={order.restaurant?.image}
                        alt={order.restaurant?.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div>
                        <p className="font-semibold text-gray-900">{order.restaurant?.name}</p>
                        <p className="text-sm text-gray-500">{order.items?.length} items</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-900">₹{order.totalAmount}</p>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500">
                    {new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Role-based Access Info */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h3 className="font-semibold text-blue-900 mb-2">Your Access Level</h3>
          <div className="space-y-2 text-sm">
            <p className="text-blue-800">
              ✅ View restaurants & menu items
            </p>
            <p className="text-blue-800">
              ✅ Create orders (add food items)
            </p>
            {(user.role === 'admin' || user.role === 'manager') && (
              <>
                <p className="text-blue-800">
                  ✅ Checkout & pay for orders
                </p>
                <p className="text-blue-800">
                  ✅ Cancel orders
                </p>
              </>
            )}
            {user.role === 'admin' && (
              <p className="text-blue-800">
                ✅ Add & modify payment methods
              </p>
            )}
            {user.role === 'member' && (
              <p className="text-gray-600">
                ❌ Checkout & payment (Manager/Admin only)
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
