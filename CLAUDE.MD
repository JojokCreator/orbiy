# Claude Code Configuration

## Package Manager
This project uses **pnpm** as the package manager. Use `pnpm` commands instead of `npm`.

## Development Commands
- `pnpm dev` - Start development server
- `pnpm build` - Build the project (includes type checking)
- `pnpm preview` - Preview the built project
- `pnpm astro` - Run Astro CLI commands

## Project Setup
- Astro v5.11.1 with TypeScript
- Tailwind CSS v4.1.11
- Additional packages: swiper, astro-icon etc.

## Astro Icon Usage
This project uses `astro-icon` for SVG icons. Place icons in `src/icons/` directory and use them as components:

```astro
<Icon name="filename" />
```

For example, for `src/icons/logo.svg`:
```astro
<Icon name="logo" />
```

## Component Scaffolding
Create new Astro components in the `src/components/` directory with `.astro` extension. Components can be either:

### Astro Component (.astro)
```astro
---
// Component logic (TypeScript)
const { title, description } = Astro.props;
---

<!-- Component template using Tailwind classes only -->
<div class="h-screen w-screen bg-white p-4 rounded-lg">
  <h1 class="text-2xl font-bold text-gray-900">{title}</h1>
  <p class="text-gray-600 mt-2">{description}</p>
</div>
```

### Styling Guidelines
- **Use Tailwind utility classes** for all styling (preferred approach)
- **Avoid `<style>` tags** unless absolutely necessary
- **Use CSS variables** from `src/styles/global.css` when custom values are needed:
  ```css
  /* In global.css */
  @theme {
    --font-sans: var(--font-poppins);
    --color-black: oklch(10.98% 0.01 270.31);
    --color-white: oklch(0.9581 0 0);
    --color-light-gray: oklch(0.8545 0 0);
  }
  ```
- **Apply variables** using Tailwind:
  ```astro
  <div class="bg-white text-black">
    Content
  </div>
  ```

### Layout Components
For reusable layouts, place in `src/layouts/` directory.

### Component Organization
- `src/components/` - Main components
- `src/components/reusable/` - Reusable UI components
- `src/icons/` - SVG icons for use with astro-icon

### SEO Structured Data Implementation

All pages now include comprehensive structured data for Google rich snippets:

**Implemented Rich Snippets:**
- **Organization schema** - Homepage with business info, services catalog, social links
- **Service schema** - Primary service pages with detailed service offerings
- **FAQ schema** - All pages with FAQ sections (FAQ.astro, FAQComponent.astro, contact, AI benchmark)  
- **Breadcrumb schema** - Blog and app detail pages with navigation paths
- **BlogPosting schema** - Blog articles with enhanced author, publisher, and metadata
- **SoftwareApplication schema** - App showcase pages with technical details
- **Person schema** - Author profiles with job titles, images, social links

**Reusable Components Created:**
- `BreadcrumbStructuredData.astro` - For navigation-rich snippets
- `OrganizationStructuredData.astro` - For business/brand recognition  

### DRY (Don't Repeat Yourself) Principles

1. **Component Reusability**:

   - Extract common UI patterns into `/src/components/reusable/`
   - Use composition over duplication for similar layouts
   - Create shared utility functions for common operations
   - Leverage Astro's component slots for flexible content insertion

2. **Shared Components Strategy**:

   - **Atoms**: Basic building blocks (buttons, inputs, icons) in `/src/components/reusable/atoms/`
   - **Molecules**: Combinations of atoms (cards, form groups) in `/src/components/reusable/molecules/`
   - **Organisms**: Complex components (headers, sections) in `/src/components/reusable/organisms/`
   - Use TypeScript interfaces for consistent prop types across components

3. **Style Sharing**:
   - Define common Tailwind utilities in `tailwind.config.mjs`
   - Create CSS component classes for frequently used combinations
   - Use CSS custom properties for theme values that change across contexts

### Mobile Optimization

1. **Responsive Design**:

   - Mobile-first approach: Start with mobile styles, enhance for larger screens
   - Use Tailwind's responsive utilities (sm:, md:, lg:, xl:, 2xl:)
   - Test all breakpoints: 320px, 375px, 768px, 1024px, 1440px
   - Avoid horizontal scrolling at all costs

2. **Touch Optimization**:

   - Minimum touch target size: 44x44px (Apple HIG) or 48x48px (Material Design)
   - Add appropriate spacing between interactive elements
   - Use `hover:` states only with `lg:` prefix for desktop-only interactions

