import Header from "../components/Header";
import Footer from "../components/Footer";

const pricingPlans = [
  {
    name: 'Paket Starter',
    price: 'Mulai 500K',
    description: 'Cocok untuk usaha kecil dan UMKM yang baru memulai',
    features: [
      'Spanduk ukuran standar (2x1 meter)',
      'Desain simple dan menarik',
      'Bahan berkualitas baik',
      'Revisi desain 2x',
      'Konsultasi gratis'
    ],
    popular: false,
    color: 'blue'
  },
  {
    name: 'Paket Professional',
    price: 'Mulai 1.5 Juta',
    description: 'Pilihan terbaik untuk bisnis yang berkembang',
    features: [
      'Neon Box atau Huruf Timbul',
      'Desain premium dan custom',
      'Material berkualitas tinggi',
      'Instalasi profesional',
      'Garansi 1 tahun',
      'Revisi unlimited',
      'Konsultasi mendalam'
    ],
    popular: true,
    color: 'purple'
  },
  {
    name: 'Paket Enterprise',
    price: 'Custom Quote',
    description: 'Solusi lengkap untuk perusahaan besar',
    features: [
      'Multiple signage solutions',
      'Branding konsisten',
      'Project management dedicated',
      'Maintenance berkala',
      'Support 24/7',
      'Custom design & material',
      'Instalasi multi-lokasi'
    ],
    popular: false,
    color: 'green'
  }
];

const additionalServices = [
  { name: 'Desain Ulang', price: '200K - 500K', description: 'Revisi atau redesign komprehensif' },
  { name: 'Pemasangan Ulang', price: '300K - 800K', description: 'Bongkar pasang di lokasi baru' },
  { name: 'Maintenance Rutin', price: '150K/bulan', description: 'Perawatan dan pembersihan berkala' },
  { name: 'Rush Order', price: '+50% dari harga', description: 'Pengerjaan prioritas dalam 3 hari' },
  { name: 'Konsultasi Khusus', price: '500K/sesi', description: 'Konsultasi branding dan strategi' },
  { name: 'Survey Lokasi', price: '200K', description: 'Survei dan analisis lokasi pemasangan' }
];

export default function HargaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-0">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white pt-16 lg:pt-20 pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-6">
                💰 Harga Terjangkau
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
                Paket Harga Advertising
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Pilih paket yang sesuai dengan kebutuhan dan budget bisnis Anda. 
                Semua paket sudah termasuk konsultasi gratis dan garansi kualitas.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Plans */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Pilihan Paket Terbaik
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Setiap paket dirancang untuk memberikan nilai terbaik sesuai dengan skala bisnis Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {pricingPlans.map((plan, index) => (
                <div key={index} className={`relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${plan.popular ? 'ring-2 ring-purple-600 transform scale-105' : ''}`}>
                  {plan.popular && (
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white text-center py-2 text-sm font-semibold">
                      🌟 PALING POPULER
                    </div>
                  )}
                  
                  <div className={`p-8 ${plan.popular ? 'pt-12' : ''}`}>
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                      <div className={`text-4xl font-bold mb-4 ${
                        plan.color === 'blue' ? 'text-blue-600' :
                        plan.color === 'purple' ? 'text-purple-600' : 'text-green-600'
                      }`}>
                        {plan.price}
                      </div>
                      <p className="text-gray-600">{plan.description}</p>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center mr-3 mt-0.5 ${
                            plan.color === 'blue' ? 'bg-blue-100' :
                            plan.color === 'purple' ? 'bg-purple-100' : 'bg-green-100'
                          }`}>
                            <svg className={`w-3 h-3 ${
                              plan.color === 'blue' ? 'text-blue-600' :
                              plan.color === 'purple' ? 'text-purple-600' : 'text-green-600'
                            }`} fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <button className={`w-full py-4 rounded-lg font-semibold transition-colors ${
                      plan.popular 
                        ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700' 
                        : plan.color === 'blue' 
                          ? 'bg-blue-600 text-white hover:bg-blue-700'
                          : 'bg-green-600 text-white hover:bg-green-700'
                    }`}>
                      {plan.name === 'Paket Enterprise' ? 'Hubungi Kami' : 'Pilih Paket'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Services */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Layanan Tambahan
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Berbagai layanan pendukung untuk melengkapi kebutuhan advertising Anda.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {additionalServices.map((service, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-6 hover:bg-gray-100 transition-colors">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">{service.name}</h3>
                    <span className="text-blue-600 font-bold text-sm bg-blue-100 px-3 py-1 rounded-full">
                      {service.price}
                    </span>
                  </div>
                  <p className="text-gray-600 text-sm">{service.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Pertanyaan Umum
              </h2>
              <p className="text-lg text-gray-600">
                Jawaban untuk pertanyaan yang sering diajukan tentang harga dan layanan kami.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  q: 'Apakah harga sudah termasuk desain?',
                  a: 'Ya, semua paket sudah termasuk desain custom sesuai kebutuhan Anda. Untuk Paket Professional dan Enterprise, Anda mendapat revisi unlimited.'
                },
                {
                  q: 'Berapa lama proses pengerjaan?',
                  a: 'Waktu pengerjaan bervariasi: Paket Starter (3-5 hari), Paket Professional (7-10 hari), Paket Enterprise (2-4 minggu). Rush order tersedia dengan biaya tambahan.'
                },
                {
                  q: 'Apakah ada garansi?',
                  a: 'Ya, kami memberikan garansi kualitas. Paket Starter (6 bulan), Paket Professional (1 tahun), Paket Enterprise (2 tahun) untuk kerusakan material dan workmanship.'
                },
                {
                  q: 'Bagaimana sistem pembayaran?',
                  a: 'Pembayaran dapat dilakukan dengan DP 50% di awal, sisanya setelah pekerjaan selesai. Kami menerima transfer bank, cash, dan payment gateway.'
                },
                {
                  q: 'Apakah bisa custom diluar paket?',
                  a: 'Tentu saja! Kami sangat fleksibel untuk kebutuhan custom. Silakan konsultasikan kebutuhan spesifik Anda untuk mendapat penawaran khusus.'
                }
              ].map((faq, index) => (
                <div key={index} className="bg-white rounded-xl p-6 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.q}</h3>
                  <p className="text-gray-600 leading-relaxed">{faq.a}</p>
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
              Dapatkan konsultasi gratis dan penawaran terbaik untuk kebutuhan advertising bisnis Anda. 
              Tim kami siap membantu mewujudkan ide kreatif Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
                Konsultasi Gratis
              </button>
              <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Minta Penawaran
              </button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}