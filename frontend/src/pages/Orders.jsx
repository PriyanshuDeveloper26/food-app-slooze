import { useEffect, useState } from 'react';
import { Package, MapPin, Calendar, CreditCard, X, CheckCircle, Loader2 } from 'lucide-react';
import { useAuthStore } from '../store/authStore';
import api from '../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const Orders = () => {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);

  const canCheckout = user.role === 'admin' || user.role === 'manager';

  useEffect(() => {
    fetchOrders();
    if (canCheckout) {
      fetchPaymentMethods();
    }
  }, []);

  const fetchOrders = async () => {
    try {
      const { data } = await api.get('/orders');
      setOrders(data.data);
    } catch (error) {
      toast.error('Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const { data } = await api.get('/payment-methods');
      setPaymentMethods(data.data);
      const defaultMethod = data.data.find(pm => pm.isDefault);
      if (defaultMethod) {
        setSelectedPaymentMethod(defaultMethod._id);
      }
    } catch (error) {
      console.error('Failed to fetch payment methods');
    }
  };

  const handleCheckout = async (orderId) => {
    if (!selectedPaymentMethod) {
      toast.error('Please select a payment method');
      return;
    }

    setCheckoutLoading(true);
    try {
      const { data } = await api.put(`/orders/${orderId}/checkout`, {
        paymentMethodId: selectedPaymentMethod
      });

      if (data.success) {
        toast.success('Order paid successfully!');
        setOrders(orders.map(o => o._id === orderId ? data.data : o));
        setSelectedOrder(null);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to checkout order');
    } finally {
      setCheckoutLoading(false);
    }
  };

  const handleCancelOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return;
    }

    setCancelLoading(true);
    try {
      const { data } = await api.put(`/orders/${orderId}/cancel`);

      if (data.success) {
        toast.success('Order cancelled successfully');
        setOrders(orders.map(o => o._id === orderId ? data.data : o));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to cancel order');
    } finally {
      setCancelLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      confirmed: 'bg-blue-100 text-blue-800 border-blue-200',
      preparing: 'bg-purple-100 text-purple-800 border-purple-200',
      delivered: 'bg-green-100 text-green-800 border-green-200',
      cancelled: 'bg-red-100 text-red-800 border-red-200'
    };
    return colors[status] || 'bg-gray-100 text-gray-800 border-gray-200';
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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">{orders.length} total orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <Package className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No orders yet</h2>
            <p className="text-gray-600 mb-6">Start ordering from your favorite restaurants!</p>
            <button
              onClick={() => window.location.href = '/restaurants'}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-md overflow-hidden">
                {/* Order Header */}
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={order.restaurant?.image}
                        alt={order.restaurant?.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-gray-900 text-lg">{order.restaurant?.name}</h3>
                        <div className="flex items-center space-x-3 text-sm text-gray-600 mt-1">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(order.createdAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-4 h-4" />
                            <span>{order.country}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold text-gray-900">
                          {order.country === 'India' ? '₹' : '$'}{order.totalAmount}
                        </p>
                        <span className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="px-6 py-4">
                  <h4 className="font-semibold text-gray-900 mb-3">Order Items</h4>
                  <div className="space-y-2">
                    {order.items?.map((item, index) => (
                      <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                        <div className="flex items-center space-x-3">
                          <img
                            src={item.menuItem?.image}
                            alt={item.name}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <p className="font-medium text-gray-900">{item.name}</p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-semibold text-gray-900">
                          {order.country === 'India' ? '₹' : '$'}{item.price * item.quantity}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Delivery Address */}
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <div className="flex items-start space-x-2">
                    <MapPin className="w-5 h-5 text-gray-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">Delivery Address</p>
                      <p className="text-sm text-gray-600 mt-1">{order.deliveryAddress}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                {canCheckout && (
                  <>
                    {order.status === 'pending' && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-wrap gap-3">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center space-x-2"
                        >
                          <CreditCard className="w-4 h-4" />
                          <span>Checkout & Pay</span>
                        </button>
                        
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          disabled={cancelLoading}
                          className="flex-1 bg-gray-200 text-gray-700 px-4 py-2 rounded-lg font-semibold hover:bg-gray-300 transition flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel Order</span>
                        </button>
                      </div>
                    )}

                    {(order.status === 'confirmed' || order.status === 'preparing') && (
                      <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                        <button
                          onClick={() => handleCancelOrder(order._id)}
                          disabled={cancelLoading}
                          className="w-full bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition flex items-center justify-center space-x-2 disabled:opacity-50"
                        >
                          <X className="w-4 h-4" />
                          <span>Cancel Order</span>
                        </button>
                      </div>
                    )}
                  </>
                )}

                {order.paymentMethod && (
                  <>
                    {order.status === 'cancelled' ? (
                      <div className="px-6 py-4 bg-orange-50 border-t border-orange-200">
                        <div className="flex items-center space-x-2 text-orange-800">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium">Payment Refunded</span>
                        </div>
                      </div>
                    ) : (
                      <div className="px-6 py-4 bg-green-50 border-t border-green-200">
                        <div className="flex items-center space-x-2 text-green-800">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-medium">Payment Completed</span>
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Checkout Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Checkout Order</h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="mb-6">
                <p className="text-gray-600 mb-2">Order Total</p>
                <p className="text-3xl font-bold text-gray-900">
                  {selectedOrder.country === 'India' ? '₹' : '$'}{selectedOrder.totalAmount}
                </p>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Payment Method
                </label>
                
                {paymentMethods.length === 0 ? (
                  <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                    <p className="text-sm text-yellow-800">
                      No payment methods found. Please add a payment method first.
                    </p>
                    <button
                      onClick={() => window.location.href = '/payment-methods'}
                      className="mt-2 text-sm text-yellow-900 font-medium underline"
                    >
                      Add Payment Method
                    </button>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {paymentMethods.map((pm) => (
                      <label
                        key={pm._id}
                        className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition ${
                          selectedPaymentMethod === pm._id
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <input
                          type="radio"
                          name="paymentMethod"
                          value={pm._id}
                          checked={selectedPaymentMethod === pm._id}
                          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
                          className="w-4 h-4 text-red-600"
                        />
                        <div className="flex-1">
                          <p className="font-medium text-gray-900 capitalize">{pm.type.replace('_', ' ')}</p>
                          <p className="text-sm text-gray-600">
                            {pm.cardNumber || pm.upiId}
                          </p>
                        </div>
                        {pm.isDefault && (
                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">
                            Default
                          </span>
                        )}
                      </label>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleCheckout(selectedOrder._id)}
                  disabled={checkoutLoading || !selectedPaymentMethod}
                  className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {checkoutLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <span>Pay Now</span>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
