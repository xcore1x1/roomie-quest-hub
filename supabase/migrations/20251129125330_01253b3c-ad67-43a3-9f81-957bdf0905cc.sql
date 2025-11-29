-- Create storage bucket for hostel images
INSERT INTO storage.buckets (id, name, public) VALUES ('hostel-images', 'hostel-images', true);

-- Allow authenticated users to upload images
CREATE POLICY "Users can upload hostel images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'hostel-images' AND auth.uid() IS NOT NULL);

-- Allow public access to view images
CREATE POLICY "Anyone can view hostel images"
ON storage.objects FOR SELECT
USING (bucket_id = 'hostel-images');

-- Allow users to delete their own images
CREATE POLICY "Users can delete their own images"
ON storage.objects FOR DELETE
USING (bucket_id = 'hostel-images' AND auth.uid()::text = (storage.foldername(name))[1]);