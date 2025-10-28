'use client';

import { useState } from 'react';

const ProcessWork = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: 'Brief & Estimasi',
      description: 'Konsultasi kebutuhan, survey lokasi, dan estimasi biaya yang transparan.',
      icon: '📋',
      details: [
        'Konsultasi mendalam tentang kebutuhan advertising',
        'Survey lokasi untuk instalasi optimal',
        'Estimasi biaya yang jelas dan transparan',
        'Timeline pengerjaan yang realistis'
      ]
    },
    {
      id: 2,
      title: 'Proof & Approval',
      description: 'Desain mockup, revisi unlimited, dan persetujuan final sebelum produksi.',
      icon: '✅',
      details: [
        'Pembuatan desain mockup profesional',
        'Revisi unlimited hingga Anda puas',
        'Color proof untuk akurasi warna',
        'Persetujuan final sebelum produksi'
      ]
    },
    {
      id: 3,
      title: 'Produksi',
      description: 'Proses produksi berkualitas tinggi dengan kontrol kualitas ketat dan instalasi profesional.',
      icon: '🏭',
      details: [
        'Produksi dengan teknologi terdepan',
        'Quality control di setiap tahap',
        'Instalasi oleh tim berpengalaman',
        'Garansi hasil dan maintenance'
      ]
    }
  ];

  return (
    <section className="py-12 sm:py-16 lg:py-20 px-4 bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center min-h-screen">
      <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center">
        {/* Header */}
        <div className="flex flex-col items-center justify-center text-center mb-12 sm:mb-16 w-full">
          <div className="flex justify-center w-full mb-3 sm:mb-4">
            <div className="inline-flex items-center justify-center px-3 py-2 sm:px-4 sm:py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-semibold">
              🔄 Proses Kerja
            </div>
          </div>
          <div className="flex justify-center w-full mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 text-center">
              Proses Kerja Kami
            </h2>
          </div>
          <div className="flex justify-center w-full">
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl text-center mx-auto">
              Sistem kerja yang terstruktur dan profesional untuk hasil terbaik
            </p>
          </div>
        </div>

        {/* Process Steps - Mobile: Vertical, Desktop: Horizontal */}
        <div className="flex justify-center items-center mb-12 sm:mb-16 w-full">
          {/* Mobile Layout - Vertical Steps */}
          <div className="block lg:hidden space-y-6 w-full max-w-2xl mx-auto flex flex-col items-center justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="relative flex justify-center items-center w-full">
                <div className="w-full max-w-lg mx-auto flex justify-center items-center">
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-1/2 transform -translate-x-1/2 top-20 w-0.5 h-16 bg-gradient-to-b from-blue-400 to-blue-200 z-10"></div>
                  )}
                  
                  <div 
                    className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                      activeStep === step.id ? 'border-blue-500 shadow-blue-100' : 'border-gray-100'
                    }`}
                    onClick={() => setActiveStep(step.id)}
                  >
                    <div className="flex flex-col items-center text-center gap-4">
                      {/* Step Number & Icon */}
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center text-lg font-bold transition-all duration-300 ${
                          activeStep === step.id 
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg' 
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {step.id}
                        </div>
                        <div className="text-2xl">{step.icon}</div>
                      </div>
                      
                      {/* Content */}
                      <div className="w-full flex flex-col items-center justify-center text-center">
                        <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 text-center">
                          {step.title}
                        </h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-3 text-center">
                          {step.description}
                        </p>
                        
                        {/* Details - Show when active */}
                        {activeStep === step.id && (
                          <div className="mt-4 space-y-2 w-full flex flex-col items-center justify-center">
                            {step.details.map((detail, idx) => (
                              <div key={idx} className="flex items-start justify-center gap-2 w-full max-w-md">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                <span className="text-sm text-gray-700 text-center">{detail}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop Layout - Horizontal Steps */}
          <div className="hidden lg:flex lg:flex-col lg:items-center lg:justify-center w-full">
            <div className="flex items-center justify-center mb-12 w-full">
              <div className="flex items-center justify-center max-w-5xl w-full mx-auto">
                <div className="flex items-center justify-center w-full max-w-4xl mx-auto">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center justify-center flex-1">
                      <div 
                        className={`relative cursor-pointer transition-all duration-300 mx-auto flex flex-col items-center justify-center ${
                          activeStep === step.id ? 'transform scale-105' : ''
                        }`}
                        onClick={() => setActiveStep(step.id)}
                      >
                        {/* Step Circle */}
                        <div className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold transition-all duration-300 mx-auto ${
                          activeStep === step.id 
                            ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-2xl' 
                            : 'bg-white text-gray-600 shadow-lg hover:shadow-xl border-2 border-gray-100'
                        }`}>
                          {step.id}
                        </div>
                        
                        {/* Step Title */}
                        <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap flex justify-center w-full">
                          <h3 className={`text-lg font-bold transition-colors duration-300 text-center ${
                            activeStep === step.id ? 'text-blue-600' : 'text-gray-700'
                          }`}>
                            {step.title}
                          </h3>
                        </div>
                      </div>
                      
                      {/* Connector Line */}
                      {index < steps.length - 1 && (
                        <div className="flex-1 h-1 mx-8 bg-gradient-to-r from-blue-200 to-blue-100 rounded-full flex items-center justify-center"></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Active Step Details */}
            <div className="flex justify-center items-center w-full">
              <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 w-full max-w-4xl mx-auto flex justify-center items-center">
                {steps.map((step) => (
                  activeStep === step.id && (
                    <div key={step.id} className="text-center w-full flex flex-col items-center justify-center">
                      <div className="text-6xl mb-6 flex justify-center">{step.icon}</div>
                      <h3 className="text-3xl font-bold text-gray-900 mb-4 text-center">{step.title}</h3>
                      <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto text-center">{step.description}</p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl mx-auto w-full flex justify-center">
                        {step.details.map((detail, idx) => (
                          <div key={idx} className="flex items-center justify-center gap-3 p-4 bg-blue-50 rounded-xl w-full">
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                            <span className="text-gray-700 font-medium text-center">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="flex justify-center items-center w-full">
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl sm:rounded-3xl p-6 sm:p-8 lg:p-12 text-white text-center w-full max-w-5xl mx-auto">
            <div className="flex flex-col items-center justify-center w-full">
              <div className="flex justify-center w-full mb-3 sm:mb-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center">
                  Siap bikin brand Anda berbicara?
                </h3>
              </div>
              <div className="flex justify-center w-full mb-6 sm:mb-8">
                <p className="text-base sm:text-lg lg:text-xl text-blue-100 max-w-2xl text-center">
                  Konsultasi gratis untuk menentukan solusi advertising terbaik untuk bisnis Anda
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 w-full">
                <button className="bg-white text-blue-600 px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                  Hubungi Sekarang
                </button>
                <button className="border-2 border-white/30 text-white px-6 py-3 sm:px-8 sm:py-4 rounded-xl text-base sm:text-lg font-semibold hover:bg-white/10 transition-all duration-300">
                  Lihat Portfolio
                </button>
              </div>
              
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-2xl w-full mx-auto justify-center">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center flex flex-col items-center justify-center">
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1 text-center">24h</div>
                  <div className="text-gray-300 text-xs sm:text-sm text-center">Express Service</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center flex flex-col items-center justify-center">
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1 text-center">5★</div>
                  <div className="text-gray-300 text-xs sm:text-sm text-center">Rating Klien</div>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-4 text-center flex flex-col items-center justify-center">
                  <div className="text-xl sm:text-2xl font-bold text-white mb-1 text-center">7+</div>
                  <div className="text-gray-300 text-xs sm:text-sm text-center">Tahun Pengalaman</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessWork;