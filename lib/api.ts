// API utility functions for fetching data

export interface Category {
  id: number;
  category: string;
  created_at: string;
}

export interface Portfolio {
  id: number;
  title: string;
  description: string;
  image: string;
  category: string;
  created_at: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  total: number;
  page?: number;
  limit?: number;
  totalPages?: number;
  message?: string;
}

// Base URL for API - using internal Next.js API routes
const API_BASE_URL =  'http://localhost:3000';

/**
 * Fetch all categories from API
 */
export async function fetchCategories(): Promise<Category[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/category`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching for fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Category[]> = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch categories');
    }

    return result.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
}

/**
 * Fetch portfolio items from API
 */
export async function fetchPortfolio(params?: {
  category?: string;
  limit?: number;
  page?: number;
}): Promise<{
  data: Portfolio[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}> {
  try {
    const searchParams = new URLSearchParams();
    
    if (params?.category && params.category !== 'All') {
      searchParams.append('category', params.category);
    }
    if (params?.limit) {
      searchParams.append('limit', params.limit.toString());
    }
    if (params?.page) {
      searchParams.append('page', params.page.toString());
    }

    const url = `${API_BASE_URL}/api/portfolio${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Disable caching for fresh data
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<Portfolio[]> = await response.json();
    
    if (!result.success) {
      throw new Error(result.message || 'Failed to fetch portfolio');
    }

    return {
      data: result.data,
      total: result.total,
      page: result.page || 1,
      limit: result.limit || result.data.length,
      totalPages: result.totalPages || 1,
    };
  } catch (error) {
    console.error('Error fetching portfolio:', error);
    throw error;
  }
}