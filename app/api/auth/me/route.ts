import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { decodeToken } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth-token')?.value;

    if (!token) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Token tidak ditemukan' 
        },
        { status: 401 }
      );
    }

    // Decode and validate token
    const payload = decodeToken(token);
    
    if (!payload) {
      return NextResponse.json(
        { 
          success: false, 
          message: 'Token tidak valid atau sudah expired' 
        },
        { status: 401 }
      );
    }

    // Return user data
    return NextResponse.json({
      success: true,
      data: {
        user: {
          id: payload.id,
          email: payload.email,
          name: payload.name,
          role: payload.role
        }
      }
    });

  } catch (error) {
    console.error('Me API Error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Terjadi kesalahan server' 
      },
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
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}