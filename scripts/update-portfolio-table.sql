-- Update portfolio table structure to match requested format
-- Add description field and modify existing structure

-- Add description column if it doesn't exist
ALTER TABLE portfolio 
ADD COLUMN IF NOT EXISTS description TEXT;

-- Update existing subtitle data to description (if needed)
-- This will move subtitle content to description field
UPDATE portfolio 
SET description = subtitle 
WHERE description IS NULL AND subtitle IS NOT NULL;

-- Optional: Remove subtitle column if no longer needed
-- ALTER TABLE portfolio DROP COLUMN IF EXISTS subtitle;

-- Update sample data to match new structure
UPDATE portfolio 
SET description = CASE 
    WHEN title = 'E-Commerce Website' THEN 'Modern online store with payment integration and user-friendly interface'
    WHEN title = 'Task Management App' THEN 'iOS and Android productivity application with real-time sync'
    WHEN title = 'Corporate Website' THEN 'Professional business website with content management system'
    WHEN title = 'Dashboard Design' THEN 'Clean and intuitive admin dashboard with data visualization'
    WHEN title = 'Food Delivery App' THEN 'On-demand food ordering platform with GPS tracking'
    ELSE description
END
WHERE description IS NULL OR description = '';

-- Insert sample data matching the requested structure
INSERT INTO portfolio (title, description, image, category) VALUES 
    ('Cafe Nusantara - Neon Box', 'Neon box identitas fasad dengan tampilan bersih dan konsisten warna. Terpasang rapi dengan label tersembunyi sehingga brand terlihat terang dan elegan.', '/hero.png', 'Neon Box & Huruf Timbul')
ON CONFLICT DO NOTHING;

-- Create index on description for better search performance
CREATE INDEX IF NOT EXISTS idx_portfolio_description ON portfolio USING gin(to_tsvector('indonesian', description));

-- Verify the updated structure
-- SELECT id, title, description, image, category, created_at FROM portfolio ORDER BY created_at DESC LIMIT 5;