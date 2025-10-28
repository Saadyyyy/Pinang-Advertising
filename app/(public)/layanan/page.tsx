import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from 'next/image';

const services = [
  { 
    label: 'Spanduk & Billboard',
    description: 'Media promosi outdoor berukuran besar dengan kualitas tahan cuaca. Cocok untuk promosi event, grand opening, atau branding perusahaan.',
    icon: '🏢',
    features: ['Bahan berkualitas tinggi', 'Tahan cuaca ekstrem', 'Desain custom', 'Pemasangan profesional']
  },
  { 
    label: 'Neon Box & Huruf Timbul', 
    description: 'Signage premium dengan pencahayaan LED untuk visibilitas maksimal 24 jam. Memberikan kesan profesional dan modern.',
    icon: '💡',
    features: ['LED berkualitas tinggi', 'Hemat energi', 'Tahan lama', 'Desain elegan']
  },
  { 
    label: 'Sticker & Label',
    description: 'Stiker custom dengan berbagai bahan dan finishing. Dari stiker promosi hingga label produk profesional.',
    icon: '🏷️',
    features: ['Berbagai jenis bahan', 'Waterproof', 'Cutting precision', 'Finishing glossy/matte']
  },
  { 
    label: 'Papan Merk & Wayfinding',
    description: 'Sistem navigasi dan identitas brand yang profesional. Membantu customer menemukan lokasi dengan mudah.',
    icon: '🧭',
    features: ['Desain informatif', 'Material premium', 'Mudah dibaca', 'Instalasi rapi']
  },
  { 
    label: 'Digital & Offset Print',
    description: 'Layanan cetak digital dan offset dengan kualitas tinggi untuk berbagai kebutuhan promosi dan dokumentasi.',
    icon: '🖨️',
    features: ['Resolusi tinggi', 'Warna akurat', 'Berbagai ukuran', 'Finishing profesional']
  },
  { 
    label: 'Merch & Plakat',
    description: 'Merchandise dan plakat custom untuk berbagai kebutuhan corporate, event, atau penghargaan.',
    icon: '🏆',
    features: ['Desain custom', 'Material berkualitas', 'Packaging menarik', 'Harga kompetitif']
  },
];

export default function LayananPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-0">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white pt-16 lg:pt-20 pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-6">
                🎯 Layanan Profesional
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
                Layanan Advertising Terlengkap
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Dari konsep hingga instalasi, kami menyediakan solusi advertising yang komprehensif 
                untuk semua kebutuhan promosi bisnis Anda.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Pilihan Layanan Kami
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Setiap layanan dirancang dengan standar kualitas tinggi dan dikerjakan oleh tim profesional berpengalaman.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className="p-8">
                    <div className="text-4xl mb-4">{service.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                      {service.label}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {service.description}
                    </p>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-gray-900 text-sm">Keunggulan:</h4>
                      <ul className="space-y-1">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mr-2"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  
                  <div className="px-8 pb-8">
                    <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                      Konsultasi Gratis
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Proses Kerja Profesional
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Setiap proyek dikerjakan dengan tahapan yang terstruktur untuk memastikan hasil terbaik.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { step: '01', title: 'Konsultasi', desc: 'Diskusi kebutuhan dan budget' },
                { step: '02', title: 'Desain', desc: 'Pembuatan konsep dan mockup' },
                { step: '03', title: 'Produksi', desc: 'Proses pembuatan dengan QC ketat' },
                { step: '04', title: 'Instalasi', desc: 'Pemasangan profesional dan rapi' }
              ].map((item, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4 group-hover:bg-blue-700 transition-colors">
                    {item.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Siap Memulai Proyek Anda?
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
              Konsultasikan kebutuhan advertising Anda dengan tim profesional kami. 
              Dapatkan penawaran terbaik dan solusi yang tepat sasaran.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
                Hubungi Kami Sekarang
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Lihat Portfolio
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}