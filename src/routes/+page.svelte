<script lang="ts">
	import { onMount, setContext } from 'svelte';
	import euCountries from '$lib/eu-contries';

	import Grid from './grid.svelte';
	import '../app.css';
	import { CommemorativeCoin } from '../commeratives';
	import TabItem from './commemoratives/tab-item.svelte';
	import Modal from './commemoratives/modal.svelte';
	import { coins } from '$lib/store';

	let total = 0;
	function updateCoins() {
		coins.set(CommemorativeCoin.getAll());
	}

	onMount(() => {
		updateCoins();
	});

	function addTotal(n: number) {
		total += n;
	}
	setContext('addTotal', addTotal);

	function subTotal(n: number) {
		total -= n;
	}
	setContext('subTotal', subTotal);

	setContext('updateCoins', updateCoins);

	function openModal() {
		const modal = document.getElementById('create_modal') as HTMLDialogElement;
		if (modal) {
			modal.showModal(); // Ferme le modal
		}
	}
</script>

<div class="mb-10 w-full">
	{#each euCountries as contry}
		<div class="flex w-full flex-col">
			<div class="flex w-full flex-col justify-center align-middle">
				<Grid {contry} />
			</div>
		</div>
	{/each}
	<div class="flex w-full justify-center align-middle text-4xl font-bold text-black">
		<h1 class="mr-2">Total :</h1>
		{(total / 100).toFixed(2)}€
	</div>
	<details class="collapse mt-10 bg-base-100 hover:bg-base-200">
		<summary class="collapse-title text-xl font-medium"
			><h1 class="my-5 w-full justify-center text-center align-middle text-5xl font-bold">
				<span role="img">🏅 Pièces Commémoratives</span>
			</h1>
		</summary>
		<div class="collapse-content flex flex-col justify-center gap-10">
			<!-- @ts-ignore -->
			<!-- svelte-ignore a11y-click-events-have-key-events -->
			<!-- svelte-ignore a11y-no-static-element-interactions -->
			<div class="flex w-full justify-center" on:click={openModal}>
				<button class="btn btn-neutral btn-active h-20 w-max text-2xl"
					><svg
						xmlns="http://www.w3.org/2000/svg"
						fill="none"
						viewBox="0 0 24 24"
						stroke-width={1.5}
						stroke="currentColor"
						class="size-10"
					>
						<path
							stroke-linecap="round"
							stroke-linejoin="round"
							d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
						/>
					</svg>
					Nouvelle Pièce commémorative</button
				>
			</div>
			<Modal />
			<div class=" mx-24">
				<table class="table table-lg border border-black">
					<thead class=" border border-black text-2xl">
						<tr>
							<th>Année</th>
							<th>Désignation</th>
							<th class="flex justify-center">Pays</th>
						</tr>
					</thead>
					<tbody>
						{#each $coins as coin}
							<TabItem {coin} />
						{/each}
					</tbody>
				</table>
			</div>
		</div>
	</details>
</div>
