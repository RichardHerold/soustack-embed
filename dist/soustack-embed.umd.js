/*!
 * soustack-embed build file.
 * Generated on 2025-12-26T00:31:39.511Z
 */
(function (global, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else {
    global.SoustackEmbed = factory();
  }
})(typeof globalThis !== 'undefined' ? globalThis : typeof self !== 'undefined' ? self : this, function () {
  /*!
   * soustack-embed v0.1.0
   * Lightweight embed that renders Soustack recipe artifacts.
   */

  const EMBED_STYLES = `
  :root {
    --soustack-card-bg: #ffffff;
    --soustack-card-border: #e5e7eb;
    --soustack-card-radius: 16px;
    --soustack-card-shadow: 0 8px 30px rgba(15, 23, 42, 0.08);
    --soustack-accent: #0ea5e9;
    --soustack-text: #0f172a;
    --soustack-subtext: #475569;
    --soustack-badge: #ecfeff;
  }

  .soustack-card {
    font-family: "Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
    background: var(--soustack-card-bg);
    color: var(--soustack-text);
    border-radius: var(--soustack-card-radius);
    border: 1px solid var(--soustack-card-border);
    box-shadow: var(--soustack-card-shadow);
    overflow: hidden;
    max-width: 720px;
    margin: 0 auto;
  }

  .soustack-card__media img {
    display: block;
    width: 100%;
    height: auto;
    object-fit: cover;
  }

  .soustack-card__body {
    padding: 20px 24px;
  }

  .soustack-card__eyebrow {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    color: var(--soustack-accent);
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    font-size: 11px;
    background: var(--soustack-badge);
    padding: 6px 10px;
    border-radius: 999px;
  }

  .soustack-card__header h3 {
    margin: 12px 0 8px;
    font-size: 24px;
  }

  .soustack-card__header p {
    margin: 0;
    color: var(--soustack-subtext);
  }

  .soustack-card__meta {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
    margin: 16px 0 12px;
  }

  .soustack-chip {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    background: #f8fafc;
    color: var(--soustack-text);
    padding: 8px 12px;
    border-radius: 12px;
    font-size: 13px;
    border: 1px solid var(--soustack-card-border);
  }

  .soustack-chip strong {
    font-weight: 700;
  }

  .soustack-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 18px;
  }

  .soustack-panel {
    background: #f8fafc;
    border-radius: 12px;
    padding: 14px 16px;
    border: 1px solid var(--soustack-card-border);
  }

  .soustack-panel h4 {
    margin: 0 0 12px;
    font-size: 15px;
    letter-spacing: 0.01em;
  }

  .soustack-list {
    list-style: none;
    padding: 0;
    margin: 0;
    display: grid;
    gap: 8px;
  }

  .soustack-list li {
    line-height: 1.5;
    color: var(--soustack-text);
  }

  .soustack-muted {
    color: var(--soustack-subtext);
  }

  .soustack-tag-row {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
  }

  .soustack-tag-row .soustack-chip {
    background: transparent;
  }

  .soustack-actions {
    margin-top: 16px;
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
  }

  .soustack-actions a {
    text-decoration: none;
    color: white;
    background: var(--soustack-accent);
    padding: 10px 14px;
    border-radius: 10px;
    font-weight: 600;
    border: 1px solid var(--soustack-accent);
  }

  .soustack-actions button {
    border: 1px solid var(--soustack-card-border);
    background: transparent;
    color: var(--soustack-text);
    padding: 10px 12px;
    border-radius: 10px;
    cursor: pointer;
  }

  .soustack-empty {
    padding: 12px;
    color: var(--soustack-subtext);
  }
  `;

  function injectStyles() {
    if (typeof document === 'undefined') return;
    const existing = document.getElementById('soustack-embed-styles');
    if (existing) return;
    const style = document.createElement('style');
    style.id = 'soustack-embed-styles';
    style.textContent = EMBED_STYLES;
    document.head.appendChild(style);
  }

  function toNumber(value) {
    const num = typeof value === 'string' ? parseFloat(value.replace(/[^0-9.\-]/g, '')) : Number(value);
    return Number.isFinite(num) ? num : null;
  }

  function parseIngredientLine(line) {
    if (!line) return { item: '', quantity: null, unit: '', note: '' };
    const quantityMatch = line.match(/^[\d\.\/\s]+/);
    let quantity = null;
    let rest = line.trim();
    if (quantityMatch) {
      const rawQty = quantityMatch[0].trim();
      quantity = rawQty.includes('/') ? evalFraction(rawQty) : toNumber(rawQty);
      rest = line.slice(quantityMatch[0].length).trim();
    }
    const tokens = rest.split(' ');
    const unit = tokens.length > 1 ? tokens.shift() : '';
    const item = [unit ? tokens.join(' ') : rest].join(' ').trim();
    return { item, quantity, unit, note: '' };
  }

  function evalFraction(text) {
    if (!text) return null;
    const parts = text.split(' ');
    let total = 0;
    for (const part of parts) {
      if (!part) continue;
      if (part.includes('/')) {
        const [a, b] = part.split('/').map(Number);
        if (a && b) total += a / b;
      } else {
        const num = Number(part);
        if (Number.isFinite(num)) total += num;
      }
    }
    return total || null;
  }

  function parseJsonLdRecipe(json) {
    if (!json) return null;
    if (Array.isArray(json)) {
      for (const entry of json) {
        const recipe = parseJsonLdRecipe(entry);
        if (recipe) return recipe;
      }
      return null;
    }
    if (json['@graph']) {
      return parseJsonLdRecipe(json['@graph']);
    }
    const types = Array.isArray(json['@type']) ? json['@type'] : [json['@type']];
    if (!types.includes('Recipe')) return null;
    const ingredients = (json.recipeIngredient || json.ingredients || []).map(parseIngredientLine);
    const steps = Array.isArray(json.recipeInstructions)
      ? json.recipeInstructions.map((step) => {
          if (typeof step === 'string') return { text: step };
          if (Array.isArray(step)) return { text: step.map((s) => (typeof s === 'string' ? s : s.text)).join(' ') };
          return { text: step.text || step.name || '' };
        })
      : [];

    return {
      name: json.name,
      description: json.description,
      image: Array.isArray(json.image) ? json.image[0] : json.image,
      recipeYield: json.recipeYield || json.yield,
      recipeIngredient: ingredients,
      recipeInstructions: steps,
      totalTime: json.totalTime || json.cookTime || json.prepTime,
      author: json.author?.name || json.author,
      url: json.url,
      keywords: json.keywords,
    };
  }

  function parseDuration(duration) {
    if (!duration) return null;
    if (typeof duration === 'number') return duration;
    const match = duration.match(/P(?:\d+Y)?(?:\d+M)?(?:\d+W)?(?:\d+D)?T?(\d+H)?(\d+M)?/i);
    if (!match) return null;
    const hours = match[1] ? Number(match[1].replace('H', '')) : 0;
    const minutes = match[2] ? Number(match[2].replace('M', '')) : 0;
    return hours * 60 + minutes || null;
  }

  const SoustackCore = {
    normalizeRecipe(data = {}) {
      const recipe = data.recipe || data;
      const ingredients = (recipe.ingredients || recipe.recipeIngredient || []).map((item) => {
        if (typeof item === 'string') return parseIngredientLine(item);
        return {
          item: item.item || item.name || item.text || '',
          quantity: item.quantity ?? toNumber(item.amount),
          unit: item.unit || item.measure || '',
          note: item.note || item.comment || '',
        };
      });

      const steps = (recipe.steps || recipe.recipeInstructions || []).map((step, index) => {
        if (typeof step === 'string') return { text: step, durationMinutes: null, index };
        return {
          text: step.text || step.name || step.description || '',
          durationMinutes: parseDuration(step.duration || step.time),
          index,
        };
      });

      const servings = toNumber(
        recipe.servings || recipe.yield?.amount || recipe.recipeYield || (typeof recipe.yield === 'string' ? recipe.yield : null)
      );

      return {
        title: recipe.title || recipe.name || 'Untitled Recipe',
        description: recipe.description || recipe.summary || '',
        image: recipe.image || (Array.isArray(recipe.images) ? recipe.images[0] : null),
        link: recipe.url || recipe.source || data.url,
        author: recipe.author || recipe.chef || '',
        servings,
        totalTimeMinutes: parseDuration(recipe.totalTime) || parseDuration(recipe.time) || null,
        ingredients,
        steps,
        tags: recipe.tags || recipe.keywords || [],
      };
    },

    scaleRecipe(recipe, targetServings) {
      if (!recipe || !targetServings || !recipe.servings || recipe.servings === targetServings) return recipe;
      const factor = targetServings / recipe.servings;
      const scaledIngredients = recipe.ingredients.map((ing) => ({
        ...ing,
        quantity: typeof ing.quantity === 'number' ? Math.round((ing.quantity * factor + Number.EPSILON) * 100) / 100 : ing.quantity,
      }));
      return { ...recipe, servings: targetServings, ingredients: scaledIngredients };
    },

    findJsonLdRecipe(doc = typeof document !== 'undefined' ? document : null) {
      if (!doc) return null;
      const scripts = Array.from(doc.querySelectorAll('script[type="application/ld+json"]'));
      for (const script of scripts) {
        try {
          const json = JSON.parse(script.textContent.trim());
          const recipe = parseJsonLdRecipe(json);
          if (recipe) return recipe;
        } catch (err) {
          console.warn('[soustack-embed] Failed to parse JSON-LD', err);
        }
      }
      return null;
    },

    fromJsonLd(json) {
      const recipe = parseJsonLdRecipe(json);
      if (!recipe) return null;
      return this.normalizeRecipe({
        recipe: {
          name: recipe.name,
          description: recipe.description,
          image: recipe.image,
          recipeYield: recipe.recipeYield,
          servings: recipe.recipeYield,
          ingredients: recipe.recipeIngredient,
          steps: recipe.recipeInstructions,
          totalTime: recipe.totalTime,
          author: recipe.author,
          tags: recipe.keywords,
          url: recipe.url,
        },
      });
    },
  };

  const SoustackBlocks = {
    applyTheme(root, theme = {}) {
      if (!root || !theme) return;
      const styleTarget = typeof ShadowRoot !== 'undefined' && root instanceof ShadowRoot ? root.host : root;
      Object.entries(theme).forEach(([key, value]) => {
        const cssKey = key.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
        styleTarget.style.setProperty(`--soustack-${cssKey}`, value);
      });
    },

    renderRecipeCard(target, recipe, options = {}) {
      injectStyles();
      if (!target) throw new Error('soustack-embed: target element not found');
      const root = options.shadowRoot && target.attachShadow ? target.attachShadow({ mode: 'open' }) : target;
      root.innerHTML = '';

      const wrapper = document.createElement('article');
      wrapper.className = 'soustack-card';
      const body = document.createElement('div');
      body.className = 'soustack-card__body';

      const eyebrow = document.createElement('div');
      eyebrow.className = 'soustack-card__eyebrow';
      eyebrow.textContent = 'Soustack Recipe';

      const header = document.createElement('div');
      header.className = 'soustack-card__header';
      const title = document.createElement('h3');
      title.textContent = recipe.title || 'Untitled Recipe';
      const desc = document.createElement('p');
      desc.textContent = recipe.description || 'No description provided.';
      header.appendChild(title);
      header.appendChild(desc);

      const meta = document.createElement('div');
      meta.className = 'soustack-card__meta';
      if (recipe.servings) {
        const chip = document.createElement('span');
        chip.className = 'soustack-chip';
        chip.innerHTML = `<strong>Servings</strong> ${recipe.servings}`;
        meta.appendChild(chip);
      }
      if (recipe.totalTimeMinutes) {
        const chip = document.createElement('span');
        chip.className = 'soustack-chip';
        chip.innerHTML = `<strong>Time</strong> ${recipe.totalTimeMinutes} min`;
        meta.appendChild(chip);
      }
      if (recipe.author) {
        const chip = document.createElement('span');
        chip.className = 'soustack-chip';
        chip.innerHTML = `<strong>By</strong> ${recipe.author}`;
        meta.appendChild(chip);
      }

      const grid = document.createElement('div');
      grid.className = 'soustack-grid';

      const ingredientsPanel = document.createElement('div');
      ingredientsPanel.className = 'soustack-panel';
      const ingTitle = document.createElement('h4');
      ingTitle.textContent = 'Ingredients';
      const ingList = document.createElement('ul');
      ingList.className = 'soustack-list';
      if (recipe.ingredients?.length) {
        recipe.ingredients.forEach((ing) => {
          const li = document.createElement('li');
          const qty = ing.quantity !== null && ing.quantity !== undefined ? `${ing.quantity} ` : '';
          const unit = ing.unit ? `${ing.unit} ` : '';
          li.textContent = `${qty}${unit}${ing.item}`.trim();
          if (ing.note) {
            const note = document.createElement('span');
            note.className = 'soustack-muted';
            note.textContent = ` — ${ing.note}`;
            li.appendChild(note);
          }
          ingList.appendChild(li);
        });
      } else {
        const empty = document.createElement('div');
        empty.className = 'soustack-empty';
        empty.textContent = 'No ingredients available.';
        ingList.appendChild(empty);
      }
      ingredientsPanel.appendChild(ingTitle);
      ingredientsPanel.appendChild(ingList);

      const stepsPanel = document.createElement('div');
      stepsPanel.className = 'soustack-panel';
      const stepsTitle = document.createElement('h4');
      stepsTitle.textContent = 'Steps';
      const stepsList = document.createElement('ol');
      stepsList.className = 'soustack-list';
      if (recipe.steps?.length) {
        recipe.steps.forEach((step) => {
          const li = document.createElement('li');
          const text = document.createElement('span');
          text.textContent = step.text || '';
          li.appendChild(text);
          if (step.durationMinutes) {
            const note = document.createElement('span');
            note.className = 'soustack-muted';
            note.textContent = ` (${step.durationMinutes} min)`;
            li.appendChild(note);
          }
          stepsList.appendChild(li);
        });
      } else {
        const empty = document.createElement('div');
        empty.className = 'soustack-empty';
        empty.textContent = 'No steps provided.';
        stepsList.appendChild(empty);
      }
      stepsPanel.appendChild(stepsTitle);
      stepsPanel.appendChild(stepsList);

      grid.appendChild(ingredientsPanel);
      grid.appendChild(stepsPanel);

      const actions = document.createElement('div');
      actions.className = 'soustack-actions';
      if (recipe.link) {
        const view = document.createElement('a');
        view.href = recipe.link;
        view.target = '_blank';
        view.rel = 'noopener noreferrer';
        view.textContent = 'View Full Recipe';
        actions.appendChild(view);
      }

      const badgesRow = document.createElement('div');
      badgesRow.className = 'soustack-tag-row';
      if (Array.isArray(recipe.tags)) {
        recipe.tags.filter(Boolean).forEach((tag) => {
          const chip = document.createElement('span');
          chip.className = 'soustack-chip';
          chip.textContent = tag;
          badgesRow.appendChild(chip);
        });
      }

      if (recipe.image) {
        const media = document.createElement('div');
        media.className = 'soustack-card__media';
        const img = document.createElement('img');
        img.src = recipe.image;
        img.alt = recipe.title || 'Recipe image';
        media.appendChild(img);
        wrapper.appendChild(media);
      }

      body.appendChild(eyebrow);
      body.appendChild(header);
      body.appendChild(meta);
      body.appendChild(grid);
      if (badgesRow.childElementCount) body.appendChild(badgesRow);
      if (actions.childElementCount) body.appendChild(actions);

      wrapper.appendChild(body);
      root.appendChild(wrapper);

      this.applyTheme(root, options.theme);
      return wrapper;
    },
  };

  async function fetchSoustackArtifact(url) {
    const response = await fetch(url, {
      headers: { Accept: 'application/vnd.soustack+json, application/json' },
    });
    if (!response.ok) throw new Error(`soustack-embed: failed to load artifact (${response.status})`);
    return response.json();
  }

  function discoverSoustackLink(doc = typeof document !== 'undefined' ? document : null) {
    if (!doc) return null;
    const link = doc.querySelector('link[rel="alternate"][type="application/vnd.soustack+json"]');
    return link?.href || null;
  }

  function applyThemeFromDataset(element, baseTheme = {}) {
    const theme = { ...baseTheme };
    const dataToCss = {
      accent: 'accent',
      cardBg: 'card-bg',
      cardBorder: 'card-border',
      cardRadius: 'card-radius',
    };

    Object.entries(dataToCss).forEach(([dataKey, cssKey]) => {
      const value = element.dataset[dataKey];
      if (value) theme[cssKey] = value;
    });

    return theme;
  }

  async function hydrateSoustackEmbed(element, options = {}) {
    const target = element;
    const datasetUrl = target.dataset.soustack;
    const fallbackUrl = options.discovery !== false ? discoverSoustackLink() : null;
    const artifactUrl = datasetUrl || fallbackUrl;
    let artifact = null;

    if (artifactUrl) {
      try {
        artifact = await fetchSoustackArtifact(artifactUrl);
      } catch (err) {
        console.warn('[soustack-embed] artifact fetch failed, falling back to JSON-LD', err);
      }
    }

    if (!artifact && options.allowJsonLdFallback !== false) {
      const jsonLdRecipe = SoustackCore.findJsonLdRecipe();
      if (jsonLdRecipe) {
        artifact = { recipe: jsonLdRecipe };
      }
    }

    if (!artifact) {
      const placeholder = document.createElement('div');
      placeholder.className = 'soustack-empty';
      placeholder.textContent = 'No Soustack artifact found.';
      target.innerHTML = '';
      target.appendChild(placeholder);
      return null;
    }

    const normalized = SoustackCore.normalizeRecipe(artifact);
    const requestedServings = toNumber(target.dataset.servings || options.servings);
    const scaled = requestedServings ? SoustackCore.scaleRecipe(normalized, requestedServings) : normalized;
    const theme = applyThemeFromDataset(target, options.theme);

    const card = SoustackBlocks.renderRecipeCard(target, scaled, {
      shadowRoot: options.shadowRoot,
      theme,
    });

    if (typeof options.onRender === 'function') {
      options.onRender({ element: target, recipe: scaled, card });
    }

    return scaled;
  }

  async function renderSoustackEmbeds(options = {}) {
    if (typeof document === 'undefined') return [];
    const selector = options.selector || '[data-soustack]';
    let nodes = Array.from(document.querySelectorAll(selector));
    const allowAutoContainer = options.createContainerFromDiscovery !== false;

    if (!nodes.length && allowAutoContainer) {
      const discovered = discoverSoustackLink();
      if (discovered) {
        const auto = document.createElement('div');
        auto.dataset.soustack = discovered;
        document.body.appendChild(auto);
        nodes = [auto];
      }
    }

    const results = [];
    for (const node of nodes) {
      const result = await hydrateSoustackEmbed(node, options);
      if (result) results.push(result);
    }
    return results;
  }

  const SoustackEmbed = {
    renderEmbeds: renderSoustackEmbeds,
    hydrate: hydrateSoustackEmbed,
    discoverSoustackLink,
    SoustackCore,
    SoustackBlocks,
  };

  if (typeof window !== 'undefined') {
    window.SoustackEmbed = SoustackEmbed;
    if (!window.__soustackEmbedInitialized) {
      window.__soustackEmbedInitialized = true;
      window.addEventListener('DOMContentLoaded', () => {
        renderSoustackEmbeds();
      });
    }
  }

  return SoustackEmbed;
});
