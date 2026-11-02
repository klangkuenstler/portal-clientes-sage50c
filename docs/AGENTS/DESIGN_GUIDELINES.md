# Megactec — Colors and Visual Component Principles

This guide documents the site's existing visual language, based on `index.html`, `contact.html`, `styles.css`, `module-css/header.css`, and `assets/css/responsive.css`. Principles describe how to extend that language consistently; CSS values describe the current implementation.

## Visual direction

Megactec's identity combines warm orange accents, neutral gray surfaces, bold rounded typography, and appliance/service photography. The overall feel should be approachable, practical, and professional.

- **Make the service clear:** lead with a strong headline, supporting imagery, and a direct action.
- **Use orange for emphasis:** highlight calls to action, icons, section labels, and selected states.
- **Give content room:** use generous section spacing and clear separation between headings, descriptions, and actions.
- **Build trust visually:** feature the business, supported appliance brands, customer testimonials, and easy-to-find contact information.
- **Repeat familiar shapes:** rounded cards, buttons, and fields give the site a consistent component vocabulary.

## Color palette

Values below come from the `:root` tokens in `styles.css`.

| Role | Value | CSS token(s) | Intended use |
| --- | --- | --- | --- |
| Brand orange | `#FF9017` | `--thm-primary`, `--thm-secondary-orange`, `--thm-teal`, `--thm-orange` | Primary actions, highlighted icons, section labels, active states |
| Light orange | `#FFB667` | `--thm-accent` | Supporting warm accent |
| Secondary gray | `#999999` | `--thm-secondary` | Secondary links and neutral emphasis |
| Dark gray | `#4D4D4D` | `--thm-primary-gray` | Supporting dark neutral |
| Body text | `#383838` | `--thm-body-font-color` | Paragraphs and general copy |
| Heading / near-black | `#101010` | `--thm-heading-font-color`, `--thm-black` | Headings and strong text |
| White | `#FFFFFF` | `--thm-body-background`, `--thm-bg-white`, `--thm-white` | Main surfaces and inverse text |
| Warm pale background | `#F9EFE3` | `--thm-bg-ling-green` | Soft supporting surfaces and contact icon tiles |
| Translucent dark gray | `#4E4E4E8E` | `--thm-green` | Gray section backgrounds and secondary button fills; approximately 56% opacity |
| Translucent medium gray | `#6D6D6D86` | `--thm-gray70` | Header navigation background; approximately 53% opacity |

### Color application

- Keep most content on neutral surfaces; reserve saturated orange for hierarchy and interaction.
- Use near-black headings and dark-gray body copy on light surfaces.
- Treat translucent colors as overlays: their final appearance depends on the surface beneath them.
- Reuse CSS variables when adding components.
- Several names are inherited from the original template: `--thm-teal` is orange, `--thm-green` is translucent gray, and `--thm-bg-ling-green` is warm cream. Follow their current values rather than their names or commented-out historical colors.
- `.bg-light-greem` currently resolves to the white body background, not the cream token.

## Typography

Use **Outfit**, with `sans-serif` as the fallback, for both headings and body text. The stylesheet imports weights 400, 500, 600, and 700 from Google Fonts.

| Element | Current base styling |
| --- | --- |
| Body copy | 18px, weight 400, 30px line height |
| Headings | Weight 700, default line height 1.2em |
| H1 | 4rem |
| H2 | 3.12rem |
| H3 / H4 | 1.75rem / 1.5rem |
| H5 / H6 | 1.25rem / 1rem |
| Section title `.sec-title` | 50px, 68px line height, 18px bottom padding |
| Section label `.sec-sub-title` | 20px, weight 500, 20px line height, orange |
| Primary button | 18px, weight 600, 30px line height |
| Contact form label | 15px, weight 600 |

Component and responsive rules can override these defaults. Keep a clear progression from short section label to prominent heading to readable supporting copy. Preserve the site's Portuguese content conventions when adding visible text.

## Layout and spacing

- Use the existing Bootstrap `.container`, `.row`, and responsive column classes for alignment.
- Compose desktop sections with balanced text/image columns or repeated card grids.
- Standard `.sec-ptb` sections use **100px vertical padding**. Separate `.sec-pt` and `.sec-pb` utilities use **140px** on their respective sides.
- The base `.hero-ptb` spacing is **270px top / 100px bottom**, allowing room for the header.
- Service cards use **30px internal padding**. Reuse the surrounding component's spacing rather than introducing arbitrary new values.
- **10px corner radii** recur across buttons, cards, and form controls. Smaller contact tiles use **6px**; circles are used for selected icon/avatar treatments.

