<script lang="ts">
	import { onMount } from 'svelte';
	import type { CommemorativeCoin } from '../../commeratives';
	import Modal from './modal.svelte';
	import { search } from '$lib/store';

	export let coin: CommemorativeCoin;

	function showModal() {
		const modal = document.getElementById(
			'P' + coin.uuid.replaceAll('-', '') + '_modal'
		) as HTMLDialogElement;
		if (modal) {
			modal.showModal(); // Ferme le modal
		}
	}

	function is_searched() {
		if ($search == '')
			return (true)
		if (
			coin?.label?.toLocaleLowerCase().includes($search.toLocaleLowerCase()) ||
			coin?.contry?.toLocaleLowerCase().includes($search.toLocaleLowerCase())
		) return true;
	}
</script>

{#key $search}
	{#if is_searched()}
		{#key coin}
			<Modal {coin} />
		{/key}
		<tr class=" hover cursor-pointer break-all" on:click={showModal}>
			<th class=" text-2xl">{coin.year || ''}</th>
			<td class=" text-2xl">{coin.label || ''}</td>
			<td class="text-2xl">{coin.count || '1'}</td>
			<td class="flex justify-center text-2xl">{coin.contry || ''}</td>
		</tr>
	{/if}
{/key}
