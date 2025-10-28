import bcrypt from 'bcryptjs';
import { db } from './db';

export interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  password_hash: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserResponse {
  id: number;
  email: string;
  name: string;
  role: string;
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 12;
  return await bcrypt.hash(password, saltRounds);
}

// Verify password
export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return await bcrypt.compare(password, hash);
}

// Find user by email
export async function findUserByEmail(email: string): Promise<User | null> {
  try {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    
    if (result.rows.length === 0) {
      return null;
    }
    
    return result.rows[0] as User;
  } catch (error) {
    console.error('Error finding user by email:', error);
    throw error;
  }
}

// Create new user
export async function createUser(
  email: string, 
  password: string, 
  name: string, 
  role: string = 'user'
): Promise<UserResponse> {
  try {
    const passwordHash = await hashPassword(password);
    
    const result = await db.query(
      `INSERT INTO users (email, password_hash, name, role, created_at, updated_at) 
       VALUES ($1, $2, $3, $4, NOW(), NOW()) 
       RETURNING id, email, name, role`,
      [email, passwordHash, name, role]
    );
    
    return result.rows[0] as UserResponse;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
}

// Authenticate user
export async function authenticateUser(email: string, password: string): Promise<UserResponse | null> {
  try {
    const user = await findUserByEmail(email);
    
    if (!user) {
      return null;
    }
    
    const isValidPassword = await verifyPassword(password, user.password_hash);
    
    if (!isValidPassword) {
      return null;
    }
    
    // Return user without password hash
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role
    };
  } catch (error) {
    console.error('Error authenticating user:', error);
    throw error;
  }
}

// Generate JWT token (simple implementation for demo)
export function generateToken(user: UserResponse): string {
  const payload = {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role,
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  };
  
  // In production, use a proper JWT library with secret key
  return Buffer.from(JSON.stringify(payload)).toString('base64');
}

// Decode token
export function decodeToken(token: string): any {
  try {
    const payload = JSON.parse(Buffer.from(token, 'base64').toString());
    
    // Check if token is expired
    if (payload.exp && Date.now() > payload.exp) {
      return null;
    }
    
    return payload;
  } catch (error) {
    return null;
  }
}