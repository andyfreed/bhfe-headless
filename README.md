# BHFE Headless Frontend

A headless Next.js frontend for Beacon Hill Financial Educators, powered by Faust.js and WPGraphQL.

## Tech Stack

- **Next.js 14** - React framework with App Router
- **Faust.js** - WordPress headless framework
- **Apollo Client** - GraphQL client
- **Tailwind CSS** - Utility-first CSS
- **TypeScript** - Type safety

## Getting Started

### Prerequisites

1. WordPress with required plugins (see [docs/wp-setup.md](docs/wp-setup.md))
2. Node.js 18+ 
3. npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Copy environment variables
cp env.local.example .env.local

# Edit .env.local with your WordPress URL and Faust secret key
```

### Development

```bash
# Start development server
npm run dev

# Open http://localhost:3000
```

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm run start
```

## Project Structure

```
frontend/
├── src/
│   ├── app/                  # Next.js App Router pages
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Homepage
│   │   └── courses/          # Courses listing
│   ├── components/           # React components
│   ├── lib/                  # Utilities
│   │   └── apollo-client.ts  # GraphQL client setup
│   ├── queries/              # GraphQL queries
│   ├── styles/               # Global styles
│   │   └── globals.css       # Tailwind + custom CSS
│   └── wp-templates/         # Faust.js templates
│       ├── index.ts          # Template registry
│       ├── page.tsx          # Page template
│       ├── single.tsx        # Post template
│       └── single-flms-course.tsx  # Course template
├── docs/
│   └── wp-setup.md           # WordPress setup guide
├── faust.config.js           # Faust.js configuration
├── next.config.js            # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
└── env.local.example         # Environment variables template
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_WORDPRESS_URL` | WordPress site URL (no trailing slash) |
| `FAUST_SECRET_KEY` | Secret key from WP Admin > Settings > Faust |

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm run generate` | Generate Faust.js possibleTypes |

## GraphQL Queries

Pre-built queries are available in `src/queries/`:

- `courses.ts` - FLMS course queries
- More to be added...

## Faust.js Templates

Templates in `src/wp-templates/` map to WordPress template hierarchy:

| Template | WordPress Equivalent |
|----------|---------------------|
| `front-page.tsx` | Front page |
| `page.tsx` | Static pages |
| `single.tsx` | Blog posts |
| `single-flms-course.tsx` | Course single |
| `archive.tsx` | Archive pages |

## Styling

- Uses Tailwind CSS with custom BHFE brand colors
- Playfair Display for headings
- Inter for body text
- Custom utility classes in `globals.css`

## Documentation

- [WordPress Setup Guide](docs/wp-setup.md)
- [Content Model](../app/public/docs/content-model.md)
- [ACF Fields](../app/public/acf-fields.md)

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Other Platforms

Build and deploy the `.next` folder to any Node.js hosting platform.

## License

Private - Beacon Hill Financial Educators

