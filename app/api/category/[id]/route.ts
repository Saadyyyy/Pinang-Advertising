import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/category/[id] - Get category by ID
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    const query = `
      SELECT id, category, created_at
      FROM category
      WHERE id = $1
    `;

    const result = await db.query(query, [id]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Category GET by ID error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch category' },
      { status: 500 }
    );
  }
}

// PUT /api/category/[id] - Update category by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const body = await request.json();
    const { category } = body;
    const { id } = await params;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid category ID' },
        { status: 400 }
      );
    }

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

    // Check if category exists
    const checkQuery = `SELECT id FROM category WHERE id = $1`;
    const checkResult = await db.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    const updateQuery = `
      UPDATE category 
      SET category = $1
      WHERE id = $2
      RETURNING id, category, created_at
    `;

    const result = await db.query(updateQuery, [category.trim(), id]);

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Category updated successfully'
    });

  } catch (error: any) {
    console.error('Category PUT error:', error);
    
    // Handle unique constraint violation
    if (error.code === '23505') {
      return NextResponse.json(
        { success: false, error: 'Category already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { success: false, error: 'Failed to update category' },
      { status: 500 }
    );
  }
}

// DELETE /api/category/[id] - Delete category by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || isNaN(Number(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    // Check if category exists
    const checkQuery = `SELECT id FROM category WHERE id = $1`;
    const checkResult = await db.query(checkQuery, [id]);

    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check if category is being used in portfolio (exclude soft-deleted items)
    const usageQuery = `SELECT COUNT(*) as count FROM portfolio WHERE category_id = $1 AND deleted_at IS NULL`;
    const usageResult = await db.query(usageQuery, [id]);

    if (parseInt(usageResult.rows[0].count) > 0) {
      return NextResponse.json(
        { success: false, error: 'Cannot delete category that is being used in portfolio items' },
        { status: 409 }
      );
    }

    const deleteQuery = `DELETE FROM category WHERE id = $1 RETURNING id, category`;
    const result = await db.query(deleteQuery, [id]);

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Category deleted successfully'
    });

  } catch (error) {
    console.error('Category DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete category' },
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
      'Access-Control-Allow-Methods': 'GET, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}