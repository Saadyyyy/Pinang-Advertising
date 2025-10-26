'use client';

import { useState } from 'react';
import Image from 'next/image';

const portfolioData = [
  {
    id: 1,
    title: 'Cafe Nusantara - Neon Box',
    description: 'Neon box identitas fasad dengan tampilan bersih dan konsisten warna. Terpasang rapi dengan label tersembunyi sehingga brand terlihat terang dan elegan.',
    image: '/hero.png', // Using placeholder image
    category: 'Neon Box & Huruf Timbul'
  },
  {
    id: 2,
    title: 'PT Maju Jaya - Billboard',
    description: 'Billboard kampanye di titik lalu lintas padat. Visual kuat, mudah dibaca dari jauh, dan tetap terlihat jelas siang maupun malam untuk memaksimalkan eksposur merek.',
    image: '/layanan.png', // Using placeholder image
    category: 'Spanduk & Billboard'
  },
  {
    id: 3,
    title: 'Toko Modern - Sticker Label',
    description: 'Sticker label produk dengan finishing glossy dan tahan air. Desain menarik dengan warna cerah untuk meningkatkan daya tarik produk di rak.',
    image: '/hero.png',
    category: 'Sticker & Label'
  },
  {
    id: 4,
    title: 'Restaurant Chain - Papan Merk',
    description: 'Papan merk outdoor dengan material tahan cuaca. Desain konsisten dengan brand identity dan mudah terlihat dari berbagai sudut.',
    image: '/layanan.png',
    category: 'Papan Merk & Wayfinding'
  }
];

const filterCategories = [
  'All',
  'Spanduk & Billboard',
  'Neon Box & Huruf Timbul',
  'Sticker & Label',
  'Papan Merk & Wayfinding',
  'Digital & Offset Print'
];

export default function Portfolio() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredPortfolio = activeFilter === 'All' 
    ? portfolioData 
    : portfolioData.filter(item => item.category === activeFilter);

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
              onClick={() => setActiveFilter(category)}
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

        {/* Portfolio Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
          {filteredPortfolio.map((item) => (
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

        {/* Show More Button */}
        <div className="text-center">
          <button className="bg-gray-900 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl sm:rounded-full text-sm sm:text-base font-medium hover:bg-gray-800 transition-colors duration-300 w-full sm:w-auto">
            Tampilkan Lebih Banyak
          </button>
        </div>
      </div>
    </section>
  );
}