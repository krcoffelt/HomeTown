# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a static website for HomeTown Marketing, a Kansas City-based marketing agency. The site is built with vanilla HTML, CSS, and JavaScript, using Tailwind CSS for styling and GSAP for animations.

## Development Commands

Since this is a static HTML/CSS/JS website, there are no build commands, test frameworks, or package management systems in place. The site can be developed by:

1. **Local Development**: Open HTML files directly in a browser or use a local server:
   ```bash
   # Using Python's built-in server
   python -m http.server 8000
   
   # Using Node.js http-server (if installed)
   npx http-server .
   ```

2. **File Editing**: Modify HTML, CSS, and JavaScript files directly
3. **Testing**: Manual browser testing across different devices and screen sizes

## Architecture and File Structure

```
hometown/
├── index.html          # Homepage
├── about.html          # About page
├── services.html       # Services page
├── work.html           # Portfolio/work page
├── contact.html        # Contact page
├── analyzer.html       # Growth Grader tool page
├── pricing.html        # Pricing page
├── get_code.py         # Minimal Python script (appears unused)
└── assets/
    ├── css/
    │   └── style.css   # Main stylesheet with custom CSS
    └── js/
        └── main.js     # Main JavaScript file
```

## Key Technologies and Dependencies

- **Tailwind CSS**: Loaded via CDN for utility-first styling
- **GSAP**: Animation library loaded via CDN
- **ScrollTrigger**: GSAP plugin for scroll-based animations
- **Satoshi Font**: Custom font loaded from FontShare

## Code Architecture

### CSS Architecture (`assets/css/style.css`)
- **CSS Custom Properties**: Color scheme and design tokens defined in `:root`
- **Utility Classes**: Custom classes for gradients, animations, and components
- **Component Styles**: Specific styling for navigation, buttons, cards, etc.
- **Animation Classes**: Extensive animation system with hover effects, parallax, and scroll triggers

### JavaScript Architecture (`assets/js/main.js`)
- **Module Pattern**: Self-contained functions for different features
- **GSAP Integration**: Conditional loading and fallbacks for animations
- **Interactive Components**: Mobile menu, FAQ accordions, form handling
- **Growth Grader**: Custom business analysis tool with mock data generation

### HTML Structure
- **Consistent Layout**: All pages share the same header/footer structure
- **Responsive Design**: Mobile-first approach with responsive navigation
- **Semantic HTML**: Proper use of semantic elements and accessibility considerations

## Development Workflow

1. **Content Updates**: Edit HTML files directly for content changes
2. **Styling Changes**: Modify `assets/css/style.css` for custom styles
3. **Interactive Features**: Update `assets/js/main.js` for functionality
4. **Testing**: Use browser developer tools and test across devices

## Key Features

- **Growth Grader Tool**: Interactive business analysis tool on `analyzer.html`
- **Responsive Design**: Mobile-optimized with hamburger menu
- **Animation System**: GSAP-powered animations with IntersectionObserver fallbacks
- **Custom CSS Framework**: Extensive utility classes and animation effects

## Important Notes

- No build process or package management
- All dependencies loaded via CDN
- Static hosting compatible (no server-side processing required)
- `get_code.py` appears to be unused and contains minimal content