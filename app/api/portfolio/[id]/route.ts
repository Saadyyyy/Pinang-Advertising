import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/portfolio/[id] - Get single portfolio item
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid portfolio ID' },
        { status: 400 }
      );
    }

    const query = `
      SELECT p.id, c.category, p.title, p.subtitle as description, p.image, p.created_at, p.updated_at, p.category_id
      FROM portfolio p
      LEFT JOIN category c ON p.category_id = c.id
      WHERE p.id = $1 AND p.deleted_at IS NULL
    `;

    const result = await db.query(query, [parseInt(id)]);

    if (result.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: result.rows[0]
    });

  } catch (error) {
    console.error('Portfolio GET by ID error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch portfolio item' },
      { status: 500 }
    );
  }
}

// PUT /api/portfolio/[id] - Update portfolio item
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { category_id, title, description, image } = body;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid portfolio ID' },
        { status: 400 }
      );
    }

    // Validation
    if (!category_id || !title) {
      return NextResponse.json(
        { success: false, error: 'Category ID and title are required' },
        { status: 400 }
      );
    }

    // Verify category exists
    const categoryCheck = await db.query('SELECT id FROM category WHERE id = $1', [category_id]);
    if (categoryCheck.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    // Check if portfolio item exists
    const checkQuery = `SELECT id FROM portfolio WHERE id = $1 AND deleted_at IS NULL`;
    const checkResult = await db.query(checkQuery, [parseInt(id)]);

    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    // Update portfolio item
    const updateQuery = `
      UPDATE portfolio 
      SET category_id = $1, title = $2, subtitle = $3, image = $4, updated_at = CURRENT_TIMESTAMP
      WHERE id = $5 AND deleted_at IS NULL
      RETURNING id, category_id, title, subtitle as description, image, created_at, updated_at
    `;

    const updateResult = await db.query(updateQuery, [
      category_id,
      title,
      description || null,
      image || null,
      parseInt(id)
    ]);

    // Get the complete data with category name
    const selectQuery = `
      SELECT p.id, c.category, p.title, p.subtitle as description, p.image, p.created_at, p.updated_at, p.category_id
      FROM portfolio p
      LEFT JOIN category c ON p.category_id = c.id
      WHERE p.id = $1
    `;

    const result = await db.query(selectQuery, [parseInt(id)]);

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Portfolio item updated successfully'
    });

  } catch (error) {
    console.error('Portfolio PUT error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update portfolio item' },
      { status: 500 }
    );
  }
}

// DELETE /api/portfolio/[id] - Soft delete portfolio item
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    if (!id || isNaN(parseInt(id))) {
      return NextResponse.json(
        { success: false, error: 'Invalid portfolio ID' },
        { status: 400 }
      );
    }

    // Check if portfolio item exists
    const checkQuery = `SELECT id FROM portfolio WHERE id = $1 AND deleted_at IS NULL`;
    const checkResult = await db.query(checkQuery, [parseInt(id)]);

    if (checkResult.rows.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Portfolio item not found' },
        { status: 404 }
      );
    }

    // Soft delete portfolio item
    const deleteQuery = `
      UPDATE portfolio 
      SET deleted_at = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP
      WHERE id = $1 AND deleted_at IS NULL
      RETURNING id
    `;

    const result = await db.query(deleteQuery, [parseInt(id)]);

    return NextResponse.json({
      success: true,
      message: 'Portfolio item deleted successfully',
      data: { id: result.rows[0].id }
    });

  } catch (error) {
    console.error('Portfolio DELETE error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete portfolio item' },
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