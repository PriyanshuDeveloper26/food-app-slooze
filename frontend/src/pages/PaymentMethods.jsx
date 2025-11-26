import { useEffect, useState } from 'react';
import { CreditCard, Plus, Edit2, Trash2, X, Loader2 } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMethod, setEditingMethod] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    type: 'credit_card',
    cardNumber: '',
    cardHolderName: '',
    expiryDate: '',
    upiId: '',
    isDefault: false
  });

  useEffect(() => {
    fetchPaymentMethods();
  }, []);

  const fetchPaymentMethods = async () => {
    try {
      const { data } = await api.get('/payment-methods');
      setPaymentMethods(data.data);
    } catch (error) {
      toast.error('Failed to fetch payment methods');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);

    try {
      if (editingMethod) {
        const { data } = await api.put(`/payment-methods/${editingMethod._id}`, formData);
        if (data.success) {
          toast.success('Payment method updated successfully');
          setPaymentMethods(paymentMethods.map(pm => 
            pm._id === editingMethod._id ? data.data : pm
          ));
        }
      } else {
        const { data } = await api.post('/payment-methods', formData);
        if (data.success) {
          toast.success('Payment method added successfully');
          setPaymentMethods([...paymentMethods, data.data]);
        }
      }
      
      closeModal();
    } catch (error) {
      toast.error(error.response?.data?.message || 'Operation failed');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this payment method?')) {
      return;
    }

    try {
      await api.delete(`/payment-methods/${id}`);
      toast.success('Payment method deleted successfully');
      setPaymentMethods(paymentMethods.filter(pm => pm._id !== id));
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to delete payment method');
    }
  };

  const openAddModal = () => {
    setEditingMethod(null);
    setFormData({
      type: 'credit_card',
      cardNumber: '',
      cardHolderName: '',
      expiryDate: '',
      upiId: '',
      isDefault: false
    });
    setShowModal(true);
  };

  const openEditModal = (method) => {
    setEditingMethod(method);
    setFormData({
      type: method.type,
      cardNumber: '',
      cardHolderName: method.cardHolderName || '',
      expiryDate: method.expiryDate || '',
      upiId: method.upiId || '',
      isDefault: method.isDefault
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingMethod(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Payment Methods</h1>
            <p className="text-gray-600 mt-2">Manage your payment methods</p>
          </div>
          <button
            onClick={openAddModal}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-red-700 transition flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add New</span>
          </button>
        </div>

        {paymentMethods.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <CreditCard className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">No payment methods</h2>
            <p className="text-gray-600 mb-6">Add a payment method to checkout orders</p>
            <button
              onClick={openAddModal}
              className="bg-red-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-700 transition"
            >
              Add Payment Method
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div key={method._id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="flex items-center space-x-2">
                        <h3 className="font-bold text-gray-900 capitalize">
                          {method.type.replace('_', ' ')}
                        </h3>
                        {method.isDefault && (
                          <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                            Default
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mt-1">
                        {method.cardNumber && `${method.cardHolderName} • ${method.cardNumber}`}
                        {method.upiId && method.upiId}
                      </p>
                      {method.expiryDate && (
                        <p className="text-gray-500 text-xs mt-1">
                          Expires: {method.expiryDate}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => openEditModal(method)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                    >
                      <Edit2 className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDelete(method._id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add/Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full p-6 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  {editingMethod ? 'Edit Payment Method' : 'Add Payment Method'}
                </h2>
                <button
                  onClick={closeModal}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Payment Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                    required
                  >
                    <option value="credit_card">Credit Card</option>
                    <option value="debit_card">Debit Card</option>
                    <option value="upi">UPI</option>
                    <option value="paypal">PayPal</option>
                    <option value="net_banking">Net Banking</option>
                  </select>
                </div>

                {(formData.type === 'credit_card' || formData.type === 'debit_card') && (
                  <>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Number
                      </label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                        placeholder="1234 5678 9012 3456"
                        maxLength="16"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Card Holder Name
                      </label>
                      <input
                        type="text"
                        value={formData.cardHolderName}
                        onChange={(e) => setFormData({ ...formData, cardHolderName: e.target.value })}
                        placeholder="John Doe"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={formData.expiryDate}
                        onChange={(e) => setFormData({ ...formData, expiryDate: e.target.value })}
                        placeholder="MM/YY"
                        maxLength="5"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                        required
                      />
                    </div>
                  </>
                )}

                {formData.type === 'upi' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      UPI ID
                    </label>
                    <input
                      type="text"
                      value={formData.upiId}
                      onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                      placeholder="username@upi"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                      required
                    />
                  </div>
                )}

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isDefault"
                    checked={formData.isDefault}
                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                    className="w-4 h-4 text-red-600 rounded focus:ring-red-500"
                  />
                  <label htmlFor="isDefault" className="text-sm text-gray-700">
                    Set as default payment method
                  </label>
                </div>

                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="flex-1 bg-gray-200 text-gray-700 px-4 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formLoading}
                    className="flex-1 bg-red-600 text-white px-4 py-3 rounded-lg font-semibold hover:bg-red-700 transition disabled:opacity-50 flex items-center justify-center space-x-2"
                  >
                    {formLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Saving...</span>
                      </>
                    ) : (
                      <span>{editingMethod ? 'Update' : 'Add'}</span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentMethods;
