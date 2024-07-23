<script lang="ts">
	import { onMount } from 'svelte';
	import euCountries from '$lib/eu-contries';

	import Grid from './grid.svelte';
	import '../app.css'

	onMount(() => {
		
	});

	function setTheme(event: Event) {
		
	}
</script>

<div class="mx-auto w-full pt-5">
	{#each euCountries as contry}
		<Grid contry={contry} />
	{/each}
</div>