## Component principles

### Header and navigation

The homepage uses `.main-header-one.main-header-two`: a logo, a contact-information strip, navigation, and a sticky-header treatment. Gray translucent surfaces establish the header's visual identity.

- Keep the logo's proportions intact; the homepage displays `assets/images/logo/logo1.png` at 122 × 70px.
- Keep navigation concise and contact details easy to scan.
- Use the existing mobile menu/toggler pattern when the desktop navigation collapses.

### Hero

The homepage's `.hero-sec2` pairs a large headline and action with appliance/service imagery.

- Lead with the core offer: appliance sales and repair.
- Maintain one clear visual focal point and an obvious next action.
- Use existing rounded image treatments and decorative shapes without competing with the headline.

### Buttons and action links

The primary `.thm-btn` uses a **2px orange border**, **10px radius**, **12px × 30px padding**, and white text over an orange pseudo-element fill.

- On hover, the orange fill retracts, revealing a translucent white background and orange text.
- Keep the `.txt` wrapper and icon structure when reusing the button; they position content above the animated fill.
- `.thm-btn-style2` uses the translucent gray token for its border and fill.
- Use `.read-more` for lower-emphasis actions; its arrow moves slightly on hover.

### Service cards

Homepage service cards use `.single-service-style2`.

- Combine a full-width photograph, a short title, descriptive text, and an orange service icon.
- Use **10px rounded corners**, clipped overflow, and the warm shadow `0 10px 50px rgba(223, 124, 19, 0.15)`.
- Titles are **20px / 30px**; service icons are **80px** in the base styling.
- The image lifts by **15px** and scales to **1.1** on hover. Keep this effect contained within the card.

### FAQ accordion

- Closed question headers use transparent backgrounds, dark text, a subtle border, and **10px rounding**.
- Headers use **20px**, weight **600**, with **15px × 20px padding**.
- Open headers switch to orange with white text and indicators.
- Keep answers directly beneath their questions so the expanded state is easy to follow.

### Contact forms and information

- Reuse `form.itco-cform` and `.contact-field` styling for consistent fields and labels.
- Select controls use white surfaces, **10px radii**, subtle gray borders, and **12px × 22px padding**.
- Use persistent labels and short, clear instructions.
- Contact icon tiles use pale warm backgrounds, orange icons, **60 × 60px** dimensions, and **6px radii**.
- Keep submission actions visually consistent with the site's primary buttons.

### Brand logos, testimonials, and footer

- Keep partner logos recognizable and proportionally scaled, with breathing room between marks.
- Use testimonials as clearly separated, readable trust-building content.
- Continue the established logo, icon, and link treatments into the footer; prioritize contact details and useful navigation.

## Imagery and iconography

- Prefer relevant appliance, repair, team, and business imagery from `assets/images/`.
- Use existing Font Awesome and Flaticon icon families for consistency.
- Pair icons with meaningful text for services and contact information.
- Preserve image proportions; use deliberate cropping within the established rounded containers.

## Motion and responsive behavior

- Most link and button transitions use approximately **0.3 seconds**; read-more arrows use **0.2 seconds**.
- The homepage also uses staggered `fadeInUp` service-card entrance animations with **1500ms** durations.
- Use motion to clarify interactivity and hierarchy, following the surrounding component's behavior.
- Responsive rules live in `assets/css/responsive.css`, loaded after `styles.css`. Important breakpoints include **1199px**, **991px**, **767px**, and **576px**.
- Desktop navigation gives way to the mobile toggler below 1200px. At narrower widths, follow the existing grid stacking and heading-size adjustments.
- Preserve readable copy, image proportions, and accessible contact actions as columns collapse.

## Source reference

| File | Responsibility |
| --- | --- |
| `styles.css` | Active theme tokens, typography, spacing, component styling |
| `module-css/header.css` | Header, navigation, sticky and mobile menu styling |
| `assets/css/responsive.css` | Responsive overrides |
| `index.html` | Main homepage composition and component examples |
| `contact.html` | Contact page and assistance-request interface |

The homepage loads the root `styles.css`; use that file as the palette reference rather than similarly named template stylesheets under `assets/css/`.
