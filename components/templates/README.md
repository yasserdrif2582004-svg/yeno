# 🍽️ Templates de Menus Digitaux — 15 Designs Modernes

## Installation

1. **Copie le dossier `templates/`** dans ton projet (ex: `/app/templates/` ou `/components/templates/`)

2. **Installe Framer Motion** (si pas déjà fait) :
```bash
npm install framer-motion
```

3. **Utilise le renderer** dans ta page de menu :

```tsx
import { MenuTemplateRenderer } from "@/components/templates";

export default function RestaurantMenuPage({ restaurant, categories, items }) {
  // Détecte la langue selon le plan ou les prefs
  const lang = "fr"; // ou "en", "es"

  return (
    <MenuTemplateRenderer
      restaurant={restaurant}
      categories={categories}
      items={items}
      lang={lang}
    />
  );
}
```

## Ou utilise un template spécifique

```tsx
import { MinimalTemplate } from "@/components/templates";

<MinimalTemplate
  restaurant={restaurant}
  categories={categories}
  items={items}
  lang="fr"
/>
```

## Liste des 15 Templates

| ID | Nom | Style |
|----|-----|-------|
| `minimal` | Minimal Épuré | Typo bold, espace blanc, hero gradient |
| `modern` | Moderne | Cards grid, tabs animés, photos |
| `elegant` | Élégant | Serif, doré, centré, haut de gamme |
| `dark` | Dark Mode | Fond noir, accents néon/dorés |
| `cafe` | Café | Chaleureux, marron/beige, bistrot |
| `vibrant` | Vibrant | Dégradés colorés, bold, social |
| `nature` | Nature | Vert, éco, frais |
| `ocean` | Océan | Bleu, vagues, poisson |
| `sunset` | Sunset | Orange/jaune, chaleureux |
| `luxury` | Luxury | Noir + or, premium, épuré |
| `fresh` | Fresh | Vert lime, healthy, smoothie |
| `cozy` | Cozy | Rose, doux, salon de thé |
| `urban` | Urban | Gris, brut, street-food |
| `tropical` | Tropical | Turquoise, exotique, plage |
| `classic` | Classic | Serif Georgia, traditionnel |

## Personnalisation des couleurs

Chaque template utilise :
- `restaurant.primaryColor` → couleur principale (header, textes, boutons)
- `restaurant.accentColor` → couleur d'accent (prix, badges, hover)

Si non définies, des couleurs par défaut sont appliquées.

## Support des langues

Tous les templates supportent `fr`, `en`, `es` via :
- `getCategoryName(cat, lang)`
- `getItemName(item, lang)`
- `getItemDesc(item, lang)`

## Responsive

Tous les templates sont **100% responsive** (mobile + desktop).
