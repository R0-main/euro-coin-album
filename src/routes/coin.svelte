<script lang="ts">
	import { getContext, onDestroy, onMount } from 'svelte';

	export let coinImg;
	export let key : string;
	export let row : number
	export let value : number;
	/** Croix affichée par défaut quand la pièce n'a jamais été éditée. */
	export let defaultNotMinted = false;

	const notMintedKey = key + '-notminted';
	const longPressDelay = 600;

	let isSelected = false;
	let isNotMinted = false;
	let longPressTimer : ReturnType<typeof setTimeout> | undefined;
	let longPressFired = false;

	let addRowTotal : (row : number, n : number) => any = getContext('addRowTotal')
	let subRowTotal : (row : number, n : number) => any = getContext('subRowTotal')

	onMount(() => {
		const storedData = localStorage.getItem(key);
		if (storedData !== undefined && storedData !== null)
			isSelected = JSON.parse(storedData);

		const storedNotMinted = localStorage.getItem(notMintedKey);
		if (storedNotMinted !== undefined && storedNotMinted !== null)
			// Le choix de l'utilisateur prime toujours sur les données de frappe.
			isNotMinted = JSON.parse(storedNotMinted);
		// ...sinon la croix par défaut, sauf si la pièce est déjà cochée comme possédée.
		else if (!isSelected) isNotMinted = defaultNotMinted;

		if (isSelected && !isNotMinted)
			addRowTotal(row, value)
	});

	onDestroy(cancelLongPress);

	function storeSelected(selected : boolean) {
		isSelected = selected;
		localStorage.setItem(key, JSON.stringify(isSelected));
	}

	function storeNotMinted(notMinted : boolean) {
		isNotMinted = notMinted;
		localStorage.setItem(notMintedKey, JSON.stringify(isNotMinted));
	}

	function setSelected() {
		cancelLongPress();
		if (longPressFired) {
			longPressFired = false;
			return;
		}
		// Une case barrée revient d'abord à l'état vide : un simple clic ne
		// remplace jamais directement la croix par une pièce.
		if (isNotMinted) {
			storeNotMinted(false);
			return;
		}
		if (isSelected)
			subRowTotal(row, value)
		else addRowTotal(row, value)
		storeSelected(!isSelected);
	}

	function toggleNotMinted() {
		if (isNotMinted) {
			storeNotMinted(false);
			return;
		}
		if (isSelected) {
			subRowTotal(row, value)
			storeSelected(false);
		}
		storeNotMinted(true);
	}

	function handleContextMenu(event : MouseEvent) {
		event.preventDefault();
		toggleNotMinted();
	}

	// Sur écran tactile il n'y a pas de clic droit : un appui long fait la même chose.
	function startLongPress() {
		cancelLongPress();
		longPressFired = false;
		longPressTimer = setTimeout(() => {
			longPressTimer = undefined;
			longPressFired = true;
			toggleNotMinted();
		}, longPressDelay);
	}

	function cancelLongPress() {
		if (longPressTimer) {
			clearTimeout(longPressTimer);
			longPressTimer = undefined;
		}
	}
</script>

<td
	class="m-0 h-[100px] w-[100px] justify-center border-2 border-solid border-gray-500 p-0 text-center align-middle {isNotMinted
		? 'bg-red-50 hover:bg-red-100'
		: 'hover:bg-gray-500'}"
	on:click={setSelected}
	on:contextmenu={handleContextMenu}
	on:touchstart={startLongPress}
	on:touchend={cancelLongPress}
	on:touchmove={cancelLongPress}
	on:touchcancel={cancelLongPress}
	title={isNotMinted
		? "Pièce jamais éditée cette année-là — cliquez pour enlever la croix"
		: "Clic : j'ai cette pièce — Clic droit : cette pièce n'a jamais été éditée"}
	tabindex="0"
	role="button"
>
	{#if isNotMinted}
		<svg
			class="h-full w-full p-4 text-red-600"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="3"
			stroke-linecap="round"
			aria-hidden="true"
		>
			<path d="M4 4 L20 20 M20 4 L4 20" />
		</svg>
	{:else if isSelected}
		<img class=" h-full w-full" src={coinImg} alt="Coin" />
	{/if}
</td>
