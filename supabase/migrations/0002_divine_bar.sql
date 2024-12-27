/*
  # Create storage bucket for images

  1. New Storage Bucket
    - Create a new public bucket named 'images' for storing uploaded images
  2. Security
    - Enable public access to the bucket
    - Add policy for authenticated users to upload images
*/

-- Enable storage
CREATE EXTENSION IF NOT EXISTS "storage";

-- Create a new bucket for images
INSERT INTO storage.buckets (id, name, public)
VALUES ('images', 'images', true);

-- Allow public access to images
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING ( bucket_id = 'images' );

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'images'
  AND auth.role() = 'authenticated'
);