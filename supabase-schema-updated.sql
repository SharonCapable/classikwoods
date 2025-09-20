-- Updated Classik Woods Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Create projects table
CREATE TABLE IF NOT EXISTS projects (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT,
    materials VARCHAR(255),
    project_type VARCHAR(50) NOT NULL CHECK (project_type IN ('furniture', 'cabinets', 'built-ins', 'restoration', 'other')),
    client_story TEXT,
    featured BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded', 'archived')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create booking_submissions table with scheduled_date
CREATE TABLE IF NOT EXISTS booking_submissions (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    project_type VARCHAR(50) NOT NULL,
    preferred_date DATE NOT NULL,
    scheduled_date DATE,
    budget VARCHAR(50) NOT NULL,
    message TEXT,
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed', 'cancelled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add scheduled_date column if it doesn't exist (for existing tables)
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns 
                   WHERE table_name = 'booking_submissions' AND column_name = 'scheduled_date') THEN
        ALTER TABLE booking_submissions ADD COLUMN scheduled_date DATE;
    END IF;
END $$;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_projects_type ON projects(project_type);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at);
CREATE INDEX IF NOT EXISTS idx_contact_status ON contact_submissions(status);
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_booking_status ON booking_submissions(status);
CREATE INDEX IF NOT EXISTS idx_booking_created_at ON booking_submissions(created_at);
CREATE INDEX IF NOT EXISTS idx_booking_scheduled_date ON booking_submissions(scheduled_date);

-- Enable Row Level Security
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE booking_submissions ENABLE ROW LEVEL SECURITY;

-- Create policies for public access to projects (read-only)
CREATE POLICY "Public can view projects" ON projects
    FOR SELECT USING (true);

-- Create policies for form submissions (insert-only for public)
CREATE POLICY "Anyone can submit contact forms" ON contact_submissions
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can submit booking forms" ON booking_submissions
    FOR INSERT WITH CHECK (true);

-- Admin policies using Supabase Auth
CREATE POLICY "Authenticated users can manage projects" ON projects
    FOR ALL USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view contact submissions" ON contact_submissions
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can view booking submissions" ON booking_submissions
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update booking submissions" ON booking_submissions
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_projects_updated_at BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_booking_submissions_updated_at BEFORE UPDATE ON booking_submissions
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert sample projects (optional)
INSERT INTO projects (title, description, image_url, materials, project_type, client_story, featured) VALUES
('Custom Dining Table', 'Handcrafted walnut dining table with live edge design', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', 'Walnut, Steel', 'furniture', 'Created for a family who wanted a centerpiece for their dining room that would last generations.', true),
('Kitchen Cabinet Set', 'Complete kitchen renovation with custom cabinetry', 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800', 'Oak, Brass Hardware', 'cabinets', 'A complete kitchen transformation that maximized storage while maintaining a classic aesthetic.', false),
('Built-in Bookshelf', 'Floor-to-ceiling built-in library with reading nook', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800', 'Cherry Wood, LED Lighting', 'built-ins', 'Custom library solution that turned an unused corner into a cozy reading space.', true),
('Antique Chair Restoration', 'Victorian era chair brought back to original beauty', 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800', 'Original Mahogany, New Upholstery', 'restoration', 'A family heirloom restored to its former glory with careful attention to historical accuracy.', false);
