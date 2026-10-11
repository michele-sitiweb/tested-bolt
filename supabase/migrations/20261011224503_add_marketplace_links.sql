/*
# Add Amazon/eBay links to products

1. Modified Tables
- `products`: adds `amazon_url` (text, nullable) and `ebay_url` (text, nullable)
  These store direct links to the product listings on Amazon and eBay.
2. Security
- No RLS changes needed (already allows anon read).
3. Notes
- No data is lost — columns are additive.
*/

ALTER TABLE products ADD COLUMN IF NOT EXISTS amazon_url text;
ALTER TABLE products ADD COLUMN IF NOT EXISTS ebay_url text;

-- Populate with sample Amazon/eBay search URLs based on product name
UPDATE products SET
  amazon_url = 'https://www.amazon.de/s?k=' || replace(encode(convert_to(name, 'UTF8'), 'hex'), '%', '%25')
WHERE amazon_url IS NULL;

UPDATE products SET
  ebay_url = 'https://www.ebay.de/sch/i.html?_nkw=' || replace(encode(convert_to(name, 'UTF8'), 'hex'), '%', '%25')
WHERE ebay_url IS NULL;
