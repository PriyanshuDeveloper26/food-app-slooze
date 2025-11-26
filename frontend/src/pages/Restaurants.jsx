import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, MapPin, Search } from 'lucide-react';
import api from '../utils/api';
import toast from 'react-hot-toast';
import LoadingSpinner from '../components/LoadingSpinner';
import { useAuthStore } from '../store/authStore';

const Restaurants = () => {
  const { user } = useAuthStore();
  const [restaurants, setRestaurants] = useState([]);
  const [filteredRestaurants, setFilteredRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('all');

  useEffect(() => {
    fetchRestaurants();
  }, []);

  useEffect(() => {
    filterRestaurants();
  }, [searchQuery, selectedCuisine, restaurants]);

  const fetchRestaurants = async () => {
    try {
      const { data } = await api.get('/restaurants');
      setRestaurants(data.data);
      setFilteredRestaurants(data.data);
    } catch (error) {
      toast.error('Failed to fetch restaurants');
    } finally {
      setLoading(false);
    }
  };

  const filterRestaurants = () => {
    let filtered = restaurants;

    if (searchQuery) {
      filtered = filtered.filter(restaurant =>
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCuisine !== 'all') {
      filtered = filtered.filter(restaurant =>
        restaurant.cuisine.toLowerCase() === selectedCuisine.toLowerCase()
      );
    }

    setFilteredRestaurants(filtered);
  };

  const cuisines = ['all', ...new Set(restaurants.map(r => r.cuisine))];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
        <LoadingSpinner size="xl" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Restaurants</h1>
          <div className="flex items-center space-x-2 mt-2 text-gray-600">
            <MapPin className="w-4 h-4" />
            <p>Available in {user.country}</p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search restaurants, cuisine..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
              />
            </div>

            {/* Cuisine Filter */}
            <select
              value={selectedCuisine}
              onChange={(e) => setSelectedCuisine(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent transition"
            >
              {cuisines.map((cuisine) => (
                <option key={cuisine} value={cuisine}>
                  {cuisine === 'all' ? 'All Cuisines' : cuisine}
                </option>
              ))}
            </select>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-gray-600">
              Showing {filteredRestaurants.length} of {restaurants.length} restaurants
            </p>
            {(searchQuery || selectedCuisine !== 'all') && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCuisine('all');
                }}
                className="text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Clear filters
              </button>
            )}
          </div>
        </div>

        {/* Restaurants Grid */}
        {filteredRestaurants.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-12 text-center">
            <p className="text-gray-600 text-lg">No restaurants found</p>
            <p className="text-gray-500 text-sm mt-2">Try adjusting your search or filters</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRestaurants.map((restaurant) => (
              <Link
                key={restaurant._id}
                to={`/restaurants/${restaurant._id}`}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={restaurant.image}
                    alt={restaurant.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 right-3 bg-white px-2 py-1 rounded-full shadow-md flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm font-semibold text-gray-900">{restaurant.rating}</span>
                  </div>
                </div>

                <div className="p-5">
                  <h3 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-red-600 transition">
                    {restaurant.name}
                  </h3>
                  
                  <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                    {restaurant.description}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-gray-600">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{restaurant.deliveryTime}</span>
                    </div>
                    <span className="text-xs font-medium bg-red-100 text-red-600 px-2 py-1 rounded-full">
                      {restaurant.cuisine}
                    </span>
                  </div>

                  <div className="mt-3 pt-3 border-t border-gray-200 flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-gray-500 text-xs">
                      <MapPin className="w-3 h-3" />
                      <span>{restaurant.country}</span>
                    </div>
                    <span className="text-red-600 font-medium text-sm group-hover:underline">
                      View Menu →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Restaurants;
