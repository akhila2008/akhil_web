-- Supabase Schema for Floraa Events

-- 1. DECORATIONS TABLE (Gallery Designs)
CREATE TABLE IF NOT EXISTS public.decorations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    occasion TEXT NOT NULL,
    category TEXT NOT NULL,
    price INTEGER NOT NULL,
    status TEXT NOT NULL DEFAULT 'Active',
    image_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. CUSTOM DECORATION REQUESTS TABLE
CREATE TABLE IF NOT EXISTS public.custom_decoration_requests (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID, -- References auth.users later
    customer_name TEXT NOT NULL,
    event_type TEXT NOT NULL,
    image_url TEXT NOT NULL,
    description TEXT,
    event_date DATE NOT NULL,
    venue TEXT NOT NULL,
    additional_requirements TEXT,
    status TEXT NOT NULL DEFAULT 'PENDING_REVIEW', -- PENDING_REVIEW, QUOTATION_READY, CUSTOMER_ACCEPTED, COMPLETED, REJECTED
    admin_price INTEGER, -- Starts as NULL
    admin_notes TEXT,
    reviewed_by UUID,
    reviewed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Set up Row Level Security (RLS)
ALTER TABLE public.decorations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.custom_decoration_requests ENABLE ROW LEVEL SECURITY;

-- Policies for decorations
CREATE POLICY "Allow public read access on decorations" 
ON public.decorations FOR SELECT USING (true);

-- Policies for custom requests
CREATE POLICY "Allow public insert on custom_requests" 
ON public.custom_decoration_requests FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public read on own requests" 
ON public.custom_decoration_requests FOR SELECT USING (true); -- Simplified for mock

-- Insert some initial mock data for decorations
INSERT INTO public.decorations (name, occasion, category, price, status, image_url) VALUES
('Royal Marigold Stage', 'Haldi', 'Stage', 35000, 'Active', '/haldi.jpg'),
('Pastel Dream Canopy', 'Birthday', 'Ceiling', 22000, 'Active', '/birthday.jpg'),
('Ivory & Champagne Arch', 'Wedding', 'Entrance', 45000, 'Active', '/wedding.jpg'),
('Blush Rose Backdrop', 'Engagement', 'Backdrop', 28000, 'Active', '/engagement.jpg'),
('Deep Burgundy Romance', 'Anniversary', 'Floral', 40000, 'Active', '/anniversary.jpg'),
('Fairy Light Canopy', 'Reception', 'Lighting', 30000, 'Active', '/reception.jpg'),
('Terracotta Home Setup', 'Housewarming', 'Stage', 18000, 'Active', '/housewarming.jpg'),
('Soft Baby Blue Florals', 'Baby Shower', 'Backdrop', 25000, 'Active', '/baby-shower.jpg');
