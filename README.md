# Classik Woods - Carpenter Portfolio Website

A modern, responsive portfolio website for a master carpenter built with Next.js, TailwindCSS, and Supabase.

## Features

- **Homepage**: Hero section, about, services, and call-to-action
- **Portfolio Gallery**: Responsive grid layout with filtering and search
- **Contact Form**: Direct contact with form validation
- **Booking System**: Detailed service booking with project specifications
- **Admin Portal**: Content management for projects and submissions
- **Mobile-First Design**: Fully responsive across all devices
- **Performance Optimized**: Fast loading with lazy loading images

## Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: TailwindCSS with custom design system
- **Backend**: Supabase (PostgreSQL database, authentication, storage)
- **Forms**: React Hook Form with validation
- **Icons**: Lucide React
- **Deployment**: Vercel/Netlify ready

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Supabase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd classikwoods
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   ```
   
   Fill in your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

4. **Set up Supabase database**
   - Create a new Supabase project
   - Run the SQL schema from `supabase-schema.sql` in your Supabase SQL Editor
   - Enable Row Level Security policies

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Project Structure

```
classikwoods/
├── app/                    # Next.js 13+ app directory
│   ├── booking/           # Service booking page
│   ├── contact/           # Contact page
│   ├── portfolio/         # Portfolio gallery
│   ├── admin/             # Admin portal (future)
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # Reusable components
│   ├── Navigation.tsx     # Main navigation
│   └── Footer.tsx         # Site footer
├── lib/                   # Utility libraries
│   └── supabase.ts        # Supabase client & types
├── public/                # Static assets
├── supabase-schema.sql    # Database schema
└── README.md              # This file
```

## Database Schema

The application uses the following main tables:

- **projects**: Portfolio project data
- **contact_submissions**: Contact form submissions
- **booking_submissions**: Service booking requests
- **admin_users**: Admin authentication (future)

## Customization

### Brand Colors

The design uses a custom color palette defined in `tailwind.config.js`:

- **Wood tones**: Warm browns representing craftsmanship
- **Sage greens**: Natural, calming accent colors

### Content Updates

1. **Contact Information**: Update in `components/Footer.tsx` and `app/contact/page.tsx`
2. **Services**: Modify the services array in `app/page.tsx`
3. **About Content**: Edit the about section in `app/page.tsx`
4. **Meta Tags**: Update SEO information in `app/layout.tsx`

### Adding Images

1. Add images to the `public/images/` directory
2. Update image references in components
3. For portfolio images, update the `image_url` field in the database

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

### Netlify

1. Build the project: `npm run build`
2. Deploy the `out` folder to Netlify
3. Add environment variables in Netlify dashboard

## Admin Portal (Future Enhancement)

The admin portal will include:

- Project management (add, edit, delete)
- Form submission management
- Image upload and management
- Analytics dashboard

## Performance Optimizations

- Next.js Image component for optimized images
- Lazy loading for portfolio gallery
- TailwindCSS purging for minimal CSS
- Static generation where possible

## SEO Features

- Semantic HTML structure
- Meta tags and Open Graph
- Structured data for local business
- Fast loading times
- Mobile-first responsive design

## Support

For support or questions:

- Email: info@classikwoods.com
- Phone: (555) 123-4567

## License

This project is proprietary and confidential.

---

Built with ❤️ for quality craftsmanship and modern web standards.
