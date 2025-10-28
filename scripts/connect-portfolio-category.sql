-- Script to connect portfolio table with category table using foreign key
-- This will replace the string-based category field with category_id foreign key

-- Step 1: Add category_id column to portfolio table
ALTER TABLE portfolio 
ADD COLUMN IF NOT EXISTS category_id INTEGER;

-- Step 2: Update existing portfolio records to use category_id instead of category string
-- Match existing category strings with category table IDs
UPDATE portfolio 
SET category_id = c.id 
FROM category c 
WHERE portfolio.category = c.category 
AND portfolio.category_id IS NULL;

-- Step 3: Handle any portfolio records that don't have matching categories
-- Insert missing categories into category table first
INSERT INTO category (category)
SELECT DISTINCT p.category
FROM portfolio p
LEFT JOIN category c ON p.category = c.category
WHERE c.id IS NULL AND p.category IS NOT NULL AND p.category != ''
ON CONFLICT (category) DO NOTHING;

-- Step 4: Update remaining portfolio records with new category IDs
UPDATE portfolio 
SET category_id = c.id 
FROM category c 
WHERE portfolio.category = c.category 
AND portfolio.category_id IS NULL;

-- Step 5: Add foreign key constraint
ALTER TABLE portfolio 
ADD CONSTRAINT fk_portfolio_category 
FOREIGN KEY (category_id) REFERENCES category(id) ON DELETE SET NULL;

-- Step 6: Create index for better performance
CREATE INDEX IF NOT EXISTS idx_portfolio_category_id ON portfolio(category_id);

-- Step 7: Verify the connection
-- SELECT p.id, p.title, p.category as old_category, c.category as new_category, p.category_id
-- FROM portfolio p
-- LEFT JOIN category c ON p.category_id = c.id
-- ORDER BY p.id;

-- Optional: After verification, you can remove the old category column
-- ALTER TABLE portfolio DROP COLUMN IF EXISTS category;

-- Note: Keep the old category column for now to ensure data integrity
-- You can remove it later after confirming everything works correctly