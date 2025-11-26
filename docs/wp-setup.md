# WordPress Setup for Headless BHFE

This guide covers the required WordPress plugins and configuration for the headless frontend.

---

## Required Plugins

### 1. WPGraphQL

**Purpose:** Exposes WordPress data via a GraphQL API.

**Installation:**
- Download from [WordPress.org](https://wordpress.org/plugins/wp-graphql/) or
- Install via WP Admin > Plugins > Add New > Search "WPGraphQL"

**Configuration:**
1. Go to **WP Admin > GraphQL > Settings**
2. **Enable Public Introspection** (for development/tooling)
3. Note the GraphQL endpoint: `https://your-site.com/graphql`

---

### 2. WPGraphQL for ACF

**Purpose:** Exposes Advanced Custom Fields data in GraphQL.

**Installation:**
- Download from [GitHub](https://github.com/wp-graphql/wpgraphql-acf) or
- Install via Composer: `composer require wp-graphql/wp-graphql-acf`

**Configuration:**
1. For each ACF Field Group, edit the field group settings
2. Enable **"Show in GraphQL"**
3. Set a **GraphQL Field Name** (e.g., `courseDetails`)

---

### 3. FaustWP Plugin

**Purpose:** Enables preview mode, authentication, and redirects for the headless frontend.

**Installation:**
1. Download from [GitHub Releases](https://github.com/wpengine/faustjs/releases)
2. Upload to WP Admin > Plugins > Add New > Upload Plugin
3. Activate the plugin

**Configuration:**
1. Go to **WP Admin > Settings > Faust**
2. Set the **Front-end Site URL** to your Next.js URL:
   - Local: `http://localhost:3000`
   - Production: `https://your-headless-site.com`
3. Generate a **Secret Key** and copy it
4. Add the secret key to your `.env.local`:
   ```
   FAUST_SECRET_KEY=your-generated-secret-key
   ```

---

## Optional Plugins

### WPGraphQL for WooCommerce (WooGraphQL)

**Purpose:** Full WooCommerce support in GraphQL (cart, checkout, products with variations).

**Installation:**
- Download from [GitHub](https://github.com/wp-graphql/wp-graphql-woocommerce)

**Note:** Basic product support is already enabled via the theme's `graphql-registrations.php`. Install WooGraphQL for full cart/checkout functionality.

---

### WPGraphQL JWT Authentication

**Purpose:** JWT-based authentication for protected mutations.

**Installation:**
- Download from [GitHub](https://github.com/wp-graphql/wp-graphql-jwt-authentication)

---

## Environment Variables

Create `.env.local` in the frontend directory:

```env
# WordPress URL (no trailing slash)
NEXT_PUBLIC_WORDPRESS_URL=http://beacon-hill-staging.local

# Faust Secret Key (from WP Admin > Settings > Faust)
FAUST_SECRET_KEY=your-secret-key-here
```

---

## Verifying Setup

### 1. Test GraphQL Endpoint

Visit `http://your-site.com/graphql` in your browser. You should see the GraphiQL IDE.

### 2. Test a Query

Run this query in GraphiQL:

```graphql
query TestQuery {
  generalSettings {
    title
    description
  }
  flmsCourses(first: 3) {
    nodes {
      title
      courseNumber
    }
  }
}
```

### 3. Test Preview Mode

1. Create/edit a post in WordPress
2. Click "Preview" 
3. You should be redirected to the Next.js frontend with preview content
4. An orange "Preview Mode" banner should appear at the top of the page
5. Click "Exit Preview" to return to the public view

**Preview URLs:**
- Posts: `/preview/post/{id}`
- Pages: `/preview/page/{id}`
- Courses: `/preview/course/{id}`

**Preview API Endpoints:**
- Enable preview: `/api/preview?p={id}&post_type={type}`
- Exit preview: `/api/exit-preview?redirect={url}`

---

## Troubleshooting

### "Cannot query field X on type Y"

The field isn't exposed in GraphQL. Check:
- For ACF fields: Enable "Show in GraphQL" in the field group settings
- For CPTs: Ensure `show_in_graphql` is set to `true` in the post type registration

### Preview Not Working

1. Verify FaustWP plugin is installed and activated
2. Check Front-end Site URL in WP Admin > Settings > Faust
3. Verify `FAUST_SECRET_KEY` matches in both WP and `.env.local`
4. Check browser console for errors
5. Ensure cookies are enabled (preview uses cookies for auth)
6. Try clearing browser cache and cookies
7. In development, check Next.js console for GraphQL errors

**Debug Preview:**
- Visit `/api/preview?p=123&post_type=post` directly to test
- Check for "Preview Mode" banner appearing
- If banner shows but content doesn't load, check GraphQL permissions

### CORS Errors

Add this to your theme's `functions.php`:

```php
add_action('graphql_response_headers_to_send', function($headers) {
    $headers['Access-Control-Allow-Origin'] = 'http://localhost:3000';
    $headers['Access-Control-Allow-Credentials'] = 'true';
    return $headers;
});
```

### Introspection Disabled

Enable in WP Admin > GraphQL > Settings > "Enable Public Introspection"

---

## Plugin Versions Tested

| Plugin | Version | Status |
|--------|---------|--------|
| WPGraphQL | 1.19.x | ✅ Required |
| WPGraphQL for ACF | 2.3.x | ✅ Required |
| FaustWP | 1.3.x | ✅ Required |
| WPGraphQL WooCommerce | 0.19.x | Optional |

---

## File Reference

| File | Location | Purpose |
|------|----------|---------|
| `graphql-registrations.php` | `wp-content/themes/bhfe/includes/` | Registers CPTs with WPGraphQL |
| `schema.json` | `app/public/` | Introspected schema for tooling |
| `acf-fields.md` | `app/public/` | ACF field documentation |

---

## Next Steps

1. Install and configure all required plugins
2. Copy `env.local.example` to `.env.local` and fill in values
3. Run `npm install` in the frontend directory
4. Run `npm run dev` to start the development server
5. Visit `http://localhost:3000` to see your headless site

