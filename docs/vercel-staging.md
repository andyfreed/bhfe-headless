# Vercel Deployment — STAGING ONLY

> ⚠️ **This repository is for STAGING only.**  
> Do NOT use this configuration for production deployments.

---

## Quick Setup Checklist

- [ ] Import repo from GitHub: `andyfreed/bhfe-headless`
- [ ] Set Framework Preset to **Next.js**
- [ ] Add all environment variables (see below)
- [ ] Deploy to a staging-specific domain
- [ ] Verify robots.txt blocks crawlers
- [ ] Confirm STAGING badge appears

---

## 1. Import Project

1. Go to [vercel.com/new](https://vercel.com/new)
2. Click **Import Git Repository**
3. Select `andyfreed/bhfe-headless`
4. Vercel will auto-detect Next.js

---

## 2. Project Settings

### General

| Setting | Value |
|---------|-------|
| **Framework Preset** | Next.js |
| **Root Directory** | `.` (default) |
| **Build Command** | `npm run build` (default) |
| **Output Directory** | `.next` (default) |
| **Install Command** | `npm install` (default) |
| **Node.js Version** | 18.x or 20.x |

### Domains

Use a **staging-specific subdomain** to avoid confusion:

```
staging-bhfe.vercel.app        (default Vercel domain)
staging.bhfe.com               (custom subdomain - recommended)
bhfe-staging.vercel.app        (alternative)
```

> ⚠️ Do NOT point production domains (bhfe.com, www.bhfe.com) to this deployment.

---

## 3. Environment Variables

Go to **Project Settings → Environment Variables** and add:

### Required Variables

| Name | Value | Environment |
|------|-------|-------------|
| `NEXT_PUBLIC_WORDPRESS_URL` | `https://staging.beaconhillfe.com` | All |
| `FAUST_SECRET_KEY` | `[from WP Admin → Settings → Faust]` | All |

### Variable Details

```env
# WordPress staging URL (no trailing slash)
# This should point to your staging WordPress instance
NEXT_PUBLIC_WORDPRESS_URL=https://staging.beaconhillfe.com

# Faust secret key for preview authentication
# Get this from: WP Admin → Settings → Faust → Secret Key
FAUST_SECRET_KEY=your-faust-secret-key-here
```

### Note on Hard-Coded URLs

This repo has the staging WordPress URL **hard-coded** in `src/lib/gqlClient.ts` as a safety measure. The environment variable is only used as a fallback and will trigger a warning if it doesn't contain "staging".

---

## 4. Build & Deploy Settings

### Build Settings

| Setting | Value |
|---------|-------|
| **Build Command** | `npm run build` |
| **Output Directory** | `.next` |
| **Install Command** | `npm install` |

### Deployment Protection

For staging, consider enabling:

- [ ] **Password Protection** (Vercel Pro feature)
- [ ] **Vercel Authentication** (require Vercel login)
- [ ] **Deployment Protection** → Only allow team members

To enable basic auth (Pro plan):

1. Go to **Project Settings → Deployment Protection**
2. Enable **Password Protection**
3. Set a staging password

---

## 5. Verify Staging Safeguards

After deployment, verify these are working:

### Check robots.txt
```
https://your-staging-url.vercel.app/robots.txt
```

Should return:
```
User-agent: *
Disallow: /
```

### Check Meta Robots

View page source and confirm:
```html
<meta name="robots" content="noindex, nofollow, noarchive">
```

### Check Staging Badge

A red "STAGING" ribbon should appear in the top-left corner of every page.

### Check Sitemap

```
https://your-staging-url.vercel.app/sitemap.xml
```

Should return an empty sitemap or 404.

---

## 6. WordPress Configuration

Your staging WordPress instance needs these settings:

### WP Admin → Settings → Faust

| Setting | Value |
|---------|-------|
| **Front-end Site URL** | `https://your-staging-url.vercel.app` |
| **Secret Key** | Generate and copy to Vercel env vars |

### Required Plugins

- ✅ WPGraphQL
- ✅ WPGraphQL for ACF
- ✅ FaustWP

---

## 7. Preview Configuration

For WordPress preview to work:

1. In WordPress, go to **Settings → Faust**
2. Set **Front-end Site URL** to your Vercel staging URL
3. Test by editing a post and clicking "Preview"

Preview URLs will be:
```
https://your-staging-url.vercel.app/api/preview?p=123&post_type=post
```

---

## 8. Recommended Vercel Settings

### Git Integration

| Setting | Recommendation |
|---------|----------------|
| **Production Branch** | `main` |
| **Preview Deployments** | Enabled (for PR previews) |
| **Auto-deploy** | Enabled |

### Functions

| Setting | Value |
|---------|-------|
| **Region** | Choose closest to your WP server |
| **Max Duration** | 10s (default is fine) |

### Headers (Optional)

Add to `vercel.json` if you want extra headers:

```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Robots-Tag",
          "value": "noindex, nofollow"
        },
        {
          "key": "X-Environment",
          "value": "staging"
        }
      ]
    }
  ]
}
```

---

## 9. Troubleshooting

### Build Fails

1. Check Node.js version is 18.x or 20.x
2. Verify `npm install` succeeds locally
3. Check for TypeScript errors: `npm run build`

### GraphQL Errors

1. Verify WordPress staging site is accessible
2. Check GraphQL endpoint: `https://staging.beaconhillfe.com/graphql`
3. Ensure WPGraphQL plugin is active

### Preview Not Working

1. Verify `FAUST_SECRET_KEY` matches in Vercel and WordPress
2. Check FaustWP plugin is active
3. Verify Front-end Site URL in WordPress matches Vercel URL

### CORS Errors

Add to your WordPress theme's `functions.php`:

```php
add_filter('graphql_response_headers_to_send', function($headers) {
    $allowed_origins = [
        'https://your-staging-url.vercel.app',
        'http://localhost:3000',
    ];
    
    $origin = $_SERVER['HTTP_ORIGIN'] ?? '';
    if (in_array($origin, $allowed_origins)) {
        $headers['Access-Control-Allow-Origin'] = $origin;
        $headers['Access-Control-Allow-Credentials'] = 'true';
    }
    
    return $headers;
});
```

---

## 10. Environment Comparison

| Setting | Staging (this repo) | Production (separate repo) |
|---------|---------------------|---------------------------|
| **Repository** | `bhfe-headless` | `bhfe-production` |
| **WordPress URL** | `staging.beaconhillfe.com` | `beaconhillfe.com` |
| **robots.txt** | `Disallow: /` | `Allow: /` |
| **Meta robots** | `noindex, nofollow` | (none) |
| **Staging badge** | ✅ Visible | ❌ Hidden |
| **Sitemap** | Empty/disabled | Full sitemap |
| **Domain** | `staging.bhfe.com` | `bhfe.com` |

---

## Summary

```
Vercel Project: bhfe-headless-staging
GitHub Repo:    andyfreed/bhfe-headless
Branch:         main
Domain:         staging-bhfe.vercel.app (or custom)

Environment Variables:
  NEXT_PUBLIC_WORDPRESS_URL = https://staging.beaconhillfe.com
  FAUST_SECRET_KEY          = [from WordPress]
```

---

**Remember:** This is staging only. Create a separate repository and Vercel project for production.

