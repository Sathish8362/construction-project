# [Company Name] — Construction Company Website

A high-performance, mobile-first, one-page responsive website designed specifically for general contractors and construction companies. Built with standard HTML5, CSS3, and modern Vanilla JavaScript with zero external runtime dependencies.

---

## 🏗 Features Included

1. **Blueprint-Inspired Hero**:
   - Orthogonal architectural drafting grid background with coordinate annotations (`+ 00.00'`, `SCALE 1:100`, `PLAN REF: 2026-ENG-B`).
   - Technical CAD schematic drawing of structural framing, gable elevation, and foundation datum lines.
   - Clean, high-contrast calls to action: **Get a Free Quote** and **See Our Projects**.

2. **12 Complete Sections (In Specified Order)**:
   1. **Navigation Bar**: Logo, desktop & mobile drawer links (Services, Projects, How We Work, About, Credentials, FAQ, Contact), and Dark Mode toggle.
   2. **Hero**: Plain headline `[one line saying what we build and where]`, supporting sentence, and dual CTAs.
   3. **Key Facts Strip**: Years in business, projects completed, licensed & insured, warranty length.
   4. **Services**: 6 comprehensive construction services (New Homes, Commercial Buildings, Renovations & Extensions, Custom Interiors, Foundations, Permitting).
   5. **Projects**: 6 featured project cards with blueprint photo placeholder boxes, project name, type, square footage, and duration.
   6. **How We Work**: 4-step transparent process (Site visit, fixed quote, construction with weekly photo updates, handover).
   7. **About Us**: Founder's story, 3 core principles, master builder quote, and team photo placeholder box.
   8. **Credentials**: State GC license `# [GC-89421-B]`, $5M liability insurance, written 10-year warranty, OSHA zero-incident safety record, and certified partners strip.
   9. **Testimonials**: 3 authentic client quotes with client names, project names, and locations.
   10. **FAQ**: Expandable accordion covering timeline, fixed pricing, materials, permits, and payment milestones.
   11. **Contact & Instant Quote Form**: Direct phone (dialer link), WhatsApp chat link, email, physical address, Google Maps link, working hours, and an interactive quote request form.
   12. **Footer**: Company overview, legal license badges, quick links, dynamic copyright year, and back-to-top button.

3. **Instant WhatsApp Quote Generator**:
   - Form fields: Name, Phone, Project Location, Project Type, and Rough Budget Range (+ optional notes).
   - On submit, formats an organized plain text message and generates a direct link (`wa.me/[number]?text=...`).
   - Displays a preview confirmation modal with direct link and one-click copy fallback.

4. **Extra Mobile & Accessibility Features**:
   - **Floating WhatsApp button** on every screen with pulsing radar animation.
   - **Mobile Sticky Bottom Bar** (on screens `< 640px`) with quick "Call Now", "Get Quote", and "WhatsApp" buttons.
   - **Tappable phone numbers** that trigger the phone dialer (`tel:[number]`).
   - **Dark Mode / Light Mode toggle** with automatic OS preference detection and `localStorage` persistence.
   - **WCAG 2.1 AA Compliance**: All touch targets are $\ge 44\text{px}$, high-contrast text, `:focus-visible` keyboard rings, and `prefers-reduced-motion` support.
   - **SEO Ready**: Semantic HTML5 tags, Open Graph meta tags, and Schema.org `GeneralContractor` JSON-LD structured data.

---

## 📱 Tested Responsive Widths

The stylesheet is built mobile-first and tested to prevent horizontal scrolling across all screen sizes:
- **320px & 360px**: Small Android devices (single column grid, 48px touch targets, mobile bottom bar).
- **390px**: Modern iPhones (iPhone 12 / 13 / 14 / 15 / 16 viewports with safe area padding).
- **768px**: iPad and Android tablets (2-column services and facts, quick-call header button).
- **1024px**: iPad Pro / Laptops (full desktop navigation bar, 3-column project cards).
- **1440px & 1920px**: Desktop monitors (2-column hero with elevation schematic, 4-column key facts strip).

---

## ✏️ How to Customize Your Website

### 1. Replace the Placeholders
Search and replace the bracketed placeholders across `index.html` and `script.js`:
- `[Company Name]` &rarr; Your business name (e.g., `Summit Crest Construction`)
- `[City, State]` &rarr; Your city and state (e.g., `Austin, TX`)
- `[number]` &rarr; Your phone and WhatsApp number (e.g., `+1 512 555 0198`)
  - *Tip for WhatsApp in `script.js`:* Update `defaultWhatsAppNumber = '15125550198'` with your digits and country code.
- `[email]` &rarr; Your business email (e.g., `info@summitcrestbuilders.com`)
- `[full address]` &rarr; Your office or showroom address
- `[Year]` &rarr; Year established (e.g., `2011`)
- `[#GC-000000]` &rarr; Your general contractor license number

### 2. Insert Photos Directly (Owner Mode & Photo Studio)

The website includes a built-in **Owner Photo Studio** and direct in-place photo upload system. You do **NOT** need to edit HTML code to insert your photos!

#### Option A: Use the Owner Photo Studio Modal
1. Open the website in your browser (`http://localhost:8080`).
2. Click the orange **"Insert Photos"** button in the header, or the **"Owner Mode: Insert Photos Directly"** link in the top bar, or the floating button at the bottom-left of the screen.
3. The **Owner Photo Studio** dialog will open showing all 8 photo slots:
   - **Hero Banner** (Showcase build)
   - **Project 1 to 6** (New Homes, Commercial, Renovation, Villa, Industrial, Interiors)
   - **Owner & Team Photo** (About Us)
4. Tap **"Choose Photo"** on any card to pick an image from your phone camera or computer.
5. Or tap **"⚡ Batch Upload Photos"** to select multiple photos at once; they will automatically fill the empty project slots in order!
6. All photos are automatically compressed on-the-fly via HTML5 Canvas and saved into browser `IndexedDB` storage.
7. Click **"Download HTML with Photos"** to export a standalone `index.html` with all your photos embedded as optimized data URLs, ready to upload to any web hosting!

#### Option B: Insert Photos Directly On-Page
1. Scroll directly to the **Hero**, **Projects**, or **About Us** sections on the page.
2. Tap the **"Insert Photo Directly"** button located on any blueprint placeholder card.
3. Alternatively, simply **drag and drop** any image file from your desktop directly onto a project card!
4. Once uploaded, a floating overlay appears on the card with **"Change"** and **"Reset"** buttons.

#### Option C: Manual File Replacement (Alternative)
You can also place image files in the `images/` directory (e.g. `images/project-1.webp`, `images/team.webp`) and update the `src` attribute in `index.html`.

### 3. Customize Colors
Open `styles.css` and adjust the variables in `:root`:
```css
:root {
  --color-primary-blue: #0d2744;  /* Deep Blueprint Navy */
  --color-orange-accent: #f97316; /* Construction Safety Orange */
  --color-concrete-100: #f1f5f9;  /* Concrete Light Grey */
}
```

---

## 🚀 How to Run Locally

You can simply double-click `index.html` to open it in any web browser!

Or run a local development server using Python:
```bash
python -m http.server 8080
```
Then navigate to: `http://localhost:8080` in your browser.
