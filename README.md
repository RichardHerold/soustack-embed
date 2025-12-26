# Soustack Embed

Drop-in embed that renders a Soustack recipe card from a sidecar URL or Schema.org JSON-LD fallback. Ships ESM + UMD bundles that can be loaded from a CDN or served locally.

## Quick start

### ESM (module script)
```html
<link rel="stylesheet" href="https://cdn.example.com/soustack-embed.css" />
<div data-soustack="/soustack/recipes/lemon-tart.soustack.json"></div>
<script type="module">
  import SoustackEmbed from 'https://cdn.example.com/soustack-embed.esm.js';
  SoustackEmbed.renderEmbeds({ theme: { accent: '#22c55e' } });
</script>
```

### UMD (global)
```html
<link rel="stylesheet" href="https://cdn.example.com/soustack-embed.css" />
<div class="soustack-slot" data-servings="6"></div>
<script src="https://cdn.example.com/soustack-embed.umd.js"></script>
<script>
  SoustackEmbed.renderEmbeds({ selector: '.soustack-slot' });
</script>
```

## How it works
- **Input:** reads `data-soustack="/soustack/recipes/<slug>.soustack.json"` on any element.
- **Discovery fallback:** if no data attribute is present, reads `<link rel="alternate" type="application/vnd.soustack+json" href="...">`.
- **Rendering:** uses the lightweight `SoustackBlocks` UI helpers with CSS variables for customization.
- **Core logic:** normalization, scaling, and JSON-LD conversion live in `SoustackCore` to avoid duplicated behavior.
- **Schema.org fallback:** when no Soustack artifact is available, the embed will detect `application/ld+json` `Recipe` data and render it client-side.

## Options
`renderEmbeds(options)` / `hydrateSoustackEmbed(element, options)` support:
- `selector`: CSS selector for targets (default `"[data-soustack]"`).
- `theme`: map of CSS variable overrides (e.g., `{ accent: '#f97316', 'card-bg': '#fff' }`).
- `servings`: scale recipe to this serving count.
- `discovery`: set to `false` to skip `<link rel="alternate">` discovery.
- `allowJsonLdFallback`: `false` to disable Schema.org fallback.
- `shadowRoot`: `true` to render inside a shadow root when available.
- `createContainerFromDiscovery`: auto-create a container when only discovery is present (default: `true`).
- `onRender`: callback receiving `{ element, recipe, card }`.

## Development
1. Build the bundles:
   ```sh
   npm run build
   ```
2. Open the demo pages in a browser:
   - `demo/basic.html` (ESM + data attribute)
   - `demo/schema-fallback.html` (discovery + JSON-LD fallback)

## Styling
Base styles live in `dist/soustack-embed.css` and are also injected automatically when the script runs. Override CSS variables on the host element (e.g., `--soustack-accent`, `--soustack-card-bg`) or pass a `theme` object.
