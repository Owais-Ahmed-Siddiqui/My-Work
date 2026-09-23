import { useState, useMemo } from 'react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

const ProductListing = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('newest');

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))];

  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
      })
      .sort((a, b) => {
        if (sortBy === 'price-low') return a.price - b.price;
        if (sortBy === 'price-high') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return 0; // 'newest' (default order)
      });
  }, [searchQuery, selectedCategory, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Explore Collection</h1>
          <p className="text-gray-500 mt-1">{filteredProducts.length} items found</p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none w-full md:w-64"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>

          {/* Sort */}
          <div className="relative flex items-center bg-white border border-gray-200 rounded-xl px-3 py-2">
            <SlidersHorizontal className="h-5 w-5 text-gray-400 mr-2" />
            <select 
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent outline-none text-gray-600 font-medium cursor-pointer"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Categories Sidebar */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 sticky top-24">
            <div className="flex items-center gap-2 mb-6">
              <Filter className="h-5 w-5 text-indigo-600" />
              <h2 className="font-bold text-gray-900">Categories</h2>
            </div>
            <div className="space-y-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-colors font-medium ${
                    selectedCategory === category
                      ? 'bg-indigo-600 text-white'
                      : 'text-gray-600 hover:bg-indigo-50 hover:text-indigo-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="flex-grow">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-gray-200">
              <div className="mx-auto bg-gray-50 h-20 w-20 rounded-full flex items-center justify-center mb-4">
                <Search className="h-10 w-10 text-gray-300" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">No products found</h3>
              <p className="text-gray-500 mt-2">Try adjusting your filters or search terms.</p>
              <button 
                onClick={() => { setSearchQuery(''); setSelectedCategory('All'); }}
                className="mt-6 text-indigo-600 font-bold underline"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductListing;
