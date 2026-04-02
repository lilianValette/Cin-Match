# Design System Document: Editorial Cinematic Noir

## 1. Overview & Creative North Star: "The Digital Auteur"
This design system is engineered to transform a standard swiping interaction into a premium, editorial experience. Our Creative North Star is **The Digital Auteur**—a philosophy that treats every screen like a beautifully composed film frame. 

We move away from the "app-as-a-utility" look by embracing **Intentional Asymmetry** and **Cinematic Depth**. By utilizing deep blacks (`surface-dim`) and high-contrast accents (`primary`, `secondary`), we create a theatrical environment. The layout breaks the grid through overlapping movie posters, exaggerated typography scales, and a rejection of traditional borders in favor of light and shadow. The goal is to make the user feel like they are sitting in a private screening room, not just browsing a database.

---

## 2. Colors: High-Contrast Drama
The palette is built on a foundation of absolute darkness to make movie imagery and vibrant accents "pop" with neon-like intensity.

*   **Primary (`#ff8e80`) & Primary-Dim (`#e80f16`):** Our "Cinema Red." Use these for high-energy actions, "Like" gestures, and critical brand moments.
*   **Secondary (`#fdc003`):** Our "Popcorn Yellow." Reserved for ratings, premium features, and highlighting metadata that needs to stand out against the charcoal backdrop.
*   **The "No-Line" Rule:** Explicitly prohibit 1px solid borders for sectioning. Structural separation must be achieved through background shifts (e.g., a `surface-container-low` card resting on a `surface` background).
*   **Surface Hierarchy & Nesting:** Treat the UI as stacked layers of physical film. 
    *   **Level 0:** `surface-container-lowest` (#000000) for the most immersive backgrounds.
    *   **Level 1:** `surface-container-low` (#131313) for primary content containers.
    *   **Level 2:** `surface-container-highest` (#262626) for interactive elements like floating bars.
*   **The "Glass & Gradient" Rule:** Use `surface-bright` with a 40% opacity and 20px backdrop-blur for floating overlays. Main CTAs should utilize a subtle linear gradient from `primary` to `primary-container` to add "soul" and dimension.

---

## 3. Typography: The Editorial Voice
We pair the brutalist, geometric weight of **Epilogue** with the modern, technical precision of **Manrope**.

*   **Display & Headlines (Epilogue):** These are your "Film Titles." Use `display-lg` and `headline-lg` with tight letter spacing (-0.02em) to create an authoritative, editorial feel. Don't be afraid to let a headline bleed slightly off-center or overlap a card edge.
*   **Titles & Body (Manrope):** These are your "Script Notes." Use `title-md` for movie names and `body-md` for synopses. Manrope’s high x-height ensures metadata remains legible even at small sizes against dark backgrounds.
*   **Label (Manrope):** Use `label-md` in `secondary` for technical data like "4K," "HDR," or "124 MIN."

---

## 4. Elevation & Depth: Tonal Layering
Traditional shadows are too "software-like." We use **Ambient Light** and **Tonal Stacking**.

*   **The Layering Principle:** To lift a card, place a `surface-container-high` element on a `surface-container-low` background. The subtle 2% shift in charcoal value creates a sophisticated, "soft-touch" lift.
*   **Ambient Shadows:** If an element must float (like a FAB), use a large 48px blur with 8% opacity using the `on-surface` color. It should feel like a soft glow, not a dark smudge.
*   **The "Ghost Border" Fallback:** For accessibility in forms, use the `outline-variant` token at 15% opacity. This "Ghost Border" provides a hint of structure without breaking the seamless cinematic flow.
*   **Glassmorphism:** Use for navigation bars and gesture indicators. A background blur of 16px combined with a `surface-variant` fill at 50% opacity creates the illusion of frosted glass in front of a projector.

---

## 5. Components: The Primitive Set

### Movie Cards
*   **Construction:** Zero borders. Use `md` (1.5rem) or `lg` (2rem) corner radius. 
*   **Separation:** Forbid dividers. Use `spacing-8` (2rem) of vertical white space or a subtle shift to `surface-container-highest` for the card background.
*   **Imagery:** Use a subtle inner-shadow gradient on the bottom 30% of the card to house `title-lg` text in `on-surface`.

### Buttons
*   **Primary:** Rounded `full` (9999px). Background: Gradient of `primary` to `primary-fixed`. Text: `on-primary-fixed` (Black) for maximum punch.
*   **Secondary:** Ghost style. No fill. Use a `secondary` "Ghost Border" (20% opacity) and `secondary` text.
*   **States:** On press, scale the button down to 96% to simulate physical depth.

### Gesture Indicators
*   **Swipe Right:** A `tertiary` (Teal/Cyan) glow emanating from the left edge using a 64px radial gradient.
*   **Swipe Left:** A `primary-dim` (Red) glow from the right edge.
*   **Visuals:** Use high-quality iconography with a `sm` (0.5rem) blur to make them feel like light-leaks on film.

### Selection Chips
*   **Unselected:** `surface-container-highest` background, `on-surface-variant` text.
*   **Selected:** `secondary` background, `on-secondary-fixed` text. No borders.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical margins (e.g., 2rem on the left, 1rem on the right) for title headers to create an editorial look.
*   **Do** use `primary` for "Action" and `secondary` for "Information/Value."
*   **Do** embrace the "Surface Hierarchy." Always ensure nested elements are lighter than their parent containers.
*   **Do** use high-quality, full-bleed imagery whenever possible.

### Don’t
*   **Don’t** use 1px solid dividers or borders. They scream "generic template."
*   **Don’t** use pure white (#FFFFFF) for long-form body text; use `on-surface-variant` to reduce eye strain in dark mode.
*   **Don’t** use standard "drop shadows." If it doesn't look like ambient light, don't use it.
*   **Don’t** crowd the interface. If the metadata feels cramped, use the `spacing-10` (2.5rem) scale to let the elements breathe.