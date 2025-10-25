# Creating a New Storyblok Component (Blok)

This guide walks you through creating a new Storyblok component from scratch in the ORBiY project.

## Step 1: Define the Component Schema

First, add your component schema to the `.storyblok/components/288025125330867/components.json` file:

```json
{
  "name": "ComponentName",
  "display_name": "Component Display Name",
  "is_root": false,
  "is_nestable": true,
  "component": "ComponentName",
  "schema": {
    "title": {
      "type": "text",
      "display_name": "Title"
    },
    "description": {
      "type": "richtext",
      "display_name": "Description"
    }
  }
}
```

### Common Field Types:
- **text**: Simple text input
- **richtext**: Rich text editor
- **textarea**: Multi-line text
- **image**: Image upload
- **asset**: File upload (video, PDF, etc.)
- **multilink**: Internal/external link selector
- "options": Radio buttons or dropdown
- **boolean**: Checkbox for true/false values
- **number**: Numeric input

## Step 2: Create the Astro Component

Create a new file in `src/storyblok/ComponentName.astro`:

```astro
---
import { storyblokEditable } from "@storyblok/astro";

const { blok } = Astro.props;
const { title, description } = blok;
---

<section {...storyblokEditable(blok)} class="py-12 bg-white">
  <div class="site-container">
    <h2 class="text-3xl font-bold text-gray-900 mb-6">
      {title}
    </h2>
    <div class="prose prose-lg max-w-none">
      {@html description}
    </div>
  </div>
</section>
```

### Required Elements:
1. **Import storyblokEditable**: `import { storyblokEditable } from "@storyblok/astro"`
2. **Destructure blok props**: `const { blok } = Astro.props`
3. **Add storyblokEditable**: `{...storyblokEditable(blok)}` on the root element
4. **Access field values**: Use `blok.fieldName` to access data

## Step 3: Register Component in Astro Config

Add your component to the `astro.config.mjs` file:

```javascript
storyblok({
  accessToken: env.STORYBLOK_TOKEN,
  livePreview: isDev ? true : false,
  components: {
    block: "storyblok/ComponentName", // Add this line
    // ... other components
  },
  enableFallbackComponent: isDev ? true : false,
  customFallbackComponent: 'storyblok/FallbackComponent',
  // ...
})
```

## Component Examples

### Simple Text Component
```json
{
  "name": "SimpleText",
  "display_name": "Simple Text",
  "schema": {
    "content": {
      "type": "textarea",
      "display_name": "Content"
    }
  }
}
```

```astro
---
import { storyblokEditable } from "@storyblok/astro";
const { blok } = Astro.props;
---

<div {...storyblokEditable(blok)} class="prose">
  <p>{blok.content}</p>
</div>
```

### Component with Image
```json
{
  "name": "ImageText",
  "display_name": "Image with Text",
  "schema": {
    "image": {
      "type": "image",
      "display_name": "Image"
    },
    "title": {
      "type": "text",
      "display_name": "Title"
    },
    "description": {
      "type": "richtext",
      "display_name": "Description"
    }
  }
}
```

```astro
---
import { storyblokEditable } from "@storyblok/astro";
import { Image } from "astro:assets";

const { blok } = Astro.props;
const { image, title, description } = blok;
---

<section {...storyblokEditable(blok)} class="py-12">
  <div class="site-container grid grid-cols-1 md:grid-cols-2 gap-8">
    <div>
      {image?.filename && (
        <Image
          src={image.filename}
          alt={image.alt || title}
          width={600}
          height={400}
          class="rounded-lg"
        />
      )}
    </div>
    <div>
      <h2 class="text-2xl font-bold mb-4">{title}</h2>
      <div class="prose">{@html description}</div>
    </div>
  </div>
</section>
```

### Component with Nested Items
```json
{
  "name": "FeatureList",
  "display_name": "Feature List",
  "schema": {
    "title": {
      "type": "text",
      "display_name": "Title"
    },
    "features": {
      "type": "multilink",
      "display_name": "Features",
      "restrict_components": true,
      "component_whitelist": ["FeatureItem"]
    }
  }
}
```

## Best Practices

1. **Always use storyblokEditable()**: Essential for visual editor functionality
2. **Handle missing data gracefully**: Use optional chaining `blok.field?.value`
3. **Use semantic HTML**: Proper headings, sections, etc.
4. **Follow naming conventions**: PascalCase for component names
5. **Add responsive design**: Use Tailwind responsive utilities
6. **Include proper alt text**: For accessibility on images
7. **Use TypeScript**: Type your props when possible

## Common Field Patterns

### Link Field
```json
"button_link": {
  "type": "multilink",
  "display_name": "Button Link"
}
```

```astro
<a href={blok.button_link?.cached_url || "#"}>
  {blok.button_text}
</a>
```

### Boolean Toggle
```json
"show_title": {
  "type": "boolean",
  "display_name": "Show Title"
}
```

```astro
{blok.show_title && (
  <h2>{blok.title}</h2>
)}
```

### Asset Field (for videos, etc.)
```json
"video_file": {
  "type": "asset",
  "display_name": "Video File",
  "filetypes": ["mp4"]
}
```

```astro
{blok.video_file?.filename && (
  <video controls>
    <source src={blok.video_file.filename} type="video/mp4">
  </video>
)}
```

## Troubleshooting

### Component Not Showing
1. Check that it's registered in `astro.config.mjs`
2. Verify the component name matches exactly
3. Ensure `storyblokEditable(blok)` is added
4. Check browser console for errors

### Missing Data
1. Verify field names match the schema
2. Use optional chaining: `blok.field?.value`
3. Check Storyblok content is published (or using draft mode)

### Styling Issues
1. Use Tailwind classes instead of custom CSS
2. Ensure responsive breakpoints are correct
3. Test on different screen sizes

## Resources

- [Storyblok Astro Documentation](https://www.storyblok.com/docs/guide/integrations/astro)
- [Astro Component Docs](https://docs.astro.build/en/core-concepts/astro-components/)
- [Tailwind CSS](https://tailwindcss.com/docs)