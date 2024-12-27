/*
  # Initial Schema Setup for Twin Lions Website

  1. Tables
    - services
    - projects
    - testimonials
    - sections
    - verification_codes

  2. Security
    - Enable RLS on all tables
    - Add policies for public read access
    - Add policies for admin write access
*/

-- Services table
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Projects table
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Testimonials table
CREATE TABLE testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  temoignage TEXT NOT NULL,
  image TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Sections table
CREATE TABLE sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  type TEXT NOT NULL CHECK (type IN ('services', 'projects', 'testimonials')),
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Verification codes table
CREATE TABLE verification_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL,
  code TEXT NOT NULL,
  expires_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Allow public read access on services" ON services
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on projects" ON projects
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on testimonials" ON testimonials
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access on sections" ON sections
  FOR SELECT USING (true);

-- Admin policies (will be managed through verification codes)
CREATE POLICY "Allow verified admin write access on services" ON services
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM verification_codes
      WHERE email = 'konzousodea@gmail.com'
      AND expires_at > now()
    )
  );

CREATE POLICY "Allow verified admin write access on projects" ON projects
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM verification_codes
      WHERE email = 'konzousodea@gmail.com'
      AND expires_at > now()
    )
  );

CREATE POLICY "Allow verified admin write access on testimonials" ON testimonials
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM verification_codes
      WHERE email = 'konzousodea@gmail.com'
      AND expires_at > now()
    )
  );

CREATE POLICY "Allow verified admin write access on sections" ON sections
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM verification_codes
      WHERE email = 'konzousodea@gmail.com'
      AND expires_at > now()
    )
  );

-- Function to insert initial data
CREATE OR REPLACE FUNCTION insert_initial_data()
RETURNS void AS $$
BEGIN
  -- Insert services
  INSERT INTO services (title, description, image, sort_order) VALUES
    ('CONSTRUCTIONS DE BÂTIMENTS', 
     'Nous réalisons des projets de construction de bâtiments, allant des structures résidentielles aux complexes commerciaux. De la fondation à la finition, nous garantissons des constructions solides et conformes aux normes les plus élevées en matière de qualité et de sécurité.',
     'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1470&auto=format&fit=crop',
     1),
    ('CONCEPTIONS ARCHITECTURALES',
     'Nous offrons des services complets d''architecture, de la conception initiale à la réalisation des plans détaillés. Nos solutions architecturales sont innovantes, esthétiques et respectueuses des contraintes techniques et environnementales.',
     'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1631&auto=format&fit=crop',
     2);
  
  -- Insert projects
  INSERT INTO projects (title, description, image, sort_order) VALUES
    ('Construction d''une villa R+1 avec piscine et terrain de basket – Nsimalen, Cameroun',
     'Ce projet à Nsimalen comprend une villa R+1 avec 6 chambres, 2 salons spacieux et une cuisine moderne. En plus des espaces de vie confortables, nous avons intégré une piscine privée et un terrain de basket pour les loisirs.',
     'https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1471&auto=format&fit=crop',
     1);

  -- Insert sections
  INSERT INTO sections (title, type, sort_order) VALUES
    ('Nos Services', 'services', 1),
    ('Nos Projets', 'projects', 2),
    ('Témoignages', 'testimonials', 3);
END;
$$ LANGUAGE plpgsql;