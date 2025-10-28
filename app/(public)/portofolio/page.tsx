'use client';

import { useState, useEffect } from 'react';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from 'next/image';

interface PortfolioItem {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
}

interface Category {
  id: number;
  category: string;
  created_at?: string;
}

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch categories
        const categoriesResponse = await fetch('/api/category');
        const categoriesData = await categoriesResponse.json();
        setCategories(categoriesData.data || []);

        // Fetch portfolios
        const portfoliosResponse = await fetch('/api/portfolio?limit=50');
        const portfoliosData = await portfoliosResponse.json();
        setPortfolios(portfoliosData.data || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredPortfolios = selectedCategory === 'all' 
    ? portfolios 
    : portfolios.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-0">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white pt-16 lg:pt-20 pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-6">
                🎨 Karya Terbaik Kami
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
                Portfolio Pinang Advertising
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Lihat berbagai proyek advertising yang telah kami kerjakan dengan kualitas terbaik 
                dan kepuasan klien yang maksimal.
              </p>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 bg-gray-50 border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                  selectedCategory === 'all'
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                }`}
              >
                Semua Kategori
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-200 ${
                    selectedCategory === category.category
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-blue-50 hover:text-blue-600'
                  }`}
                >
                  {category.category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Portfolio Grid */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="text-center py-16">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="mt-4 text-gray-600">Memuat portfolio...</p>
              </div>
            ) : (
              <>
                <div className="text-center mb-12">
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                    {selectedCategory === 'all' ? 'Semua Proyek' : selectedCategory}
                  </h2>
                  <p className="text-gray-600">
                    Menampilkan {filteredPortfolios.length} proyek
                  </p>
                </div>

                {filteredPortfolios.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {filteredPortfolios.map((item) => (
                      <div key={item.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                        <div className="relative h-64 overflow-hidden">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          <div className="absolute top-4 left-4">
                            <span className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                            {item.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed mb-4">
                            {item.description}
                          </p>
                          <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                            Lihat Detail
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🎨</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      Belum ada proyek untuk kategori ini
                    </h3>
                    <p className="text-gray-600">
                      Silakan pilih kategori lain atau lihat semua proyek kami.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Pencapaian Kami
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Kepercayaan klien adalah prioritas utama kami dalam setiap proyek yang dikerjakan.
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { number: '500+', label: 'Proyek Selesai', icon: '🎯' },
                { number: '300+', label: 'Klien Puas', icon: '😊' },
                { number: '5+', label: 'Tahun Pengalaman', icon: '⭐' },
                { number: '24/7', label: 'Support', icon: '🔧' }
              ].map((stat, index) => (
                <div key={index} className="text-center group">
                  <div className="text-4xl mb-4">{stat.icon}</div>
                  <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2 group-hover:text-blue-700 transition-colors">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Tertarik dengan Karya Kami?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
              Mari diskusikan proyek advertising Anda bersama tim profesional kami. 
              Wujudkan ide kreatif Anda menjadi kenyataan yang menakjubkan.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
                Konsultasi Gratis
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Lihat Layanan
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}