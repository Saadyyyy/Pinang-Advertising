'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchCategories, fetchPortfolio, Category, type Portfolio } from '@/lib/api';

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [categories, setCategories] = useState<Category[]>([]);
  const [portfolioData, setPortfolioData] = useState<Portfolio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [showMore, setShowMore] = useState(false);

  // Load categories on component mount
  useEffect(() => {
    const loadCategories = async () => {
      try {
        const categoriesData = await fetchCategories();
        setCategories(categoriesData);
      } catch (err) {
        console.error('Error loading categories:', err);
        setError('Gagal memuat kategori');
      }
    };

    loadCategories();
  }, []);

  // Load portfolio data when filter changes
  useEffect(() => {
    const loadPortfolio = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const result = await fetchPortfolio({
          category: activeFilter,
          limit: showMore ? undefined : 4, // Show 4 items initially, all when "show more" is clicked
          page: 1
        });
        
        setPortfolioData(result.data);
        setTotalPages(result.totalPages);
        setCurrentPage(result.page);
      } catch (err) {
        console.error('Error loading portfolio:', err);
        setError('Gagal memuat data portfolio');
      } finally {
        setLoading(false);
      }
    };

    loadPortfolio();
  }, [activeFilter, showMore]);

  const handleFilterChange = (category: string) => {
    setActiveFilter(category);
    setShowMore(false); // Reset show more when filter changes
  };

  const handleShowMore = () => {
    setShowMore(true);
  };

  // Create filter categories array with "All" option
  const filterCategories = ['All', ...categories.map(cat => cat.category)];

  if (error) {
    return (
      <section className="py-12 sm:py-16 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-red-600 text-lg">{error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 sm:py-16 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            📁 Portfolio
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
            Portofolio Kami
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto px-2">
            Lihat hasil karya terbaik kami untuk berbagai klien
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 sm:mb-12 px-2">
          {filterCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-3 py-2 sm:px-4 sm:py-3 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 ${
                activeFilter === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <p className="mt-2 text-gray-600">Memuat data...</p>
          </div>
        )}

        {/* Portfolio Grid */}
        {!loading && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
            {portfolioData.map((item) => (
              <div key={item.id} className="bg-white rounded-xl sm:rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <div className="aspect-video relative">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
                </div>
                <div className="p-4 sm:p-6 lg:p-8">
                  <div className="mb-2 sm:mb-3">
                    <span className="inline-block px-2 py-1 sm:px-3 sm:py-1 bg-blue-100 text-blue-800 text-xs sm:text-sm font-medium rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-2 sm:mb-3 lg:mb-4">
                    {item.title}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Show More Button */}
        {!loading && !showMore && portfolioData.length >= 4 && (
          <div className="text-center">
            <button 
              onClick={handleShowMore}
              className="bg-gray-900 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-full text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors duration-300 w-full sm:w-auto"
            >
              Tampilkan Lebih Banyak
            </button>
          </div>
        )}
      </div>
    </section>
  );
}