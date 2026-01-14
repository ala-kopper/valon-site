# Valon Landing Page

A hero section landing page with smooth blue-to-gold gradient transitions on scroll.

## Fonts

This project uses:
- **Playfair Display** (Google Fonts) - Hero title only
- **Proxima Nova** - All other headers and body text
- **Space Mono** (Google Fonts) - Eyebrow text and buttons

### Setting up Proxima Nova

Proxima Nova is a commercial font available through Adobe Fonts (formerly Typekit). To use it:

1. Sign in to [Adobe Fonts](https://fonts.adobe.com/)
2. Search for "Proxima Nova"
3. Add it to your web project
4. Replace the placeholder link in `index.html` (line 14) with your Adobe Fonts embed code:
   ```html
   <link rel="stylesheet" href="https://use.typekit.net/YOUR-KIT-ID.css">
   ```

**Alternative:** The CSS includes fallback fonts that will provide a similar look if Proxima Nova isn't available:
- `-apple-system` (San Francisco on Apple devices)
- `BlinkMacSystemFont` (San Francisco on Chrome/Safari)
- `Segoe UI` (Windows)
- `Arial` (universal fallback)

## Features

- Hero section with animated blue-to-gold gradient on scroll
- Responsive navigation bar
- Clean, modern design
- Smooth scroll animations
- Mobile responsive

## Browser Support

Modern browsers (Chrome, Firefox, Safari, Edge)
