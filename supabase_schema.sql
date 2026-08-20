-- Supabase Schema for Floraa Events

-- Create the decorations table
CREATE TABLE IF NOT EXISTS public.decorations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    occasion TEXT NOT NULL,
    category TEXT NOT NULL,
    price INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.decorations ENABLE ROW LEVEL SECURITY;

-- Create policies (For this simple demo, we'll allow public read access)
CREATE POLICY "Allow public read access on decorations" 
ON public.decorations FOR SELECT USING (true);

-- Allow authenticated admins to insert/update/delete (Needs auth setup)
-- CREATE POLICY "Allow admin to insert" ON public.decorations FOR INSERT WITH CHECK (auth.role() = 'authenticated');
-- CREATE POLICY "Allow admin to update" ON public.decorations FOR UPDATE USING (auth.role() = 'authenticated');
-- CREATE POLICY "Allow admin to delete" ON public.decorations FOR DELETE USING (auth.role() = 'authenticated');

-- Insert some initial mock data
INSERT INTO public.decorations (name, occasion, category, price, status) VALUES
('Royal Marigold Stage', 'Haldi', 'Stage', 35000, 'Active'),
('Pastel Dream Canopy', 'Birthday', 'Ceiling', 22000, 'Active'),
('Ivory & Champagne Arch', 'Wedding', 'Entrance', 45000, 'Active');
