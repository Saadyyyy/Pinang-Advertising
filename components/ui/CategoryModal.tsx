'use client';

import React, { useState, useEffect } from 'react';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: { category: string }) => void;
  category?: { id: number; category: string; created_at: string } | null;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  category,
}) => {
  const [categoryName, setCategoryName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setCategoryName(category.category);
    } else {
      setCategoryName('');
    }
    setError('');
  }, [category, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (!categoryName.trim()) {
      setError('Nama kategori harus diisi');
      return;
    }

    if (categoryName.length > 100) {
      setError('Nama kategori tidak boleh lebih dari 100 karakter');
      return;
    }

    setLoading(true);
    try {
      await onSave({ category: categoryName.trim() });
    } catch (error) {
      setError('Terjadi kesalahan saat menyimpan kategori');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setCategoryName('');
    setError('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 border border-gray-200">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {category ? 'Edit Kategori' : 'Tambah Kategori'}
            </h2>
            <button
              onClick={handleClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={loading}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 mb-2">
                Nama Kategori *
              </label>
              <input
                type="text"
                id="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Masukkan nama kategori"
                maxLength={100}
                disabled={loading}
                required
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-gray-500">
                  {categoryName.length}/100 karakter
                </span>
              </div>
            </div>

            {error && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                disabled={loading}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? 'Menyimpan...' : (category ? 'Update' : 'Simpan')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;