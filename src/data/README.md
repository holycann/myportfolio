# Projects Data Structure

This file contains the project data used in the portfolio website. Each project is represented as an object with the following key properties:

## Project Object Structure

```typescript
{
  title: string;                  // Project title
  subtitle: string;               // Short project description
  description: string;            // Detailed project description
  category: string;               // Project category (e.g., SaaS, E-commerce)
  githubUrl: string;              // GitHub repository link
  webUrl: string;                 // Live project website
  githubIcon: React.ReactNode;    // GitHub link icon
  webIcon: React.ReactNode;       // Website link icon
  images: {
    src: string;                  // Image source path
    alt: string;                  // Image alternative text
    device: 'browser' | 'phone' | 'window'; // Device type for display
    deviceColor: string;          // Device color theme
  }[];
  techStack: {
    name: string;                 // Technology name
    icon: string;                 // Technology icon path
  }[];
  features: {
    text: string;                 // Feature description
    icon: React.ReactNode;        // Feature icon
  }[];
  developmentStatus: string;      // Current development stage
  progressStatus: string;         // Project progress status
}
```

## Image and Icon Guidelines

- Images are stored in `/public/images/projects/[project-name]/`
- Tech stack icons are stored in `/public/images/tech/`
- Use React Icons for feature and link icons

## Development Status Options

- `Alpha`: Early development stage
- `Beta`: Feature-complete but not fully tested
- `MVP`: Minimum Viable Product
- `Scaling`: Ready for expansion
- `Completed`: Fully developed and deployed

## Progress Status Options

- `In Progress`
- `In Revision`
- `On Hold`
- `Delivered`
- `Completed`

## Adding New Projects

1. Follow the existing object structure
2. Add project images to the corresponding project folder
3. Use descriptive titles, subtitles, and descriptions
4. Include relevant tech stack and features
5. Choose appropriate development and progress statuses 