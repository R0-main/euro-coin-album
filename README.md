# Euro Coin Album

Euro Coin Album is a SvelteKit application that helps collectors keep track of their euro coin collection. The app renders an interactive grid for every euro-area country, lets you mark the circulating coins you already own, and keeps a running total of your collection's value. Commemorative €2 coins can be catalogued separately with detailed metadata, all while the data is persisted locally in the browser via `localStorage`.

## Key Features

- **Interactive yearly grid** – Toggle each coin cell to indicate whether you own it; totals per year and an overall total are updated instantly.
- **"Never minted" marker** – Right-click (or long-press on touch devices) a cell to stamp it with a red cross, meaning that coin was never issued that year. A crossed cell counts for nothing in the totals, and a plain left click clears the cross again.
- **Crosses pre-filled from issuance data** – Cells are crossed by default for years when a country had no euro coins at all (Croatia before 2023, Bulgaria before 2026, Andorra before 2014…), based on the dataset in `src/lib/coin-issues.ts`. Nothing is written to storage: your own click always wins and is the only thing saved.
- **Commemorative coin manager** – Add, edit, search, and delete commemorative €2 coins with a modal form backed by local storage.
- **Built with modern tooling** – Uses SvelteKit, Tailwind CSS, and DaisyUI for a responsive, component-driven experience.

## Project Structure

```
src/
├── lib/
│   ├── eu-contries.ts      # List of EU member states used to build the grids
│   ├── euro-pieces.ts      # Metadata and imagery for standard euro coins
│   └── store.ts            # Svelte stores for commemorative coins and search queries
├── commeratives.ts         # CommemorativeCoin model with localStorage persistence
├── routes/
│   ├── +page.svelte        # Home page rendering the grids and commemorative manager
│   ├── grid.svelte         # Grid component for yearly circulating coins
│   ├── coin.svelte         # Individual coin cell with toggle logic
│   └── commemoratives/     # Modal and table rows for commemorative coins
└── utils.ts                # Utility helpers (e.g. UUID generation)
```

## Getting Started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Run the development server**

   ```bash
   npm run dev -- --open
   ```

   The app will be available at `http://localhost:5173` by default.

3. **Run quality checks**

   ```bash
   npm run lint
   npm run check
   npm test
   ```

4. **Create a production build**

   ```bash
   npm run build
   npm run preview
   ```

## Usage Notes

- All selections and commemorative entries are stored in the browser's `localStorage`. Clearing browser data will reset the album.
- A cell can be in one of three states: empty, owned (coin image) or never minted (red cross). The "never minted" flag lives under the cell's storage key suffixed with `-notminted`, so existing backups stay compatible.
- The default cross is computed from `src/lib/coin-issues.ts`, never stored. A cell already marked as owned is never crossed automatically, and clicking any cross writes an explicit override that survives future data updates. A coin struck for collector sets only (Finnish, Dutch or Italian 1c/2c of recent years) still exists as a millésime, so it is *not* crossed — only years with no coin at all are. Add a documented gap with `notIssued['🇽🇽 Pays'] = { '1c': [2003] }`.
- Countries and mint marks can be customised by editing `src/lib/eu-contries.ts`.
- The application is optimised for desktop usage; mobile behaviour depends on your Tailwind/DaisyUI theme configuration.

## Code Examples

### Creating a commemorative coin programmatically

```ts
import { CommemorativeCoin } from '../commeratives';

const coin = new CommemorativeCoin('🇫🇷 France', 'Fête de la Musique', 2016, 2);
coin.save();
```

The `CommemorativeCoin` class handles sorting and persistence automatically. Calling `save()` writes the coin to `localStorage`, where it will be picked up by the commemorative coin table on the next refresh or state update.

### Consuming commemorative coins inside a Svelte component

```svelte
<script lang="ts">
  import { coins } from '$lib/store';
  import type { CommemorativeCoin } from '../commeratives';

  $: commemoratives = $coins as CommemorativeCoin[];
</script>

<ul>
  {#each commemoratives as coin}
    <li>{coin.year} – {coin.label} ({coin.contry})</li>
  {/each}
</ul>
```

The `$coins` store is updated whenever a user creates, edits, or deletes a commemorative entry via the modal. Using the Svelte `$` store syntax keeps your component in sync with the latest collection state.

### Reacting to grid totals in a custom component

```svelte
<script lang="ts">
  import { getContext } from 'svelte';

  const addTotal = getContext<(value: number) => void>('addTotal');

  function claimBonus(value: number) {
    addTotal(value);
  }
</script>
```

`grid.svelte` exposes helper functions through Svelte's context API so that child components can contribute to the running totals. Pulling `addTotal` or `subTotal` from the context allows you to wire additional UI interactions into the same accounting logic used by the built-in grid cells.

## Contributing

1. Fork the repository and create a feature branch.
2. Make your changes with accompanying tests when possible.
3. Run `npm run lint`, `npm run check`, and `npm test` to verify your changes.
4. Open a pull request describing the update.

## License

This project is open source under the MIT license. See the `LICENSE` file for details.
