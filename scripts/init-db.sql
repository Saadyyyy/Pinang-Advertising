-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Create index on role for filtering
CREATE INDEX IF NOT EXISTS idx_users_role ON users(role);

-- Create portfolio table
CREATE TABLE IF NOT EXISTS portfolio (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL,
    title VARCHAR(255) NOT NULL,
    subtitle VARCHAR(255),
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL
);

-- Create indexes for portfolio table
CREATE INDEX IF NOT EXISTS idx_portfolio_category ON portfolio(category);
CREATE INDEX IF NOT EXISTS idx_portfolio_deleted_at ON portfolio(deleted_at);
CREATE INDEX IF NOT EXISTS idx_portfolio_created_at ON portfolio(created_at);

-- -- Insert demo users
INSERT INTO users (email, password_hash, name, role) VALUES 
    ('admin@example.com', '$2b$12$V27f4w9rNO4ydZjXukM6tub.C9ANR.5Z40hdq4qtDHXOdQHwrL1Ie', 'Admin User', 'admin'),
    ('user@example.com', '$2b$12$V27f4w9rNO4ydZjXukM6tub.C9ANR.5Z40hdq4qtDHXOdQHwrL1Ie', 'Regular User', 'user')
ON CONFLICT (email) DO NOTHING;

-- Insert demo portfolio data
INSERT INTO portfolio (category, title, subtitle, image) VALUES 
    ('Web Development', 'E-Commerce Website', 'Modern online store with payment integration', '/images/portfolio/ecommerce.jpg'),
    ('Mobile App', 'Task Management App', 'iOS and Android productivity application', '/images/portfolio/taskapp.jpg'),
    ('Web Development', 'Corporate Website', 'Professional business website with CMS', '/images/portfolio/corporate.jpg'),
    ('UI/UX Design', 'Dashboard Design', 'Clean and intuitive admin dashboard', '/images/portfolio/dashboard.jpg'),
    ('Mobile App', 'Food Delivery App', 'On-demand food ordering platform', '/images/portfolio/foodapp.jpg')
ON CONFLICT DO NOTHING;

-- Note: The password hash above is for 'secret123' - change this in production!