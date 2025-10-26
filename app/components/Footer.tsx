import React from 'react';
import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-black text-white py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
          {/* Logo Section */}
          <div className="lg:col-span-1">
            <div className="flex items-center mb-4 sm:mb-6">
              <div className="mr-3 sm:mr-4">
                <Image 
                  src="/pinang-logo.svg" 
                  alt="Pinang Advertising Logo" 
                  width={50} 
                  height={50}
                  className="w-10 h-10 sm:w-12 sm:h-12"
                />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-bold font-poppins text-white">Pinang Advertising</h3>
                <p className="text-xs sm:text-sm text-gray-400 font-medium">Solusi Advertising Terpercaya</p>
                <p className="text-xs text-gray-500 mt-1">Cetak & Pasang</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Mewujudkan identitas visual yang memorable untuk bisnis Anda dengan kualitas premium dan pelayanan profesional.
            </p>
          </div>

          {/* Operational Hours */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 font-poppins text-white">Jam Operasional</h4>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-2 sm:p-3">
                <span className="text-gray-300 font-medium text-sm">Senin - Jumat</span>
                <span className="text-white font-semibold text-sm">08.00 - 17.00</span>
              </div>
              <div className="flex items-center justify-between bg-gray-800/50 rounded-lg p-2 sm:p-3">
                <span className="text-gray-300 font-medium text-sm">Sabtu</span>
                <span className="text-white font-semibold text-sm">08.00 - 15.00</span>
              </div>
              <div className="flex items-center justify-between bg-red-900/30 rounded-lg p-2 sm:p-3 border border-red-800/50">
                <span className="text-gray-300 font-medium text-sm">Minggu</span>
                <span className="text-red-400 font-semibold text-sm">Tutup</span>
              </div>
            </div>
          </div>

          {/* Contact Section */}
          <div>
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 font-poppins text-white">Say Hello!</h4>
            <div className="space-y-3 sm:space-y-4">
              <a href="mailto:info@pinangadvertising.com" className="group flex items-center p-2 sm:p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300">
                <div className="w-8 h-8 sm:w-10 sm:h-10 mr-3 sm:mr-4 flex items-center justify-center bg-blue-600 rounded-full group-hover:bg-blue-500 transition-colors duration-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-white font-medium block text-sm">Email Us</span>
                  <span className="text-gray-400 text-xs sm:text-sm">info@pinangadvertising.com</span>
                </div>
              </a>
              
              <a href="https://instagram.com/pinangadvertising" className="group flex items-center p-2 sm:p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300">
                <div className="w-8 h-8 sm:w-10 sm:h-10 mr-3 sm:mr-4 flex items-center justify-center bg-gradient-to-br from-purple-600 to-pink-600 rounded-full group-hover:from-purple-500 group-hover:to-pink-500 transition-all duration-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </div>
                <div>
                  <span className="text-white font-medium block text-sm">Instagram</span>
                  <span className="text-gray-400 text-xs sm:text-sm">@pinangadvertising</span>
                </div>
              </a>
              
              <a href="https://wa.me/6281234567890" className="group flex items-center p-2 sm:p-3 bg-gray-800/50 rounded-lg hover:bg-gray-700/50 transition-all duration-300">
                <div className="w-8 h-8 sm:w-10 sm:h-10 mr-3 sm:mr-4 flex items-center justify-center bg-green-600 rounded-full group-hover:bg-green-500 transition-colors duration-300">
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488"/>
                  </svg>
                </div>
                <div>
                  <span className="text-white font-medium block text-sm">WhatsApp</span>
                  <span className="text-gray-400 text-xs sm:text-sm">+62 812-3456-7890</span>
                </div>
              </a>
            </div>
          </div>

          {/* Services Section */}
          <div className="sm:col-span-2 lg:col-span-1">
            <h4 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 font-poppins text-white">Layanan Kami</h4>
            <div className="grid grid-cols-1 gap-3">
              <div className="bg-gray-800/30 rounded-lg p-3 sm:p-4">
                <h5 className="text-white font-semibold mb-2 sm:mb-3 text-sm">Outdoor Advertising</h5>
                <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs text-gray-400">
                  <span className="bg-gray-700/50 px-2 py-1 rounded text-xs">Spanduk</span>
                  <span className="bg-gray-700/50 px-2 py-1 rounded text-xs">Billboard</span>
                  <span className="bg-gray-700/50 px-2 py-1 rounded text-xs">Neon Box</span>
                  <span className="bg-gray-700/50 px-2 py-1 rounded text-xs">Huruf Timbul</span>
                  <span className="bg-gray-700/50 px-2 py-1 rounded text-xs">Papan Merk</span>
                  <span className="bg-gray-700/50 px-2 py-1 rounded text-xs">Sticker</span>
                </div>
              </div>
              
              <div className="bg-gray-800/30 rounded-lg p-3 sm:p-4">
                <h5 className="text-white font-semibold mb-2 sm:mb-3 text-sm">Print & Design</h5>
                <div className="grid grid-cols-2 gap-1 sm:gap-2 text-xs text-gray-400">
                  <span className="bg-gray-700/50 px-2 py-1 rounded text-xs">Kartu Nama</span>
                  <span className="bg-gray-700/50 px-2 py-1 rounded text-xs">Undangan</span>
                  <span className="bg-gray-700/50 px-2 py-1 rounded text-xs">Plakat</span>
                  <span className="bg-gray-700/50 px-2 py-1 rounded text-xs">Ganci | Pin</span>
                  <span className="bg-gray-700/50 px-2 py-1 rounded text-xs">Sticker Label</span>
                  <span className="bg-gray-700/50 px-2 py-1 rounded text-xs">Yasin | Buku</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700/50 mt-12 sm:mt-16 pt-6 sm:pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <p className="text-xs sm:text-sm text-gray-400 text-center md:text-left">
                Copyright © 2025 - Pinang Advertising. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;