3. **Performance on Mobile**:
   - Lazy load images below the fold using `loading="lazy"`
   - Use responsive images with srcset for different screen densities
   - Minimize JavaScript execution on mobile devices
   - Consider reduced motion preferences with `prefers-reduced-motion`

### Page Load Speed Optimization

1. **Asset Optimization**:

   - Use WebP/AVIF formats for images with fallbacks
   - Implement critical CSS inlining for above-the-fold content
   - Defer non-critical JavaScript with `defer` or `async` attributes
   - Preload critical fonts and hero images

2. **Code Splitting**:

   - Use dynamic imports for large components
   - Implement route-based code splitting
   - Load third-party scripts only when needed

3. **Performance Metrics**:
   - Target Core Web Vitals: LCP < 2.5s, FID < 100ms, CLS < 0.1
   - Optimize Time to First Byte (TTFB) < 600ms
   - Keep total page weight under 1MB for mobile
   - Use Lighthouse CI for continuous monitoring

**Implementation Guidelines:**
- **FAQ sections**: Always include FAQ schema using FAQ.astro or FAQComponent.astro
- **Navigation paths**: Use BreadcrumbStructuredData.astro on detail pages (blogs, apps, services)
- **Service pages**: Include serviceSchema frontmatter for featured services
- **Blog posts**: Author should be a reference (string) to author collection, not embedded data
- **Contact/landing pages**: Include Organization schema where appropriate

## SEO Structure

1. **Semantic HTML**:

   - Use proper heading hierarchy (h1 → h2 → h3)
   - Only one h1 per page
   - Use semantic elements (nav, main, article, section, aside)
   - Include skip navigation links for accessibility

2. **Meta Information**:

   - Unique, descriptive title tags (50-60 characters)
   - Compelling meta descriptions (150-160 characters)
   - Open Graph tags for social sharing
   - Structured data (JSON-LD) for rich snippets

3. **Technical SEO**:

   - Implement canonical URLs for duplicate content
   - Use descriptive, keyword-rich URLs
   - Create XML sitemap (already configured)
   - Ensure proper 301 redirects for moved content
   - Add hreflang tags for international content (if applicable)

4. **Content Optimization**:
   - Focus on user intent and search queries
   - Use descriptive alt text for all images
   - Implement internal linking strategy
   - Keep content fresh with regular updates

   ### Component Development Checklist

When creating new components:

- [ ] Mobile-first responsive design
- [ ] Accessibility (ARIA labels, keyboard navigation)
- [ ] Performance (lazy loading, code splitting)
- [ ] SEO (semantic HTML, meta tags)
- [ ] Reusability (props, slots, composition)
- [ ] Documentation (TypeScript types, comments)
- [ ] Text highlighting follows the pattern (bold for outcomes, underline for metrics)

## Animations
This project uses **tailwindcss-motion** for animations (preferred over other animation libraries).

### Animation Guidelines
- **Use tailwindcss-motion classes** for all animations
- **Avoid custom CSS animations** unless absolutely necessary
- **Use built-in animation utilities** like `motion-preset-slide-left motion-delay-[1300ms] motion-ease-spring-bouncier`, etc.

### Common Animation Classes
```astro
<!-- Fade in animation -->
<div class="motion-preset-fade-in">Content</div>

<!-- Slide in animation -->
<div class="motion-preset-slide-left">Content</div>

<!-- Bounce animation -->
<div class="motion-preset-bounce">Content</div>

<!-- Pulse animation -->
<div class="motion-preset-pulse">Content</div>

<!-- With delay and easing -->
<div class="motion-preset-fade-in motion-delay-[1300ms] motion-ease-spring-bouncier">Content</div>
```

### Animation Configuration
Animations are configured in `astro.config.mjs` using the tailwindcss-motion plugin.

### Intersection Observer Usage
Use the `intersect:` variant for animations triggered when elements come into view. This is particularly useful for sections below the fold:

```astro
<!-- Animate when element comes into view -->
<div class="motion-preset-fade-in intersect:animate-fade-in">Content</div>

<!-- Style changes on intersection -->
<div class="bg-cyan-500 intersect:bg-indigo-600 transition-colors">Content</div>

<!-- Complex animation with intersection -->
<div class="motion-preset-slide-left intersect:motion-preset-slide-right motion-delay-[1300ms]">Content</div>
```

