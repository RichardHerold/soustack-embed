# @soustack/embed

Drop-in embed that renders a Soustack recipe card from a sidecar URL or Schema.org JSON-LD fallback. Ships ESM + UMD bundles that can be loaded from a CDN or served locally.

> **Note:** This repo vendors build artifacts from `soustack-blocks/packages/embed/dist`. The embed runtime logic lives in the `soustack-blocks` repository. To refresh the `dist/` directory, copy the contents from `soustack-blocks/packages/embed/dist` to this repo's `dist/` directory.

## Quick start

### ESM (module script)
```html
<div data-soustack="/soustack/recipes/lemon-tart.soustack.json"></div>
<script type="module">
  import { init } from '@soustack/embed';
  init({ theme: { accent: '#22c55e' } });
</script>
```

### UMD (global / CDN)
```html
<div class="soustack-slot" data-servings="6"></div>
<script src="https://unpkg.com/@soustack/embed"></script>
<script>
  SoustackEmbed.init({ selector: '.soustack-slot' });
</script>
```

## Installation

```bash
npm install @soustack/embed
```

## Usage

### ESM
```javascript
import { init } from '@soustack/embed';

init({ 
  theme: { accent: '#f97316' },
  servings: 4
});
```

### UMD / Browser
```html
<script src="https://unpkg.com/@soustack/embed"></script>
<script>
  SoustackEmbed.init({ 
    selector: '[data-soustack]',
    theme: { accent: '#22c55e' }
  });
</script>
```

## How it works
- **Input:** reads `data-soustack="/soustack/recipes/<slug>.soustack.json"` on any element.
- **Discovery fallback:** if no data attribute is present, reads `<link rel="alternate" type="application/vnd.soustack+json" href="...">`.
- **Rendering:** uses the lightweight `SoustackBlocks` UI helpers with CSS variables for customization.
- **Core logic:** normalization, scaling, and JSON-LD conversion live in `SoustackCore` to avoid duplicated behavior.
- **Schema.org fallback:** when no Soustack artifact is available, the embed will detect `application/ld+json` `Recipe` data and render it client-side.

## Options
`init(options)` supports:
- `selector`: CSS selector for targets (default `"[data-soustack]"`).
- `theme`: map of CSS variable overrides (e.g., `{ accent: '#f97316', 'card-bg': '#fff' }`).
- `servings`: scale recipe to this serving count.
- `discovery`: set to `false` to skip `<link rel="alternate">` discovery.
- `allowJsonLdFallback`: `false` to disable Schema.org fallback.
- `shadowRoot`: `true` to render inside a shadow root when available.
- `createContainerFromDiscovery`: auto-create a container when only discovery is present (default: `true`).
- `onRender`: callback receiving `{ element, recipe, card }`.

## Development

This package is a distribution wrapper. To update the vendored artifacts:

1. Build the embed in `soustack-blocks`:
   ```sh
   cd soustack-blocks
   npm run build
   ```

2. Copy the dist files:
   ```sh
   cp -r soustack-blocks/packages/embed/dist/* ./dist/
   ```

3. Verify the dist files:
   ```sh
   npm run verify:dist
   ```

## Styling
Base styles are included in the bundle and injected automatically when the script runs. Override CSS variables on the host element (e.g., `--soustack-accent`, `--soustack-card-bg`) or pass a `theme` object.
