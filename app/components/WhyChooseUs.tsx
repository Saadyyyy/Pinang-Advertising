import Image from 'next/image';

export default function WhyChooseUs() {
  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-white">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-semibold mb-3 sm:mb-4">
            ⭐ Keunggulan Kami
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
            Kenapa Pilih Kami?
          </h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Komitmen kami terhadap kualitas dan kepuasan pelanggan menjadikan kami pilihan terbaik untuk kebutuhan advertising Anda.
          </p>
        </div>

        {/* Grid Layout - Single column on mobile, 2 columns on larger screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
          {/* Warna Akurat Card */}
          <div className="group bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white hover:shadow-2xl transition-all duration-500 relative overflow-hidden min-h-[240px] sm:min-h-[280px] hover:transform hover:scale-105">
            <div className="relative h-full z-10">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Warna Akurat</h3>
              </div>
              <p className="text-blue-100 text-sm sm:text-base leading-relaxed pr-4 sm:pr-8 mb-4 sm:mb-6">
                Workflow terkelola warna dari file hingga mesin, disertai color proof sebelum cetak massal. Hasil konsisten di setiap batch dan media.
              </p>
              <div className="flex items-center gap-2 text-white/80">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs sm:text-sm font-medium">Color Management System</span>
              </div>
            </div>
            <div className="absolute right-4 top-4 sm:right-6 sm:top-6 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              <Image
                src="/warna-akurat.png"
                alt="Warna Akurat"
                width={100}
                height={100}
                className="sm:w-[140px] sm:h-[140px] object-contain drop-shadow-lg"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>

          {/* Cepat & Tepat Card */}
          <div className="group bg-gradient-to-br from-green-600 to-green-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white hover:shadow-2xl transition-all duration-500 relative overflow-hidden min-h-[240px] sm:min-h-[280px] hover:transform hover:scale-105">
            <div className="relative h-full z-10">
              <div className="flex items-center gap-3 mb-4 sm:mb-6">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold">Cepat & Tepat</h3>
              </div>
              <p className="text-green-100 text-sm sm:text-base leading-relaxed pr-4 sm:pr-8 mb-4 sm:mb-6">
                Same-day print untuk A3+, lead time jelas untuk proyek besar. Sistem produksi yang efisien untuk memenuhi deadline ketat Anda.
              </p>
              <div className="flex items-center gap-2 text-white/80">
                <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs sm:text-sm font-medium">Express Service Available</span>
              </div>
            </div>
            <div className="absolute right-4 top-4 sm:right-6 sm:top-6 opacity-90 group-hover:opacity-100 transition-opacity duration-300">
              <Image
                src="/cepat-tepat.png"
                alt="Cepat & Tepat"
                width={100}
                height={100}
                className="sm:w-[140px] sm:h-[140px] object-contain drop-shadow-lg"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Instalasi Rapi Card - Full width at bottom */}
        <div className="w-full">
          <div className="group bg-gradient-to-r from-purple-600 to-purple-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 text-white hover:shadow-2xl transition-all duration-500 hover:transform hover:scale-102">
            <div className="flex flex-col lg:flex-row items-center gap-6 sm:gap-8">
              {/* Left side - Two person image */}
              <div className="flex-shrink-0 w-full lg:w-auto">
                <div className="relative max-w-sm mx-auto lg:max-w-none">
                  <Image
                    src="/two-person.png"
                    alt="Tim Instalasi"
                    width={280}
                    height={200}
                    className="w-full h-auto lg:w-[280px] lg:h-[200px] object-cover rounded-xl sm:rounded-2xl shadow-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 to-transparent rounded-xl sm:rounded-2xl"></div>
                </div>
              </div>
              
              {/* Right side - Content */}
              <div className="flex-1 text-center lg:text-left">
                <div className="flex items-center justify-center lg:justify-start gap-3 mb-4 sm:mb-6">
                  <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 bg-white rounded-full"></div>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold">Instalasi Rapi</h3>
                </div>
                <p className="text-purple-100 text-sm sm:text-base lg:text-lg leading-relaxed mb-4 sm:mb-6 max-w-2xl mx-auto lg:mx-0">
                  Tim berpengalaman dengan peralatan lengkap untuk instalasi outdoor dan indoor. 
                  Hasil rapi, aman, dan sesuai regulasi. Garansi instalasi dan maintenance berkala.
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start gap-2 sm:gap-4">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-full">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs sm:text-sm font-medium">Tim Profesional</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-full">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs sm:text-sm font-medium">Garansi Instalasi</span>
                  </div>
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-2 sm:px-4 sm:py-2 rounded-full">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-xs sm:text-sm font-medium">Maintenance</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}