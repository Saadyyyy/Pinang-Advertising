import { Pool, PoolClient } from 'pg';

// Create a connection pool
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 20, // Maximum number of clients in the pool
  idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
  connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection could not be established
});

// Database connection wrapper
export class Database {
  private static instance: Database;
  private pool: Pool;

  private constructor() {
    this.pool = pool;
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }

  // Execute a query
  async query(text: string, params?: any[]): Promise<any> {
    const client = await this.pool.connect();
    try {
      const result = await client.query(text, params);
      return result;
    } catch (error) {
      console.error('Database query error:', error);
      throw error;
    } finally {
      client.release();
    }
  }

  // Get a client for transactions
  async getClient(): Promise<PoolClient> {
    return await this.pool.connect();
  }

  // Close all connections
  async close(): Promise<void> {
    await this.pool.end();
  }

  // Test connection
  async testConnection(): Promise<boolean> {
    try {
      const result = await this.query('SELECT NOW()');
      console.log('Database connected successfully:', result.rows[0]);
      return true;
    } catch (error) {
      console.error('Database connection failed:', error);
      return false;
    }
  }
}

// Export singleton instance
export const db = Database.getInstance();

// Helper function for transactions
export async function withTransaction<T>(
  callback: (client: PoolClient) => Promise<T>
): Promise<T> {
  const client = await db.getClient();
  try {
    await client.query('BEGIN');
    const result = await callback(client);
    await client.query('COMMIT');
    return result;
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
}