**Best Practice:** Apply intersection animations to any section that appears below the fold to improve perceived performance and user experience.

## Content Collections

This project uses Astro's Content Collections API for managing structured content like blog posts, cars, and other data types.

### Content Collection Configuration
Content collections are configured in `src/content.config.ts` using the `defineCollection()` function from `astro:content`.

### Structure
- `src/content.config.ts` - Collection definitions and schemas
- `src/content/[collection-name]/` - Content files (markdown, JSON, YAML)

### Cars Collection Example
```typescript
// src/content.config.ts
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const cars = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/cars' }),
  schema: z.object({
    title: z.string(),
    price: z.string(),
    description: z.string(),
    image: z.object({
      src: z.image(), // Use z.image() for optimized images
      alt: z.string(),
    }),
    features: z.array(z.string()),
    featured: z.boolean().default(false),
  }),
});

export const collections = { cars };
```

### Image Handling with Content Collections
- Use `z.image()` for image fields to enable Astro's built-in image optimization
- Image paths should be relative to the content file location
- Images are automatically optimized and processed during build

### Querying Collections
```astro
---
import { getCollection, getEntry } from 'astro:content';

// Get all entries from a collection
const allCars = await getCollection('cars');

// Filter entries
const featuredCars = allCars.filter(car => car.data.featured);

// Get single entry
const specificCar = await getEntry('cars', 'car-id');
---
```

### Content File Structure
```yaml
---
title: "Car Name"
price: "$100,000"
description: "Car description"
image:
  src: "../../images/car-image.jpg" # Relative path
  alt: "Car image description"
features:
  - "Feature 1"
  - "Feature 2"
featured: true
---

Car content in markdown...
```

## Storyblok Integration

This project integrates with Storyblok CMS for headless content management.

### Storyblok Configuration
- API configuration in `astro.config.mjs`
- Content types defined in Storyblok workspace
- Components map to Storyblok blok types

### Storyblok Component Structure
Storyblok components are located in `src/storyblok/` and follow this pattern:

```astro
---
import { storyblokEditable } from "@storyblok/astro";

const { blok } = Astro.props;
const { title, description, button } = blok;
---

<section {...storyblokEditable(blok)}>
  <h2>{title}</h2>
  <p>{description}</p>
  {button && (
    <a href={button.url}>{button.text}</a>
  )}
</section>
```

### Key Storyblok Concepts

1. **Editable Function**: Always use `{...storyblokEditable(blok)}` on the root element for visual editor support

2. **Content Structure**: Storyblok content is accessed via the `blok` prop containing all field values

3. **Link Resolution**: Use proper link resolution for Storyblok links:
   ```astro
   link={item.link?.cached_url || item.link?.url || '#'}
   ```

4. **Image Handling**: Storyblok images are typically in the format:
   ```astro
   {image.filename && (
     <img src={image.filename} alt={image.alt} />
   )}
   ```

### Common Storyblok Components

- **Hero**: Full-screen hero sections with background images
- **Features**: Feature lists with icons and descriptions
- **Cards**: Reusable card components for showcasing items
- **Buttons**: CTA buttons with various styles
- **Navigation**: Header and navigation components

### Storyblok Best Practices

1. **Always use `storyblokEditable()`** for visual editor compatibility
2. **Handle missing content gracefully** with fallbacks
3. **Use proper TypeScript types** for content props
4. **Implement proper link resolution** for internal/external links
5. **Use content collections** when possible for better performance and type safety

### Combining Storyblok with Content Collections

You can combine Storyblok CMS with Astro content collections for hybrid approaches:

```astro
---
import { getCollection } from 'astro:content';
import { storyblokEditable } from "@storyblok/astro";

const { blok } = Astro.props;
const featuredCars = await getCollection('cars', (car) => car.data.featured);
---

<section {...storyblokEditable(blok)}>
  <h2>{blok.title}</h2>
  {featuredCars.map(car => (
    <div>{car.data.title}</div>
  ))}
</section>
```

### Link Resolution in Storyblok

When working with Storyblok links, use this pattern for proper URL resolution:

```astro
---
const resolveLink = (link) => {
  if (!link) return '#';
  return link.cached_url || link.url || '#';
};
---

<a href={resolveLink(button.link)}>
  {button.text}
</a>
```

This ensures compatibility with both draft and published content states.