import Image from 'next/image';

const services = [
  { 
    label: 'Spanduk & Billboard',
    description: 'Media promosi outdoor berukuran besar dengan kualitas tahan cuaca',
    icon: '🏢'
  },
  { 
    label: 'Neon Box & Huruf Timbul', 
    active: true,
    description: 'Signage premium dengan pencahayaan LED untuk visibilitas maksimal',
    icon: '💡'
  },
  { 
    label: 'Sticker & Label',
    description: 'Stiker custom dengan berbagai bahan dan finishing',
    icon: '🏷️'
  },
  { 
    label: 'Papan Merk & Wayfinding',
    description: 'Sistem navigasi dan identitas brand yang profesional',
    icon: '🧭'
  },
  { 
    label: 'Digital & Offset Print',
    description: 'Layanan cetak digital dan offset dengan kualitas tinggi',
    icon: '🖨️'
  },
  { 
    label: 'Merch & Plakat',
    description: 'Merchandise dan plakat custom untuk berbagai kebutuhan',
    icon: '🏆'
  },
];

export default function Services() {
  return (
    <section className="bg-gray-50 px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 lg:mb-16">
          <div className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-semibold mb-4">
            🎯 Layanan Profesional
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 mb-4 lg:mb-6">Layanan Kami</h2>
          <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed px-4 sm:px-0">
            Kami memproduksi materi promosi yang tahan lama dan sedap dilihat—dengan presisi warna dan
            finishing yang bersih untuk semua kebutuhan advertising Anda.
          </p>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
          {/* Left list */}
          <div className="space-y-3 sm:space-y-4">
            {services.map((item, index) => (
              <div 
                key={item.label} 
                className={`group p-4 sm:p-6 rounded-xl sm:rounded-2xl transition-all duration-300 cursor-pointer ${
                  item.active 
                    ? 'bg-blue-600 text-white shadow-xl transform scale-105' 
                    : 'bg-white hover:bg-blue-50 shadow-md hover:shadow-lg hover:transform hover:scale-102'
                }`}
              >
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className={`text-xl sm:text-2xl p-2 sm:p-3 rounded-lg sm:rounded-xl flex-shrink-0 ${
                    item.active 
                      ? 'bg-white/20' 
                      : 'bg-blue-100 group-hover:bg-blue-200'
                  }`}>
                    {item.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg sm:text-xl font-bold mb-1 sm:mb-2 ${
                      item.active ? 'text-white' : 'text-gray-900'
                    }`}>
                      {item.label}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      item.active ? 'text-blue-100' : 'text-gray-600'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                  <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                    item.active ? 'bg-white' : 'bg-blue-600 opacity-0 group-hover:opacity-100'
                  } transition-opacity duration-300`}></div>
                </div>
              </div>
            ))}
          </div>

          {/* Right image and description */}
          <div className="space-y-6 lg:space-y-8 order-first lg:order-last">
            <div className="relative w-full h-64 sm:h-80 lg:h-96 rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl group">
              <Image
                src="/layanan.png"
                alt="Contoh Layanan Pinang Advertising"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-white">
                <h3 className="text-lg sm:text-2xl font-bold mb-1 sm:mb-2">Neon Box & Huruf Timbul</h3>
                <p className="text-blue-100 text-sm sm:text-base">Signage premium dengan kualitas terbaik</p>
              </div>
            </div>
            
            <div className="bg-white p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-lg">
              <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 sm:mb-4">Mengapa Memilih Layanan Kami?</h4>
              <div className="space-y-2 sm:space-y-3">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm sm:text-base">Kualitas material premium dan tahan lama</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm sm:text-base">Proses produksi cepat dan tepat waktu</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm sm:text-base">Tim profesional berpengalaman 10+ tahun</span>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                  <span className="text-gray-700 text-sm sm:text-base">Layanan instalasi dan maintenance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}