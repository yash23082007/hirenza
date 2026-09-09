# Deployment Guide

This guide covers all deployment options for HIRENZA.

---

## 🚀 Quick Deploy

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/hirenza)

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yourusername/hirenza)

---

## 📦 Build for Production

```bash
# Install dependencies
npm install

# Create optimized production build
npm run build

# Preview production build locally
npm start
```

The build output is in the `out/` directory (static HTML/CSS/JS).

---

## 🌐 Deployment Options

### 1. Vercel (Recommended)

**Why Vercel?**
- Zero configuration
- Automatic HTTPS
- Global CDN
- Preview deployments
- Analytics included
- Free tier for personal projects

**Steps:**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

**Environment Variables:** None required (all static)

**Custom Domain:**
1. Go to Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain
3. Update DNS records as instructed

---

### 2. Netlify

**Why Netlify?**
- Easy deployment
- Form handling
- Serverless functions
- Free tier available

**Steps:**

```bash
# Build the project
npm run build

# Install Netlify CLI
npm install -g netlify-cli

# Deploy
netlify deploy --prod --dir=out
```

**Or via Git:**
1. Push to GitHub/GitLab
2. Connect repo to Netlify
3. Build command: `npm run build`
4. Publish directory: `out`

**netlify.toml:**
```toml
[build]
  command = "npm run build"
  publish = "out"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

---

### 3. GitHub Pages

**Why GitHub Pages?**
- Free for public repos
- Integrated with GitHub
- Custom domain support

**Steps:**

1. Install `gh-pages`:
```bash
npm install --save-dev gh-pages
```

2. Add to `package.json`:
```json
{
  "scripts": {
    "deploy": "npm run build && gh-pages -d out"
  }
}
```

3. Update `next.config.ts`:
```typescript
const nextConfig = {
  output: 'export',
  basePath: '/hirenza', // Your repo name
  images: {
    unoptimized: true,
  },
};
```

4. Deploy:
```bash
npm run deploy
```

5. Enable GitHub Pages in repo settings (select `gh-pages` branch)

---

### 4. Cloudflare Pages

**Why Cloudflare Pages?**
- Unlimited bandwidth
- Global CDN
- Fast performance
- Free tier generous

**Steps:**

1. Push code to GitHub
2. Go to Cloudflare Dashboard → Pages → Create a project
3. Connect your GitHub repo
4. Build settings:
   - Framework preset: Next.js
   - Build command: `npm run build`
   - Build output directory: `out`
5. Deploy

---

### 5. Docker

**Why Docker?**
- Consistent environments
- Easy scaling
- Works anywhere

**Dockerfile:**
```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner

WORKDIR /app
COPY --from=builder /app/out ./out
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

# Install serve to run static files
RUN npm install -g serve

EXPOSE 3000

CMD ["serve", "out", "-l", "3000"]
```

**Build and run:**
```bash
# Build image
docker build -t hirenza .

# Run container
docker run -p 3000:3000 hirenza

# Access at http://localhost:3000
```

**Docker Compose:**
```yaml
version: '3.8'

services:
  hirenza:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=production
    restart: unless-stopped
```

---

### 6. AWS S3 + CloudFront

**Why AWS?**
- Enterprise-grade
- Highly scalable
- Cost-effective at scale

**Steps:**

1. Build the project:
```bash
npm run build
```

2. Create S3 bucket:
```bash
aws s3 mb s3://hirenza.com
```

3. Upload files:
```bash
aws s3 sync out/ s3://hirenza.com --acl public-read
```

4. Configure S3 for static hosting:
```bash
aws s3 website s3://hirenza.com/ --index-document index.html --error-document index.html
```

5. Create CloudFront distribution:
```bash
aws cloudfront create-distribution \
  --origin-domain-name hirenza.com.s3-website-us-east-1.amazonaws.com \
  --default-root-object index.html
```

6. Point your domain to CloudFront

---

### 7. Self-Hosted (VPS)

**Why Self-Hosted?**
- Full control
- Custom infrastructure
- Cost-effective at scale

**Steps:**

1. Build the project:
```bash
npm run build
```

2. Upload `out/` folder to your server:
```bash
scp -r out/* user@your-server.com:/var/www/hirenza/
```

3. Configure Nginx:
```nginx
server {
    listen 80;
    server_name hirenza.com;
    root /var/www/hirenza;
    index index.html;

    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }

    # Cache static assets
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

4. Enable HTTPS with Let's Encrypt:
```bash
sudo certbot --nginx -d hirenza.com
```

---

## 🔧 Environment Variables

HIRENZA is fully static — **no environment variables required**.

All data is bundled at build time.

---

## 📊 Performance Optimization

### Enable Compression

**Nginx:**
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript text/xml application/xml;
```

**Apache:**
```apache
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/css application/javascript
</IfModule>
```

### Set Cache Headers

**Nginx:**
```nginx
location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2)$ {
    expires 1y;
    add_header Cache-Control "public, immutable";
}
```

### Enable HTTP/2

**Nginx:**
```nginx
listen 443 ssl http2;
```

---

## 🔄 Continuous Deployment

### GitHub Actions

**.github/workflows/deploy.yml:**
```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Build
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
```

---

## 📈 Monitoring

### Vercel Analytics
- Built-in Web Vitals
- Real user monitoring
- No setup required

### Custom Analytics

Add to `app/layout.tsx`:
```typescript
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html>
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
          strategy="afterInteractive"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## 🛡️ Security

### HTTPS
All deployment platforms provide free HTTPS via Let's Encrypt.

### Content Security Policy

Add to `_headers` (Netlify) or `vercel.json`:
```
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';
```

### Subresource Integrity

For external scripts, use SRI:
```typescript
<Script
  src="https://example.com/script.js"
  integrity="sha384-..."
  crossOrigin="anonymous"
/>
```

---

## 🐛 Troubleshooting

### Build fails
```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### 404 on page refresh
Ensure your hosting provider supports SPA routing or use static HTML export.

### Images not loading
Check `next.config.ts`:
```typescript
images: {
  unoptimized: true, // Required for static export
}
```

---

## 📞 Support

- **Vercel:** [vercel.com/support](https://vercel.com/support)
- **Netlify:** [answers.netlify.com](https://answers.netlify.com)
- **GitHub Pages:** [docs.github.com](https://docs.github.com/en/pages)

---

<div align="center">

**Happy Deploying! 🚀**

[Back to README](./README.md)
