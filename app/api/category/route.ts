import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/category - Get all categories
export async function GET(request: NextRequest) {
  try {
    const query = `
      SELECT id, category, created_at
      FROM category
      ORDER BY category ASC
    `;

    const result = await db.query(query);

    return NextResponse.json({
      success: true,
      data: result.rows,
      total: result.rows.length
    });

  } catch (error) {
    console.error('Category GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch categories' },
      { status: 500 }
    );
  }
}

// POST /api/category - Create new category
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category } = body;

    // Validation
    if (!category || !category.trim()) {
      return NextResponse.json(
        { success: false, error: 'Category name is required' },
        { status: 400 }
      );
    }

    // Check if category name is too long
    if (category.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Category name cannot exceed 100 characters' },
        { status: 400 }
      );
    }

    const query = `
      INSERT INTO category (category, created_at)
      VALUES ($1, CURRENT_TIMESTAMP)
      RETURNING id, category, created_at
    `;

    const result = await db.query(query, [category.trim()]);

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Category created successfully'
    }, { status: 201 });

  } catch (error: any) {
    console.error('Category POST error:', error);
    
    // Handle unique constraint violation
    if (error.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'Category already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to create category' },
      { status: 500 }
    );
  }
}

// Handle OPTIONS request for CORS
export async function OPTIONS(request: NextRequest) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}