<script lang="ts">
	import { saveDetails, type CoinDetails } from '$lib/coin-details';

	export let storageKey: string;
	export let anchor: HTMLElement;
	export let details: CoinDetails;

	const width = 280;
	const margin = 8;

	let height = 0;
	let left = 0;
	let top = 0;

	// Le panneau est en position fixed pour ne pas être rogné par la grille :
	// on le colle nous-même au coin haut-gauche de la case.
	function place() {
		if (!anchor) return;
		const rect = anchor.getBoundingClientRect();
		top = rect.top - height;
		if (top < margin) top = rect.bottom;
		left = Math.max(margin, Math.min(rect.left, window.innerWidth - width - margin));
	}

	$: height, anchor, place();

	function persist() {
		saveDetails(storageKey, details);
	}
</script>

<svelte:window on:scroll={place} on:resize={place} />

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
	bind:clientHeight={height}
	class="fixed z-50 flex cursor-default flex-col gap-1 rounded-lg border-2 border-gray-500 bg-base-100 p-3 text-left shadow-xl"
	style="width:{width}px; left:{left}px; top:{top}px; visibility:{height ? 'visible' : 'hidden'}"
	on:click|stopPropagation
	on:mousedown|stopPropagation
	on:keydown|stopPropagation
	on:contextmenu|stopPropagation
	on:touchstart|stopPropagation
>
	<span class="text-sm font-bold">Nombre de pièces émises</span>
	<input
		type="number"
		min="0"
		placeholder="ex : 5000000"
		class="input input-bordered input-sm w-full"
		bind:value={details.mintage}
		on:input={persist}
	/>
	{#if details.mintage !== null}
		<span class="text-xs opacity-60">{details.mintage.toLocaleString('fr-FR')} pièces</span>
	{/if}
	<span class="mt-2 text-sm font-bold">Notes</span>
	<textarea
		rows="4"
		placeholder="Notes libres…"
		class="textarea textarea-bordered w-full resize-y text-sm"
		bind:value={details.notes}
		on:input={persist}
	/>
</div>
