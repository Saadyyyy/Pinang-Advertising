'use client';

import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import CategoryModal from '../../../components/ui/CategoryModal';
import { DashboardLayout } from '@/components/layout/DashboardLayout';

interface Category {
  id: number;
  category: string;
  created_at: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<number | null>(null);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/category');
      const result = await response.json();
      
      if (result.success) {
        // Sort categories by ID in ascending order
        const sortedCategories = result.data.sort((a: Category, b: Category) => a.id - b.id);
        setCategories(sortedCategories);
      } else {
        console.error('Failed to fetch categories:', result.error);
      }
    } catch (error) {
      console.error('Error fetching categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle create category
  const handleCreate = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  // Handle edit category
  const handleEdit = (category: Category) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  // Handle delete category
  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/category/${id}`, {
        method: 'DELETE',
      });
      
      const result = await response.json();
      
      if (result.success) {
        setCategories(categories.filter(cat => cat.id !== id));
        setDeleteConfirm(null);
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error deleting category:', error);
      alert('Failed to delete category');
    }
  };

  // Handle modal save
  const handleModalSave = async (categoryData: { category: string }) => {
    try {
      const url = editingCategory 
        ? `/api/category/${editingCategory.id}` 
        : '/api/category';
      
      const method = editingCategory ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(categoryData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        await fetchCategories(); // Refresh the list
        setIsModalOpen(false);
        setEditingCategory(null);
      } else {
        alert('Error: ' + result.error);
      }
    } catch (error) {
      console.error('Error saving category:', error);
      alert('Failed to save category');
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('id-ID', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="min-h-screen bg-white p-6">
          <div className="flex justify-center items-center h-64">
            <div className="text-lg">Loading categories...</div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="min-h-screen bg-white p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Manajemen Kategori</h1>
          <button
            onClick={handleCreate}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            + Tambah Kategori
          </button>
        </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">ID</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Nama Kategori</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Dibuat</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8 text-gray-500">
                    Belum ada kategori
                  </td>
                </tr>
              ) : (
                categories.map((category) => (
                  <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 text-gray-600">{category.id}</td>
                    <td className="py-3 px-4">
                      <span className="font-medium text-gray-800">{category.category}</span>
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {formatDate(category.created_at)}
                    </td>
                    <td className="py-3 px-4">
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(category)}
                          className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(category.id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm transition-colors"
                        >
                          Hapus
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Category Modal */}
      <CategoryModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingCategory(null);
        }}
        onSave={handleModalSave}
        category={editingCategory}
      />

      {/* Delete Confirmation Modal */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-white bg-opacity-90 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Konfirmasi Hapus
            </h3>
            <p className="text-gray-600 mb-6">
              Apakah Anda yakin ingin menghapus kategori ini? Tindakan ini tidak dapat dibatalkan.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Batal
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </DashboardLayout>
  );
}