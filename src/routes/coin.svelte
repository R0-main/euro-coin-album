<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { emptyDetails, hasDetails, loadDetails, type CoinDetails } from '$lib/coin-details';
	import CoinDetailsPanel from './coin-details-panel.svelte';

	export let coinImg;
	export let key : string;
	export let row : number
	export let value : number;

	let isSelected = false;
	let hovered = false;
	let cell : HTMLTableCellElement;
	let details : CoinDetails = emptyDetails();

	let addRowTotal : (row : number, n : number) => any = getContext('addRowTotal')
	let subRowTotal : (row : number, n : number) => any = getContext('subRowTotal')

	onMount(() => {
		const storedData = localStorage.getItem(key);
		if (storedData !== undefined && storedData !== null) {
			isSelected = JSON.parse(storedData);
			if (isSelected)
				addRowTotal(row, value)
		}
		details = loadDetails(key);
	});

	function setSelected() {
		if (isSelected)
			subRowTotal(row, value)
		else addRowTotal(row, value)
		isSelected = !isSelected;
		localStorage.setItem(key, JSON.stringify(isSelected));
	}
</script>

<td
	bind:this={cell}
	class="relative m-0 h-[100px] w-[100px] justify-center border-2 border-solid border-gray-500 p-0 text-center align-middle hover:bg-gray-500"
	on:click={setSelected}
	on:mouseenter={() => (hovered = true)}
	on:mouseleave={() => (hovered = false)}
	tabindex="0"
	role="button"
>
	{#if isSelected}
		<img class=" h-full w-full" src={coinImg} alt="Coin" />
		{#if hasDetails(details)}
			<span
				class="pointer-events-none absolute right-1 top-1 h-3 w-3 rounded-full border border-white bg-amber-500"
				title="Informations saisies"
			/>
		{/if}
		{#if hovered}
			<CoinDetailsPanel storageKey={key} anchor={cell} bind:details />
		{/if}
	{/if}
</td>
