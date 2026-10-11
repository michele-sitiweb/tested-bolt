/*
# Create products and categories tables for "tested before" re-commerce shop

1. New Tables
- `categories` — product categories (Smartphones, Tablets, Notebooks, etc.)
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `slug` (text, unique, not null)
  - `icon` (text — lucide icon name for display)
  - `sort_order` (int, default 0)
- `products` — individual product listings (used/refurbished electronics)
  - `id` (uuid, primary key)
  - `name` (text, not null)
  - `brand` (text, not null)
  - `category_id` (uuid, FK to categories)
  - `condition` (text: 'new', 'like-new', 'very-good', 'good', 'fair')
  - `price` (numeric, not null)
  - `original_price` (numeric, nullable — for showing savings)
  - `image_url` (text, nullable)
  - `description` (text, nullable)
  - `storage` (text, nullable — e.g. "128GB")
  - `color` (text, nullable)
  - `warranty_months` (int, default 12)
  - `in_stock` (boolean, default true)
  - `created_at` (timestamp, default now())

2. Security
- Enable RLS on both tables.
- This is a no-auth showcase site: allow anon + authenticated to read all data.
- No writes from the frontend (showcase only), so no insert/update/delete policies.
*/

CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  icon text NOT NULL DEFAULT 'Smartphone',
  sort_order int NOT NULL DEFAULT 0
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_categories" ON categories;
CREATE POLICY "anon_read_categories" ON categories FOR SELECT
  TO anon, authenticated USING (true);

CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  brand text NOT NULL,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL,
  condition text NOT NULL DEFAULT 'good',
  price numeric(10,2) NOT NULL,
  original_price numeric(10,2),
  image_url text,
  description text,
  storage text,
  color text,
  warranty_months int NOT NULL DEFAULT 12,
  in_stock boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE products ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_products" ON products;
CREATE POLICY "anon_read_products" ON products FOR SELECT
  TO anon, authenticated USING (true);

-- Seed categories
INSERT INTO categories (name, slug, icon, sort_order) VALUES
  ('Smartphones', 'smartphones', 'Smartphone', 1),
  ('Tablets', 'tablets', 'Tablet', 2),
  ('Notebooks', 'notebooks', 'Laptop', 3),
  ('Smartwatches', 'smartwatches', 'Watch', 4),
  ('Kopfhörer', 'headphones', 'Headphones', 5),
  ('Konsolen', 'consoles', 'Gamepad2', 6),
  ('Kameras', 'cameras', 'Camera', 7)
ON CONFLICT (slug) DO NOTHING;

