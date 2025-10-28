'use client';

import React, { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { PortfolioModal } from '@/components/ui/PortfolioModal';
import { PortfolioViewModal } from '@/components/ui/PortfolioViewModal';
import { Card } from '@/components/ui/Card';

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

interface PortfolioResponse {
  data: PortfolioItem[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

interface User {
  name: string;
  email: string;
  role: string;
}

const PortfolioCard: React.FC<{ item: PortfolioItem; onEdit: (item: PortfolioItem) => void; onDelete: (id: number) => void; onView: (item: PortfolioItem) => void }> = ({ item, onEdit, onDelete, onView }) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <div className="aspect-video bg-gray-200 relative group">
        {item.image ? (
          <img
            src={item.image}
            alt={item.title}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
        
        {/* Action buttons overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
          <button
            onClick={() => onView(item)}
            className="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-200"
            title="Lihat Detail"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </button>
          <button
            onClick={() => onEdit(item)}
            className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-full transition-colors duration-200"
            title="Edit"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(item.id)}
            className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors duration-200"
            title="Hapus"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>
      <div className="p-4">
        <div className="mb-2">
          <span className="inline-block px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
            {item.category}
          </span>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h3>
        <p className="text-gray-600 text-sm mb-3 break-words whitespace-pre-wrap leading-relaxed">{item.description}</p>
        <div className="text-xs text-gray-400">
          {new Date(item.created_at).toLocaleDateString('id-ID')}
        </div>
      </div>
    </Card>
  );
};

export default function PortfolioPage() {
  const [portfolios, setPortfolios] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [categories, setCategories] = useState<string[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingItem, setEditingItem] = useState<PortfolioItem | null>(null);
  const [viewingItem, setViewingItem] = useState<PortfolioItem | null>(null);

  useEffect(() => {
    fetchUser();
    fetchPortfolios();
  }, [selectedCategory]);

  const fetchUser = async () => {
    try {
      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData.user);
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  // CRUD Handler Functions
  const handleEditPortfolio = (item: PortfolioItem) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleDeletePortfolio = async (id: number) => {
    if (!confirm('Apakah Anda yakin ingin menghapus portfolio ini?')) {
      return;
    }

    try {
      const response = await fetch(`/api/portfolio/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal menghapus portfolio');
      }

      // Remove portfolio from the list
      setPortfolios(prev => prev.filter(item => item.id !== id));
      alert('Portfolio berhasil dihapus');
    } catch (error) {
      console.error('Error deleting portfolio:', error);
      const errorMessage = error instanceof Error ? error.message : 'Gagal menghapus portfolio. Silakan coba lagi.';
      alert(errorMessage);
    }
  };

  const handleViewPortfolio = (item: PortfolioItem) => {
    setViewingItem(item);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingItem(null);
  };

  const handleCloseViewModal = () => {
    setViewingItem(null);
  };

  const fetchPortfolios = async () => {
    setLoading(true);
    setError(null);
    try {
      const url = selectedCategory === 'all' 
        ? '/api/portfolio' 
        : `/api/portfolio?category=${encodeURIComponent(selectedCategory)}`;
      
      const response = await fetch(url, {
        method: 'GET',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Gagal memuat portfolio');
      }

      const result = await response.json();
      if (result.success && Array.isArray(result.data)) {
        setPortfolios(result.data);
        
        // Extract unique categories from portfolios
        const uniqueCategories = [...new Set(result.data.map((item: PortfolioItem) => item.category).filter(Boolean))] as string[];
        setCategories(['all', ...uniqueCategories]);
      } else {
        throw new Error(result.error || 'Format data tidak valid');
      }
    } catch (error) {
      console.error('Error fetching portfolios:', error);
      const errorMessage = error instanceof Error ? error.message : 'Gagal memuat portfolio. Silakan coba lagi.';
      setError(errorMessage);
      setPortfolios([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitPortfolio = async (formData: any) => {
    setIsSubmitting(true);
    
    try {
      let imageUrl = formData.image || '';
      
      // Handle image upload if a new file is provided
      if (formData.imageFile) {
        const uploadFormData = new FormData();
        uploadFormData.append('file', formData.imageFile);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          credentials: 'include',
          body: uploadFormData,
        });
        
        if (!uploadResponse.ok) {
          const uploadError = await uploadResponse.json();
          throw new Error(uploadError.error || 'Gagal mengupload gambar');
        }
        
        const uploadResult = await uploadResponse.json();
        if (uploadResult.success && uploadResult.data) {
          imageUrl = uploadResult.data.url;
        } else {
          throw new Error('Gagal mengupload gambar');
        }
      }
      
      // Prepare portfolio data
      const portfolioData = {
        title: formData.title,
        description: formData.description,
        category_id: formData.category_id,
        image: imageUrl,
        technologies: formData.technologies,
        projectUrl: formData.projectUrl,
        githubUrl: formData.githubUrl,
      };
      
      const isEditing = !!editingItem;
      const url = isEditing ? `/api/portfolio/${editingItem.id}` : '/api/portfolio';
      const method = isEditing ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(portfolioData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Gagal ${isEditing ? 'mengupdate' : 'menambahkan'} portfolio`);
      }

      const result = await response.json();
      if (result.success && result.data) {
        if (isEditing) {
          // Update existing portfolio in the list
          setPortfolios(prev => prev.map(item => 
            item.id === editingItem.id ? result.data : item
          ));
        } else {
          // Add new portfolio to the beginning of the list
          setPortfolios(prev => [result.data, ...prev]);
        }
        setIsModalOpen(false);
        
        // Refresh portfolios to ensure data consistency
        await fetchPortfolios();
      } else {
        throw new Error(result.error || `Gagal ${isEditing ? 'mengupdate' : 'menambahkan'} portfolio`);
      }
    } catch (error) {
      console.error('Error submitting portfolio:', error);
      const errorMessage = error instanceof Error ? error.message : `Gagal ${editingItem ? 'mengupdate' : 'menambahkan'} portfolio. Silakan coba lagi.`;
      alert(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <DashboardLayout user={user || undefined}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-video rounded-lg mb-4"></div>
                <div className="h-4 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded mb-2"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout user={user || undefined}>
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
          </div>
          <div className="text-center py-12">
            <div className="text-red-600 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Error Loading Portfolio</h3>
            <p className="text-gray-600 mb-4">{error}</p>
            <button
              onClick={fetchPortfolios}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout user={user || undefined}>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
           <h1 className="text-2xl font-bold text-gray-900">Portfolio</h1>
           <button 
             onClick={() => setIsModalOpen(true)}
             className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
           >
             Tambah Portfolio
           </button>
         </div>

        {/* Filter */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedCategory('')}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedCategory === ''
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            Semua
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Portfolio Grid */}
        {portfolios.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg className="w-12 h-12 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Belum Ada Portfolio</h3>
            <p className="text-gray-600 mb-4">
               {selectedCategory 
                 ? `Tidak ada portfolio dalam kategori "${selectedCategory}"`
                 : 'Mulai dengan menambahkan portfolio pertama Anda'
               }
             </p>
             <button 
               onClick={() => setIsModalOpen(true)}
               className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
             >
               Tambah Portfolio
             </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolios.map((item) => (
              <PortfolioCard 
                key={item.id} 
                item={item} 
                onEdit={handleEditPortfolio}
                onDelete={handleDeletePortfolio}
                onView={handleViewPortfolio}
              />
            ))}
          </div>
        )}
       </div>

       {/* Portfolio Modal */}
       <PortfolioModal
         isOpen={isModalOpen}
         onClose={handleCloseModal}
         onSubmit={handleSubmitPortfolio}
         loading={isSubmitting}
         editingItem={editingItem}
       />

       {/* Portfolio View Modal */}
       <PortfolioViewModal
         isOpen={!!viewingItem}
         onClose={handleCloseViewModal}
         item={viewingItem}
       />
     </DashboardLayout>
   );
}