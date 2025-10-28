import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';

// GET /api/portfolio - Get all portfolio items
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const offset = (page - 1) * limit;

    let query = `
      SELECT p.id, c.category, p.title, p.subtitle as description, p.image, p.created_at, p.updated_at, p.category_id
      FROM portfolio p
      LEFT JOIN category c ON p.category_id = c.id
      WHERE p.deleted_at IS NULL
    `;
    const params: any[] = [];

    // Filter by category if provided
    if (category) {
      query += ` AND c.category = $${params.length + 1}`;
      params.push(category);
    }

    // Add ordering and pagination
    query += ` ORDER BY created_at DESC LIMIT $${params.length + 1} OFFSET $${params.length + 2}`;
    params.push(limit, offset);

    const result = await db.query(query, params);

    // Get total count for pagination
    let countQuery = `
      SELECT COUNT(*) 
      FROM portfolio p
      LEFT JOIN category c ON p.category_id = c.id
      WHERE p.deleted_at IS NULL
    `;
    const countParams: any[] = [];
    
    if (category) {
      countQuery += ` AND c.category = $1`;
      countParams.push(category);
    }

    const countResult = await db.query(countQuery, countParams);
    const total = parseInt(countResult.rows[0].count);

    return NextResponse.json({
      success: true,
      data: result.rows,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    });

  } catch (error) {
    console.error('Portfolio GET error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch portfolio items' },
      { status: 500 }
    );
  }
}

// POST /api/portfolio - Create new portfolio item
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { category_id, title, description, image } = body;

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

    const insertQuery = `
      INSERT INTO portfolio (category_id, title, subtitle, image, created_at, updated_at)
      VALUES ($1, $2, $3, $4, NOW(), NOW())
      RETURNING id, category_id, title, subtitle as description, image, created_at, updated_at
    `;

    const insertResult = await db.query(insertQuery, [
      category_id,
      title,
      description || null, // This will be stored in subtitle column
      image || null
    ]);

    // Get the complete data with category name
    const selectQuery = `
      SELECT p.id, c.category, p.title, p.subtitle as description, p.image, p.created_at, p.updated_at, p.category_id
      FROM portfolio p
      LEFT JOIN category c ON p.category_id = c.id
      WHERE p.id = $1
    `;

    const result = await db.query(selectQuery, [insertResult.rows[0].id]);

    return NextResponse.json({
      success: true,
      data: result.rows[0],
      message: 'Portfolio item created successfully'
    }, { status: 201 });

  } catch (error) {
    console.error('Portfolio POST error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create portfolio item' },
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