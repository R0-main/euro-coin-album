<script lang="ts">
	import { onMount } from 'svelte';
	import euCountries from '$lib/eu-contries';

	import Grid from './grid.svelte';
	import '../app.css';

	onMount(() => {
		console.log('fwqfqw')
	});

	function setTheme(event: Event) {}
</script>

<div class="w-full">
	{#each euCountries as contry}
		<div class="flex w-full flex-col">
			<div class="flex w-full flex-col justify-center align-middle">
				<Grid {contry} />
			</div>
		</div>
	{/each}
</div>
