# zonebroz-website

## Scroll Animation System

This site uses a GSAP + ScrollTrigger setup that only animates `opacity` and `transform` to keep layout stable.

- Initial hidden state is applied via `html.js-anim [data-animate] { opacity: 0; }` before first paint.
- Scroll triggers fire when elements enter a center activation zone (35%–65% of the viewport).
- Elements above the activation zone are immediately revealed to avoid hidden content when navigating via anchors.
- Each element animates once by default; `data-anim-group` batches related items with subtle stagger.
- Transform cleanup is scoped to animation-only styles (`clearProps: "transform"`) so layout styles remain intact.
