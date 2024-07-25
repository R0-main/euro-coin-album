<script>
	import { onMount } from "svelte";

	export let coinImg;
	export let coin;
	export let contry;
	export let year;
	export let commemorative;
	export let id = 0;

	const key = contry + coin + year + commemorative + id;

	let isSelected = false

	onMount(() => {
		const storedData = localStorage.getItem(key)
		if (storedData !== undefined && storedData !== null) {
			isSelected = JSON.parse(storedData);
		}
	});

	function setSelected() {
		isSelected = !isSelected;
		localStorage.setItem(key, JSON.stringify(isSelected));
	}
</script>

<td
	class="m-0 h-[100px] w-[100px] justify-center border-2  border-solid border-gray-500 hover:bg-gray-500 p-0 text-center align-middle"
	on:click={setSelected}
	tabindex="0"
	role="button"
>
	{#if isSelected}
		<img class=" h-full w-full" src={coinImg} alt="Coin" />
	{/if}
</td>
