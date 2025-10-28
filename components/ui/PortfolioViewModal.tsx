'use client';

import React from 'react';

interface PortfolioItem {
  id: number;
  category: string;
  category_id: number;
  title: string;
  description: string;
  image: string;
  created_at: string;
  updated_at: string;
}

interface PortfolioViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  item: PortfolioItem | null;
}

export const PortfolioViewModal: React.FC<PortfolioViewModalProps> = ({
  isOpen,
  onClose,
  item,
}) => {
  if (!isOpen || !item) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Detail Portfolio</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Image */}
          <div className="mb-6">
            <img
              src={item.image || '/images/placeholder.jpg'}
              alt={item.title}
              className="w-full h-64 object-cover rounded-lg shadow-md"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = '/images/placeholder.jpg';
              }}
            />
          </div>

          {/* Title and Category */}
          <div className="mb-4">
            <h3 className="text-3xl font-bold text-gray-900 mb-2">{item.title}</h3>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
              {item.category}
            </span>
          </div>

          {/* Description */}
          <div className="mb-6">
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Deskripsi</h4>
            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap break-words">
              {item.description}
            </p>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Tanggal Dibuat</h4>
              <p className="text-gray-600">{formatDate(item.created_at)}</p>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-gray-900 mb-1">Terakhir Diupdate</h4>
              <p className="text-gray-600">{formatDate(item.updated_at)}</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};