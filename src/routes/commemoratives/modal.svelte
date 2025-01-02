<script lang="ts">
	import { getContext, onMount } from 'svelte';
	import { CommemorativeCoin } from '../../commeratives';
	import contries from '$lib/eu-contries';

	let id = 'create';
	export let coin: CommemorativeCoin | null = null;

	let updateCoins: () => any = getContext('updateCoins');

	let year: number | undefined;
	let label: string | undefined;
	let contry: string | undefined;
	let count: number | undefined;

	if (coin) {
		id = 'P' + coin.uuid.replaceAll('-', '');
		contry = coin.contry;
		label = coin.label;
		year = coin.year;
		count = coin.count;
	}

	let addTotal : (n : number) => any = getContext('addTotal')
	let subTotal : (n : number) => any = getContext('subTotal')

	function handleSubmit(event: any) {
		if (!coin) {
			coin = new CommemorativeCoin(contry as string, label as string, year as number, count as number);
			addTotal(200 * coin.count);
		} else {
			subTotal(200 * (coin.count - (count || 0)))
			coin.contry = contry as string;
			coin.label = label as string;
			coin.year = year as number;
			coin.count = count as number;
		}
		coin.save();
		year = undefined;
		label = undefined;
		contry = undefined;
		count = undefined;
		coin = null;
		updateCoins();
		// coins = CommemorativeCoin.getAll()
	}

	function closeModal() {
		const modal = document.getElementById(id + '_modal') as HTMLDialogElement;
		if (modal) {
			modal.close(); // Ferme le modal
		}
	}

	function deleteCoin() {
		if (!coin) return;
		coin.delete();
		updateCoins();
		subTotal(200 * coin.count);
		closeModal();
		// coins = CommemorativeCoin.getAll()
	}

	function copyToClipboard(value : any) {
		navigator.clipboard.writeText(value as string)
	}
</script>

<dialog id={id + '_modal'} class="modal">
	<div class="modal-box flex w-6/12 flex-col align-middle" style="max-width:none;">
		<form method="dialog" on:submit|preventDefault={handleSubmit}>
			<button
				type="button"
				class="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
				on:click={closeModal}>✕</button
			>
			<h3 class="text-3xl font-bold">Pièce commémorative</h3>
			<div class="mx-5 mt-10">
				<label class="form-control mb-10 h-full w-full justify-center align-middle">
					<div class="label">
						<span class="label-text text-2xl">Année</span>
						<button type="button" class="btn btn-neutral btn-active" on:click={() => copyToClipboard(year)}>Copier</button>
					</div>
					<input
						bind:value={year}
						on:scroll|preventDefault
						type="text"
						placeholder="Année"
						class="input input-bordered w-full"
					/>
					<div class="label" />
					<div class="label">
						<span class="label-text text-2xl">Désignation</span>
						<button type="button" class="btn btn-neutral btn-active" on:click={() => copyToClipboard(label)}>Copier</button>
					</div>
					<input
						bind:value={label}
						type="text"
						placeholder="Désignation"
						class="input input-bordered w-full"
					/>
					<div class="label" />
					<div class="label">
						<span class="label-text text-2xl">Nombre</span>
						<button type="button" class="btn btn-neutral btn-active" on:click={() => copyToClipboard(count)}>Copier</button>
					</div>
					<input
						bind:value={count}
						on:scroll|preventDefault
						type="number"
						placeholder="Nombre"
						class="input input-bordered w-full"
					/>
					<div class="label" />
					<div class="label">
						<span class="label-text text-2xl">Pays</span>
						<button type="button" class="btn btn-neutral btn-active" on:click={() => copyToClipboard(contry)}>Copier</button>
					</div>
					<select bind:value={contry} class="select select-bordered select-lg w-full text-3xl">
						<option disabled selected>Pays</option>
						{#each contries as contry}
							<option class="text-4xl">{contry}</option>
						{/each}
					</select>
					<div class="label" />
				</label>
				<div class="flex justify-between">
					<button type="submit" class="btn btn-neutral btn-active" on:click={closeModal}
						>Enregistrer</button
					>
					<div>
						{#if id != 'create'}
							<button
								type="button"
								class="btn btn-neutral btn-error text-white"
								on:click={deleteCoin}>Supprimer</button
							>
						{/if}
						<button type="button" class="btn btn-neutral btn-active" on:click={closeModal}
							>Annuler</button
						>
					</div>
				</div>
			</div>
		</form>
	</div>
</dialog>
