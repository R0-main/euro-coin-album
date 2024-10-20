<script lang="ts">
	import { getContext, onMount } from 'svelte';

	export let coinImg;
	export let key : string;
	export let row : number
	export let value : number;

	let isSelected = false;

	let addRowTotal : (row : number, n : number) => any = getContext('addRowTotal')
	let subRowTotal : (row : number, n : number) => any = getContext('subRowTotal')

	onMount(() => {
		const storedData = localStorage.getItem(key);
		if (storedData !== undefined && storedData !== null) {
			isSelected = JSON.parse(storedData);
			if (isSelected)
				addRowTotal(row, value)
		}
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
	class="m-0 h-[100px] w-[100px] justify-center border-2 border-solid border-gray-500 p-0 text-center align-middle hover:bg-gray-500"
	on:click={setSelected}
	tabindex="0"
	role="button"
>
	{#if isSelected}
		<img class=" h-full w-full" src={coinImg} alt="Coin" />
	{/if}
</td>
