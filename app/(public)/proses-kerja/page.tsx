import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from 'next/image';

const processSteps = [
  {
    step: '01',
    title: 'Konsultasi & Briefing',
    description: 'Diskusi mendalam tentang kebutuhan, target audience, budget, dan timeline proyek Anda.',
    details: [
      'Analisis kebutuhan bisnis',
      'Penentuan target dan goals',
      'Diskusi budget dan timeline',
      'Survey lokasi (jika diperlukan)'
    ],
    duration: '1-2 hari',
    icon: '💬'
  },
  {
    step: '02',
    title: 'Konsep & Desain',
    description: 'Tim kreatif kami akan membuat konsep dan desain yang sesuai dengan brand identity Anda.',
    details: [
      'Riset kompetitor dan tren',
      'Pembuatan mood board',
      'Desain konsep awal',
      'Presentasi dan revisi'
    ],
    duration: '3-5 hari',
    icon: '🎨'
  },
  {
    step: '03',
    title: 'Approval & Finalisasi',
    description: 'Proses persetujuan desain final dan persiapan file produksi dengan spesifikasi lengkap.',
    details: [
      'Review desain final',
      'Approval dari klien',
      'Persiapan file produksi',
      'Konfirmasi spesifikasi material'
    ],
    duration: '1-2 hari',
    icon: '✅'
  },
  {
    step: '04',
    title: 'Produksi & Quality Control',
    description: 'Proses produksi dengan standar kualitas tinggi dan quality control yang ketat.',
    details: [
      'Persiapan material berkualitas',
      'Proses produksi bertahap',
      'Quality control setiap tahap',
      'Dokumentasi progress'
    ],
    duration: '3-10 hari',
    icon: '🏭'
  },
  {
    step: '05',
    title: 'Instalasi & Finishing',
    description: 'Pemasangan profesional di lokasi dengan finishing yang rapi dan aman.',
    details: [
      'Persiapan lokasi instalasi',
      'Pemasangan oleh teknisi ahli',
      'Testing dan quality check',
      'Dokumentasi hasil akhir'
    ],
    duration: '1-3 hari',
    icon: '🔧'
  },
  {
    step: '06',
    title: 'Serah Terima & After Sales',
    description: 'Serah terima proyek lengkap dengan garansi dan layanan after sales support.',
    details: [
      'Serah terima hasil akhir',
      'Dokumentasi garansi',
      'Panduan maintenance',
      'After sales support'
    ],
    duration: '1 hari',
    icon: '🤝'
  }
];

const qualityStandards = [
  {
    title: 'Material Premium',
    description: 'Menggunakan material berkualitas tinggi yang tahan lama dan weather resistant.',
    icon: '🏆'
  },
  {
    title: 'Teknisi Bersertifikat',
    description: 'Tim teknisi berpengalaman dan bersertifikat untuk hasil instalasi terbaik.',
    icon: '👨‍🔧'
  },
  {
    title: 'Quality Control Ketat',
    description: 'Setiap tahap produksi melalui quality control untuk memastikan standar kualitas.',
    icon: '🔍'
  },
  {
    title: 'Garansi Resmi',
    description: 'Memberikan garansi resmi untuk material dan workmanship sesuai paket.',
    icon: '🛡️'
  }
];

export default function ProsesKerjaPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-0">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-blue-800 text-white pt-16 lg:pt-20 pb-16 lg:pb-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="inline-flex items-center px-4 py-2 bg-white/20 text-white rounded-full text-sm font-semibold mb-6">
                ⚙️ Proses Profesional
              </div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
                Proses Kerja Pinang Advertising
              </h1>
              <p className="text-lg sm:text-xl lg:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed">
                Setiap proyek dikerjakan dengan tahapan yang terstruktur dan profesional 
                untuk memastikan hasil terbaik sesuai ekspektasi Anda.
              </p>
            </div>
          </div>
        </section>

        {/* Process Steps */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                6 Tahap Proses Kerja
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Dari konsultasi hingga after sales, setiap tahap dirancang untuk memberikan hasil optimal.
              </p>
            </div>

            <div className="space-y-12">
              {processSteps.map((process, index) => (
                <div key={index} className={`flex flex-col lg:flex-row items-center gap-8 lg:gap-16 ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Content */}
                  <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">
                        {process.step}
                      </div>
                      <div>
                        <h3 className="text-2xl lg:text-3xl font-bold text-gray-900">{process.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-blue-600 font-semibold">Durasi: {process.duration}</span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-lg text-gray-600 leading-relaxed">
                      {process.description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {process.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          <span className="text-gray-700 text-sm">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual */}
                  <div className="flex-1 max-w-md">
                    <div className="relative bg-white rounded-2xl shadow-xl p-8 text-center">
                      <div className="text-6xl mb-4">{process.icon}</div>
                      <div className="text-4xl font-bold text-blue-600 mb-2">{process.step}</div>
                      <div className="text-lg font-semibold text-gray-900">{process.title}</div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                        {index + 1}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quality Standards */}
        <section className="py-16 lg:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Standar Kualitas Kami
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Komitmen kami terhadap kualitas tercermin dalam setiap aspek pekerjaan.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {qualityStandards.map((standard, index) => (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center text-3xl mx-auto mb-6 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {standard.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                    {standard.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {standard.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline Visualization */}
        <section className="py-16 lg:py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Timeline Pengerjaan
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Estimasi waktu pengerjaan berdasarkan kompleksitas proyek.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  type: 'Proyek Simple',
                  duration: '7-10 Hari Kerja',
                  examples: ['Spanduk standar', 'Sticker & Label', 'Print sederhana'],
                  color: 'green'
                },
                {
                  type: 'Proyek Medium',
                  duration: '14-21 Hari Kerja',
                  examples: ['Neon Box', 'Huruf Timbul', 'Papan Merk'],
                  color: 'blue'
                },
                {
                  type: 'Proyek Complex',
                  duration: '1-2 Bulan',
                  examples: ['Multiple Signage', 'Branding Komprehensif', 'Multi-lokasi'],
                  color: 'purple'
                }
              ].map((timeline, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 ${
                    timeline.color === 'green' ? 'bg-green-100 text-green-600' :
                    timeline.color === 'blue' ? 'bg-blue-100 text-blue-600' : 'bg-purple-100 text-purple-600'
                  }`}>
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{timeline.type}</h3>
                  <div className={`text-2xl font-bold mb-4 ${
                    timeline.color === 'green' ? 'text-green-600' :
                    timeline.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                  }`}>
                    {timeline.duration}
                  </div>
                  <div className="space-y-2">
                    {timeline.examples.map((example, idx) => (
                      <div key={idx} className="text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-lg">
                        {example}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
              Mulai Proyek Anda Hari Ini
            </h2>
            <p className="text-lg sm:text-xl text-blue-100 mb-8 leading-relaxed">
              Dengan proses kerja yang terstruktur dan tim profesional, kami siap mewujudkan 
              ide advertising terbaik untuk bisnis Anda.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors">
                Konsultasi Gratis
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