import Image from 'next/image';

export default function Hero() {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-white py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-6 lg:space-y-10 text-center lg:text-left">
            <div className="space-y-6 lg:space-y-8">
              <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-semibold">
                ✨ Solusi Advertising Terpercaya
              </div>
              
              <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight">
                Cetak & Pasang{' '}
                <span className="text-blue-600 relative block sm:inline">
                  Pinang Advertising
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 sm:h-1 bg-blue-200 rounded-full"></div>
                </span>{' '}
                <span className="block sm:inline">yang Bicara</span>
              </h1>
              
              <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Indoor & outdoor printing cepat, rapi, dan tepat waktu. Dari brief sampai instalasi, 
                kami tangani end-to-end dengan kualitas terbaik.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                <button className="bg-blue-600 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 w-full sm:w-auto">
                  Hubungi Kami Sekarang
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 w-full sm:w-auto">
                  Lihat Portfolio
                </button>
              </div>
            </div>
            
            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 pt-6 lg:pt-8 border-t border-gray-200">
              <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-gray-900 font-semibold block text-sm sm:text-base">A3+ bisa ditunggu</span>
                  <span className="text-gray-500 text-xs sm:text-sm">Cetak cepat</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17v4a2 2 0 002 2h4M13 13h4a2 2 0 012 2v4a2 2 0 01-2 2h-4m-6-4a2 2 0 01-2-2V9a2 2 0 012-2h2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-gray-900 font-semibold block text-sm sm:text-base">Warna terkalibrasi</span>
                  <span className="text-gray-500 text-xs sm:text-sm">Hasil akurat</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 sm:col-span-1 col-span-1">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div className="min-w-0">
                  <span className="text-gray-900 font-semibold block text-sm sm:text-base">Instalasi di lokasi</span>
                  <span className="text-gray-500 text-xs sm:text-sm">End-to-end</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right Image */}
          <div className="relative order-first lg:order-last">
            <div className="relative w-full h-64 sm:h-80 lg:h-96 xl:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/hero.png"
                alt="Pinang Advertising Printing Machine"
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Decorative elements */}
            <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-16 h-16 sm:w-24 sm:h-24 bg-blue-100 rounded-full opacity-20"></div>
            <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-12 h-12 sm:w-16 sm:h-16 bg-blue-200 rounded-full opacity-30"></div>
          </div>
        </div>
      </div>
    </section>
  );
}