<script lang="ts">
	import { setContext } from 'svelte';
	import euCountries from '$lib/eu-contries';

	import Grid from './grid.svelte';
	import '../app.css';

	let total = 0

	function addTotal(n: number) {
		total += n
	}
	setContext('addTotal', addTotal)

	function subTotal(n: number) {
		total -= n
	}
	setContext('subTotal', subTotal)
</script>

<div class="w-full mb-10">
	{#each euCountries as contry}
		<div class="flex w-full flex-col">
			<div class="flex w-full flex-col justify-center align-middle">
				<Grid {contry} />
			</div>
		</div>
	{/each}
	<div class="w-full flex justify-center text-4xl font-bold text-black align-middle">
		<h1 class="mr-2">Total :</h1> {(total / 100).toFixed(2)}€
	</div>
</div>
