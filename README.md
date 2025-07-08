# Personal Portfolio Website

## Overview

This is a modern, responsive personal portfolio website built with Next.js, TypeScript, and Tailwind CSS. The project showcases my professional projects, skills, and experiences with a focus on clean design and smooth animations.

## Tech Stack

- **Framework**: Next.js 14
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Deployment**: Vercel

## Project Structure

```
myportfolio/
├── public/
│   ├── images/
│   │   ├── projects/     # Project screenshots
│   │   └── tech/         # Technology icons
├── src/
│   ├── app/              # Next.js app router
│   ├── components/       # Reusable UI components
│   ├── data/             # Static project and experience data
│   ├── lib/              # Utility functions
│   ├── providers/        # Context providers
│   └── types/            # TypeScript type definitions
```

## Project Data Structure

### Projects

Each project is defined in `src/data/projects.tsx` with a comprehensive structure:

- **Title & Description**: Concise project overview
- **Technologies**: Tech stack used
- **Features**: Key project capabilities
- **Images**: Screenshots across different devices
- **Status**: Development and progress tracking

### Example Project Object

```typescript
{
  title: "Project Name",
  subtitle: "Short Description",
  description: "Detailed Project Overview",
  category: "Project Type",
  githubUrl: "https://github.com/username/project",
  webUrl: "https://project-demo.com",
  images: [
    {
      src: "/images/projects/project/screenshot.png",
      alt: "Project Screenshot",
      device: "browser",
      deviceColor: "blue"
    }
  ],
  techStack: [
    { name: "Next.js", icon: "/images/tech/nextjs.png" }
  ],
  features: [
    { text: "Feature Description", icon: <FeatureIcon /> }
  ],
  developmentStatus: "Beta",
  progressStatus: "In Progress"
}
```

## Performance Optimizations

- Lazy loading of images
- Code splitting
- Minimal external dependencies
- Efficient animations with Framer Motion

## Accessibility & SEO

- Semantic HTML
- ARIA attributes
- Responsive design
- Optimized meta tags
- Sitemap generation

## Development

### Prerequisites

- Node.js 18+
- npm or yarn

### Setup

1. Clone the repository
2. Install dependencies: `npm install`
3. Run development server: `npm run dev`
4. Build for production: `npm run build`

## Deployment

Deployed on Vercel with automatic CI/CD from the main branch.

## License

[MIT License](LICENSE)

## Contact

- Email: [your-email@example.com]
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [Your GitHub Profile]
