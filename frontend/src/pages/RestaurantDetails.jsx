import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Star, Clock, MapPin, ArrowLeft, Plus, Check, Leaf } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { useCartStore } from '../store/cartStore';

const RestaurantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [restaurant, setRestaurant] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const { addItem, items: cartItems } = useCartStore();

  useEffect(() => {
    fetchRestaurantDetails();
  }, [id]);

  const fetchRestaurantDetails = async () => {
    try {
      const [restaurantRes, menuRes] = await Promise.all([
        api.get(`/restaurants/${id}`),
        api.get(`/restaurants/${id}/menu`)
      ]);

      setRestaurant(restaurantRes.data.data);
      setMenuItems(menuRes.data.data);
    } catch (error) {
      toast.error('Failed to fetch restaurant details');
      navigate('/restaurants');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    addItem(item, restaurant);
    toast.success(`${item.name} added to cart!`);
  };

  const isInCart = (itemId) => {
    return cartItems.some(item => item._id === itemId);
  };

  const categories = ['all', ...new Set(menuItems.map(item => item.category))];
  const filteredMenuItems = selectedCategory === 'all'
    ? menuItems
    : menuItems.filter(item => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  if (!restaurant) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Image */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        <img
          src={restaurant.image}
          alt={restaurant.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        
        <button
          onClick={() => navigate('/restaurants')}
          className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm p-2 rounded-full hover:bg-white transition"
        >
          <ArrowLeft className="w-6 h-6 text-gray-900" />
        </button>

        <div className="absolute bottom-6 left-4 right-4 text-white">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{restaurant.name}</h1>
          <p className="text-white/90 mb-3">{restaurant.description}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center space-x-1">
              <Star className="w-5 h-5 text-yellow-400 fill-current" />
              <span className="font-semibold">{restaurant.rating}</span>
            </div>
            <div className="flex items-center space-x-1">
              <Clock className="w-5 h-5" />
              <span>{restaurant.deliveryTime}</span>
            </div>
            <div className="flex items-center space-x-1">
              <MapPin className="w-5 h-5" />
              <span>{restaurant.country}</span>
            </div>
            <span className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
              {restaurant.cuisine}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-8 overflow-x-auto">
          <div className="flex space-x-2 min-w-max">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition whitespace-nowrap ${
                  selectedCategory === category
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {category === 'all' ? 'All Items' : category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Menu ({filteredMenuItems.length} items)
          </h2>

          {filteredMenuItems.length === 0 ? (
            <div className="bg-white rounded-xl shadow-md p-12 text-center">
              <p className="text-gray-600">No items found in this category</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredMenuItems.map((item) => (
                <div
                  key={item._id}
                  className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="flex">
                    <div className="flex-1 p-5">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                            {item.isVeg && (
                              <div className="flex items-center space-x-1 text-green-600">
                                <Leaf className="w-4 h-4 fill-current" />
                              </div>
                            )}
                          </div>
                          <p className="text-sm text-gray-600 line-clamp-2">{item.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4">
                        <div>
                          <p className="text-2xl font-bold text-gray-900">
                            {restaurant.country === 'India' ? '₹' : '$'}{item.price}
                          </p>
                          <span className="text-xs text-gray-500 capitalize">{item.category}</span>
                        </div>

                        <button
                          onClick={() => handleAddToCart(item)}
                          className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium transition ${
                            isInCart(item._id)
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-600 text-white hover:bg-red-700'
                          }`}
                        >
                          {isInCart(item._id) ? (
                            <>
                              <Check className="w-4 h-4" />
                              <span className="text-sm">Added</span>
                            </>
                          ) : (
                            <>
                              <Plus className="w-4 h-4" />
                              <span className="text-sm">Add</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>

                    <div className="w-32 h-full flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sticky Cart Button */}
        {cartItems.length > 0 && (
          <div className="fixed bottom-4 right-4 z-50">
            <button
              onClick={() => navigate('/cart')}
              className="bg-red-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-red-700 transition flex items-center space-x-2"
            >
              <span className="font-semibold">View Cart</span>
              <span className="bg-white text-red-600 px-2 py-1 rounded-full text-sm font-bold">
                {cartItems.length}
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RestaurantDetails;