-- Seed products
INSERT INTO products (name, brand, category_id, condition, price, original_price, image_url, description, storage, color, warranty_months, in_stock) VALUES
  ('iPhone 13', 'Apple', (SELECT id FROM categories WHERE slug='smartphones'), 'like-new', 449.00, 699.00, NULL, 'Gebrauchtes iPhone 13 in hervorragendem Zustand. Akku 90%, keine Kratzer.', '128GB', 'Midnight', 24, true),
  ('iPhone 12', 'Apple', (SELECT id FROM categories WHERE slug='smartphones'), 'very-good', 329.00, 599.00, NULL, 'iPhone 12 mit leichten Gebrauchsspuren. Voll funktionsfähig.', '64GB', 'Schwarz', 18, true),
  ('iPhone 14 Pro', 'Apple', (SELECT id FROM categories WHERE slug='smartphones'), 'like-new', 699.00, 1099.00, NULL, 'iPhone 14 Pro wie neu. Dynamic Island, 48MP Kamera.', '256GB', 'Space Schwarz', 24, true),
  ('Galaxy S22', 'Samsung', (SELECT id FROM categories WHERE slug='smartphones'), 'good', 299.00, 549.00, NULL, 'Samsung Galaxy S22 in gutem Zustand. Inkl. Ladekabel.', '128GB', 'Phantom Weiß', 18, true),
  ('Galaxy S23 Ultra', 'Samsung', (SELECT id FROM categories WHERE slug='smartphones'), 'like-new', 599.00, 899.00, NULL, 'Galaxy S23 Ultra mit S-Pen. 200MP Kamera, wie neu.', '256GB', 'Creame', 24, true),
  ('Pixel 7', 'Google', (SELECT id FROM categories WHERE slug='smartphones'), 'very-good', 349.00, 499.00, NULL, 'Google Pixel 7 in sehr gutem Zustand. Tensor G2 Chip.', '128GB', 'Obsidian', 18, true),
  ('iPhone SE (2022)', 'Apple', (SELECT id FROM categories WHERE slug='smartphones'), 'good', 199.00, 349.00, NULL, 'iPhone SE 3. Gen in gutem Zustand. Kompakt und leistungsstark.', '64GB', 'Rot', 12, true),
  ('Galaxy A54', 'Samsung', (SELECT id FROM categories WHERE slug='smartphones'), 'very-good', 249.00, 379.00, NULL, 'Samsung Galaxy A54 5G. Grosse Akkukapazität, Top-Kamera.', '128GB', 'Lavendel', 12, true),
  ('iPad Air (2022)', 'Apple', (SELECT id FROM categories WHERE slug='tablets'), 'like-new', 459.00, 699.00, NULL, 'iPad Air 5. Gen mit M1 Chip. Wie neu, ohne sichtbare Kratzer.', '64GB', 'Space Grau', 24, true),
  ('iPad Pro 12.9"', 'Apple', (SELECT id FROM categories WHERE slug='tablets'), 'very-good', 749.00, 1099.00, NULL, 'iPad Pro 12.9 Zoll mit M2 Chip und Liquid Retina XDR Display.', '256GB', 'Silber', 24, true),
  ('iPad (10. Gen)', 'Apple', (SELECT id FROM categories WHERE slug='tablets'), 'good', 329.00, 449.00, NULL, 'iPad 10. Generation in gutem Zustand. Ideal für Alltag und Schule.', '64GB', 'Blau', 18, true),
  ('Galaxy Tab S8', 'Samsung', (SELECT id FROM categories WHERE slug='tablets'), 'like-new', 399.00, 599.00, NULL, 'Galaxy Tab S8 mit S-Pen. 11" LCD Display, wie neu.', '128GB', 'Graphite', 18, true),
  ('MacBook Air M2', 'Apple', (SELECT id FROM categories WHERE slug='notebooks'), 'like-new', 899.00, 1299.00, NULL, 'MacBook Air mit M2 Chip, 13 Zoll. Midnight, wie neu.', '256GB', 'Midnight', 24, true),
  ('MacBook Pro 14"', 'Apple', (SELECT id FROM categories WHERE slug='notebooks'), 'very-good', 1299.00, 1999.00, NULL, 'MacBook Pro 14" M1 Pro. Hervorragend für kreatives Arbeiten.', '512GB', 'Space Grau', 24, true),
  ('ThinkPad X1 Carbon', 'Lenovo', (SELECT id FROM categories WHERE slug='notebooks'), 'good', 649.00, 1199.00, NULL, 'Lenovo ThinkPad X1 Carbon Gen 9. Business Laptop in top Zustand.', '512GB', 'Schwarz', 12, true),
  ('Dell XPS 13', 'Dell', (SELECT id FROM categories WHERE slug='notebooks'), 'very-good', 599.00, 999.00, NULL, 'Dell XPS 13 9310. Kompakt, leicht, leistungsstark.', '512GB', 'Platin', 12, true),
  ('Apple Watch Series 8', 'Apple', (SELECT id FROM categories WHERE slug='smartwatches'), 'like-new', 299.00, 449.00, NULL, 'Apple Watch Series 8, 45mm. Wie neu, immer mit Ladekabel.', '41mm', 'Midnight', 12, true),
  ('Apple Watch SE', 'Apple', (SELECT id FROM categories WHERE slug='smartwatches'), 'good', 179.00, 299.00, NULL, 'Apple Watch SE 2. Gen in gutem Zustand.', '40mm', 'Silber', 12, true),
  ('Galaxy Watch 5', 'Samsung', (SELECT id FROM categories WHERE slug='smartwatches'), 'very-good', 189.00, 279.00, NULL, 'Samsung Galaxy Watch 5, 44mm. Gesundheitstracking pro.', '44mm', 'Graphite', 12, true),
  ('AirPods Pro 2', 'Apple', (SELECT id FROM categories WHERE slug='headphones'), 'like-new', 179.00, 279.00, NULL, 'AirPods Pro 2. Gen mit USB-C Lade case. Wie neu.', NULL, 'Weiß', 12, true),
  ('AirPods Max', 'Apple', (SELECT id FROM categories WHERE slug='headphones'), 'very-good', 399.00, 629.00, NULL, 'AirPods Max in sehr gutem Zustand. Spatial Audio, Active Noise Canc.', NULL, 'Space Grau', 12, true),
  ('WH-1000XM5', 'Sony', (SELECT id FROM categories WHERE slug='headphones'), 'like-new', 249.00, 399.00, NULL, 'Sony WH-1000XM5 Over-Ear. Branchenführende Geräuschunterdrückung.', NULL, 'Schwarz', 12, true),
  ('PlayStation 5', 'Sony', (SELECT id FROM categories WHERE slug='consoles'), 'good', 399.00, 549.00, NULL, 'PS5 Disc Edition in gutem Zustand. Inkl. Controller.', '825GB', 'Weiß', 12, true),
  ('Xbox Series X', 'Microsoft', (SELECT id FROM categories WHERE slug='consoles'), 'very-good', 379.00, 499.00, NULL, 'Xbox Series X in sehr gutem Zustand. 1TB SSD.', '1TB', 'Schwarz', 12, true),
  ('Nintendo Switch OLED', 'Nintendo', (SELECT id FROM categories WHERE slug='consoles'), 'like-new', 249.00, 349.00, NULL, 'Nintendo Switch OLED Modell. Wie neu, mit Dock und Joy-Cons.', '64GB', 'Weiß', 12, true),
  ('Canon EOS R6', 'Canon', (SELECT id FROM categories WHERE slug='cameras'), 'very-good', 1299.00, 2099.00, NULL, 'Canon EOS R6 Mirrorless. 20MP Vollformat, sehr gut erhalten.', NULL, 'Schwarz', 12, true),
  ('Sony Alpha 7 IV', 'Sony', (SELECT id FROM categories WHERE slug='cameras'), 'like-new', 1799.00, 2699.00, NULL, 'Sony Alpha 7 IV. 33MP Vollformat, wie neu mit Kit-Objektiv.', NULL, 'Schwarz', 12, true)
ON CONFLICT DO NOTHING;
