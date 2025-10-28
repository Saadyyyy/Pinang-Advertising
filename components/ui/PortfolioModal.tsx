'use client';

import React, { useState, useEffect } from 'react';

interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PortfolioFormData) => void;
  loading?: boolean;
  editingItem?: PortfolioItem | null;
}

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

interface PortfolioFormData {
  title: string;
  description: string;
  category_id: number | '';
  image: string;
  imageFile?: File | null;
  technologies: string[];
  projectUrl: string;
  githubUrl: string;
}

interface PortfolioFormErrors {
  title?: string;
  description?: string;
  category_id?: string;
  image?: string;
  technologies?: string;
  projectUrl?: string;
  githubUrl?: string;
}

interface Category {
  id: number;
  category: string;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  loading = false,
  editingItem = null,
}) => {
  const [formData, setFormData] = useState<PortfolioFormData>({
    title: '',
    description: '',
    category_id: '',
    image: '',
    imageFile: null,
    technologies: [],
    projectUrl: '',
    githubUrl: '',
  });

  const [errors, setErrors] = useState<PortfolioFormErrors>({});
  const [techInput, setTechInput] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);

  // Fetch categories from API
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/category');
        if (response.ok) {
          const result = await response.json();
          if (result.success && result.data) {
            setCategories(result.data);
          }
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  // Populate form data when editing
  useEffect(() => {
    if (editingItem) {
      setFormData({
        title: editingItem.title,
        description: editingItem.description,
        category_id: editingItem.category_id,
        image: editingItem.image,
        imageFile: null,
        technologies: [], // Will need to fetch from API if stored separately
        projectUrl: '', // Will need to fetch from API if stored separately
        githubUrl: '', // Will need to fetch from API if stored separately
      });
    } else {
      // Reset form when not editing
      setFormData({
        title: '',
        description: '',
        category_id: '',
        image: '',
        imageFile: null,
        technologies: [],
        projectUrl: '',
        githubUrl: '',
      });
    }
    setErrors({});
  }, [editingItem]);

  const validateForm = (): boolean => {
    const newErrors: PortfolioFormErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Judul portfolio wajib diisi';
    } else if (formData.title.length > 255) {
      newErrors.title = 'Judul portfolio tidak boleh lebih dari 255 karakter';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Deskripsi portfolio wajib diisi';
    } else if (formData.description.length > 255) {
      newErrors.description = 'Deskripsi portfolio tidak boleh lebih dari 255 karakter';
    }

    if (!formData.category_id) {
      newErrors.category_id = 'Kategori wajib dipilih';
    }

    if (!formData.imageFile) {
      newErrors.image = 'Gambar wajib dipilih';
    } else {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
      if (!allowedTypes.includes(formData.imageFile.type)) {
        newErrors.image = 'Format gambar tidak valid. Hanya JPEG, PNG, WebP, dan GIF yang diperbolehkan.';
      }
      
      // Validate file size (max 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (formData.imageFile.size > maxSize) {
        newErrors.image = 'Ukuran gambar terlalu besar. Maksimal 5MB.';
      }
    }

    if (formData.projectUrl && !isValidUrl(formData.projectUrl)) {
      newErrors.projectUrl = 'URL project tidak valid';
    }

    if (formData.githubUrl && !isValidUrl(formData.githubUrl)) {
      newErrors.githubUrl = 'URL GitHub tidak valid';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing (only for fields that exist in errors)
    if (name in errors) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleAddTechnology = () => {
    if (techInput.trim() && !formData.technologies?.includes(techInput.trim())) {
      setFormData(prev => ({
        ...prev,
        technologies: [...(prev.technologies || []), techInput.trim()]
      }));
      setTechInput('');
    }
  };

  const handleRemoveTechnology = (tech: string) => {
    setFormData(prev => ({
      ...prev,
      technologies: prev.technologies?.filter(t => t !== tech) || []
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, imageFile: file }));
      // Clear image error when file is selected
      if (errors.image) {
        setErrors(prev => ({ ...prev, image: undefined }));
      }
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, imageFile: null }));
    // Reset the file input
    const fileInput = document.getElementById('imageFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      category_id: '',
      image: '',
      imageFile: null,
      technologies: [],
      projectUrl: '',
      githubUrl: '',
    });
    setErrors({});
    setTechInput('');
    
    // Reset file input
    const fileInput = document.getElementById('imageFile') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-white bg-opacity-95">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-white bg-opacity-75 transition-opacity"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-200">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              {editingItem ? 'Edit Portfolio' : 'Tambah Portfolio Baru'}
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

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Judul Portfolio *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-400 ${
                  errors.title ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Masukkan judul portfolio"
                disabled={loading}
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Deskripsi *
              </label>
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-400 ${
                  errors.description ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="Deskripsikan portfolio Anda"
                disabled={loading}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Category */}
            <div>
              <label htmlFor="category_id" className="block text-sm font-medium text-gray-700 mb-2">
                Kategori *
              </label>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-400 ${
                  errors.category_id ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={loading}
              >
                <option value="">Pilih kategori</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.category}
                  </option>
                ))}
              </select>
              {errors.category_id && (
                <p className="mt-1 text-sm text-red-600">{errors.category_id}</p>
              )}
            </div>

            {/* Image Upload */}
            <div>
              <label htmlFor="imageFile" className="block text-sm font-medium text-gray-700 mb-2">
                Upload Gambar *
              </label>
              <input
                type="file"
                id="imageFile"
                name="imageFile"
                accept="image/*"
                onChange={handleFileChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black ${
                  errors.image ? 'border-red-300' : 'border-gray-300'
                }`}
                disabled={loading}
              />
              {errors.image && (
                <p className="mt-1 text-sm text-red-600">{errors.image}</p>
              )}
              
              {/* Image Preview */}
              {formData.imageFile && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">Preview:</p>
                  <div className="relative inline-block">
                    <img
                      src={URL.createObjectURL(formData.imageFile)}
                      alt="Preview"
                      className="max-w-xs max-h-48 rounded-md border border-gray-300"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm hover:bg-red-600"
                      disabled={loading}
                    >
                      ×
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Technologies */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Teknologi yang Digunakan
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={techInput}
                  onChange={(e) => setTechInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTechnology())}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-400"
                  placeholder="Contoh: React, Node.js, MongoDB"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={handleAddTechnology}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors"
                  disabled={loading}
                >
                  Tambah
                </button>
              </div>
              {formData.technologies && formData.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {tech}
                      <button
                        type="button"
                        onClick={() => handleRemoveTechnology(tech)}
                        className="ml-2 text-blue-600 hover:text-blue-800"
                        disabled={loading}
                      >
                        ×
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Project URL */}
            <div>
              <label htmlFor="projectUrl" className="block text-sm font-medium text-gray-700 mb-2">
                URL Project (Opsional)
              </label>
              <input
                type="url"
                id="projectUrl"
                name="projectUrl"
                value={formData.projectUrl}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-400 ${
                  errors.projectUrl ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="https://project-demo.com"
                disabled={loading}
              />
              {errors.projectUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.projectUrl}</p>
              )}
            </div>

            {/* GitHub URL */}
            <div>
              <label htmlFor="githubUrl" className="block text-sm font-medium text-gray-700 mb-2">
                URL GitHub (Opsional)
              </label>
              <input
                type="url"
                id="githubUrl"
                name="githubUrl"
                value={formData.githubUrl}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-black placeholder-gray-400 ${
                  errors.githubUrl ? 'border-red-300' : 'border-gray-300'
                }`}
                placeholder="https://github.com/username/repo"
                disabled={loading}
              />
              {errors.githubUrl && (
                <p className="mt-1 text-sm text-red-600">{errors.githubUrl}</p>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={handleClose}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                disabled={loading}
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                disabled={loading}
              >
                {loading && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                {loading ? 'Menyimpan...' : (editingItem ? 'Update Portfolio' : 'Simpan Portfolio')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};