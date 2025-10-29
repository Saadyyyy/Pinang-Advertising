-- Fix portfolio table schema issue
-- Remove NOT NULL constraint from category column since we're using category_id now

-- Step 1: Remove NOT NULL constraint from category column
ALTER TABLE portfolio 
ALTER COLUMN category DROP NOT NULL;

-- Step 2: Update existing records to populate category from category_id
UPDATE portfolio 
SET category = c.category 
FROM category c 
WHERE portfolio.category_id = c.id 
AND portfolio.category IS NULL;

-- Step 3: Verify the fix
-- SELECT p.id, p.category, p.category_id, c.category as category_name, p.title 
-- FROM portfolio p 
-- LEFT JOIN category c ON p.category_id = c.id 
-- ORDER BY p.id DESC LIMIT 10;

-- Note: The category column is now optional and will be populated from category_id relationship
-- This maintains backward compatibility while allowing the API to work with category_id