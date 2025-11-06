# Orbiy CMS Deployment Guide

This guide covers how to log into the Storyblok CMS and set up Netlify deployment with two environments: production and preview.

## Table of Contents

1. [Storyblok CMS Access](#storyblok-cms-access)
2. [Netlify Environment Setup](#netlify-environment-setup)
3. [Environment Variables](#environment-variables)
4. [Deployment Workflow](#deployment-workflow)
5. [Troubleshooting](#troubleshooting)

## Storyblok CMS Access

### Logging into Storyblok

1. **Navigate to Storyblok**
   - Go to [app.storyblok.com](https://app.storyblok.com)
   - Click on "Log in" in the top right corner

2. **Enter Your Credentials**
   - **Email**: Your registered email address
   - **Password**: Your account password
   - Click "Sign in"

3. **Access Your Space**
   - After logging in, you'll see your available spaces
   - Select the "Orbiy" space to access the content management interface

4. **Storyblok Interface Overview**
   - **Content**: View and manage all content entries
   - **Components**: Manage reusable components
   - **Assets**: Upload and organize media files
   - **Settings**: Configure space settings and API keys

### Finding API Keys

1. **Get Space ID and API Token**
   - Navigate to **Settings** > **API Keys**
   - You'll find:
     - **Space ID**: Unique identifier for your space
     - **Public Token** (for preview): Starts with `p...`
     - **Preview Token**: For development and preview environments
     - **Private Token** (for production): Starts with `N...`

2. **Webhook Configuration**
   - Navigate to **Settings** > **Webhooks**
   - You'll need to add Netlify webhook URLs here (covered in Netlify setup)

## Netlify Environment Setup

We'll create two Netlify sites:
1. **Production Site**: Builds and deploys the static production version
2. **Preview Site**: Used for Storyblok preview functionality

### 1. Production Site Setup

1. **Create New Netlify Site**
   - Go to [app.netlify.com](https://app.netlify.com)
   - Click "New site from Git"
   - Connect your Git repository (GitHub, GitLab, or Bitbucket)

2. **Configure Build Settings**
   ```
   Build command: pnpm build
   Publish directory: dist
   ```

3. **Set Environment Variables** (see [Environment Variables](#environment-variables) section)

4. **Deploy**
   - Click "Deploy site"
   - Note the site URL for later use

### 2. Preview Site Setup

1. **Create Additional Site**
   - Follow the same process as production site
   - Use a different repository branch (e.g., `preview` or `develop`)
   - Or create a separate site for the same repository

2. **Configure Preview Build Settings**
   ```
   Build command: pnpm build
   Publish directory: dist
   ```

3. **Enable Preview Mode**
   - Go to **Site settings** > **Build & deploy**
   - Under "Post processing", enable "Branch deploys"
   - Set up branch-specific deploys if needed

## Environment Variables

### Production Site Variables

In Netlify dashboard, navigate to **Site settings** > **Environment variables**:

1. **Storyblok Configuration**
   ```
   STORYBLOK_TOKEN=your_private_token_here
   STORYBLOK_PREVIEW=no
   ```

### Preview Site Variables

For the preview site, use the preview token:

1. **Storyblok Configuration**
   ```
   STORYBLOK_TOKEN=your_private_token_here
   STORYBLOK_PREVIEW=yes
   ```

### Local Development

Create a `.env` file in your project root:

```bash
# .env
   ```
   STORYBLOK_TOKEN=your_private_token_here
   STORYBLOK_PREVIEW=no
   ```
```

**Important**: Add `.env` to your `.gitignore` file to prevent committing sensitive data.

## Deployment Workflow

### Production Workflow

1. **Content Creation in Storyblok**
   - Create and edit content in the Storyblok editor
   - Publish changes when ready

2. **Automatic Deployment**
   - Merge changes to main branch
   - Netlify automatically triggers build
   - Production site updates with new content

3. **Manual Deploy (if needed)**
   - Push changes to main branch
   - Or trigger manual deploy in Netlify dashboard

### Preview Workflow

1. **Preview in Storyblok**
   - Use Storyblok's visual editor to preview changes
   - Preview site loads content from draft state

2. **Webhook Integration**
   - Storyblok sends webhook to Netlify preview site
   - Preview site rebuilds with latest draft content
   - Real-time preview updates in Storyblok editor

### Setting Up Webhooks

1. **Get Netlify Build Hook**
   - In Netlify dashboard: **Site settings** > **Build & deploy** > **Build hooks**
   - Click "Add build hook"
   - Name it "Storyblok Preview"
   - Copy the generated URL

2. **Configure Storyblok Webhook**
   - In Storyblok: **Settings** > **Webhooks**
   - Click "Add webhook"
   - **Name**: Netlify Preview
   - **URL**: Paste the Netlify build hook URL
   - **Events**: Select "Published", "Unpublished", "Deleted"
   - **State**: Select "Draft" for preview site
   - Save the webhook

3. **Repeat for Production (Optional)**
   - Create another webhook for production
   - Use production build hook URL
   - Set **State** to "Published"

## Astro Configuration

Ensure your `astro.config.mjs` is properly configured:

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import { storyblok } from '@storyblok/astro';

export default defineConfig({
  integrations: [
    tailwind(),
    storyblok({
      accessToken: process.env.STORYBLOK_TOKEN,
      apiOptions: {
        region: 'eu', 
      },
    }),
  ],
  output: 'static',
  build: {
    format: 'directory',
  },
});
```

## Troubleshooting

### Common Issues

1. **Build Fails with API Error**
   - Check that STORYBLOK_TOKEN is correct
   - Verify STORYBLOK_SPACE_ID matches your space
   - Ensure token has proper permissions

2. **Preview Not Updating**
   - Verify webhook URL is correct in Storyblok
   - Check Netlify build logs for webhook failures
   - Ensure preview site is using preview token

3. **Content Not Loading**
   - Check browser console for API errors
   - Verify environment variables are set correctly
   - Check network tab for failed API requests

4. **CORS Issues**
   - Ensure your domain is whitelisted in Storyblok
   - Check API requests are using correct endpoint

### Debug Mode

Enable debug logging by adding to your environment variables:

```bash
DEBUG=storyblok:*
```

Or temporarily in your code:

```javascript
const storyblokApi = new StoryblokClient({
  accessToken: process.env.STORYBLOK_TOKEN,
  cache: {
    clear: 'auto',
    type: 'memory',
  },
});
```

### Performance Optimization

1. **Enable Caching**
   - Configure Storyblok API caching
   - Use Netlify's built-in caching headers

2. **Image Optimization**
   - Use Storyblok's image service for optimization
   - Implement lazy loading for images

3. **Build Optimization**
   - Exclude unnecessary components from build
   - Use Netlify's build plugins for optimization

## Best Practices

1. **Security**
   - Never commit API tokens to version control
   - Use different tokens for production and preview
   - Rotate tokens regularly

2. **Content Management**
   - Use content validation in Storyblok
   - Implement content workflows
   - Regular backup of important content

3. **Monitoring**
   - Monitor build status and errors
   - Set up alerts for failed deployments
   - Track site performance metrics

4. **Team Collaboration**
   - Use branch-based development
   - Implement content approval workflows
   - Document custom components and their usage

## Support Resources

- **Storyblok Documentation**: [www.storyblok.com/docs](https://www.storyblok.com/docs)
- **Netlify Documentation**: [docs.netlify.com](https://docs.netlify.com)
- **Astro Documentation**: [docs.astro.build](https://docs.astro.build)
- **Project Issues**: Create issues in your project repository

---

For additional help or questions, refer to the project's README.md or contact the development team.