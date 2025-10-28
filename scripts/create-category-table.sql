-- Create category table
CREATE TABLE IF NOT EXISTS category (
    id SERIAL PRIMARY KEY,
    category VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index on category name for faster lookups
CREATE INDEX IF NOT EXISTS idx_category_name ON category(category);

-- Insert default categories
INSERT INTO category (category) VALUES 
    ('Web Development'),
    ('Mobile App'),
    ('UI/UX Design'),
    ('Backend Development'),
    ('Full Stack'),
    ('E-commerce'),
    ('Landing Page'),
    ('Dashboard'),
    ('Neon Box & Huruf Timbul'),
    ('Other')
ON CONFLICT (category) DO NOTHING;