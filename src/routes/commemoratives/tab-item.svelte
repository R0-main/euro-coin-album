<script lang="ts">
	import { onMount } from 'svelte';
	import type { CommemorativeCoin } from '../../commeratives';
	import Modal from './modal.svelte';

	export let coin: CommemorativeCoin;

	function showModal() {
		const modal = document.getElementById(
			'P' + coin.uuid.replaceAll('-', '') + '_modal'
		) as HTMLDialogElement;
		if (modal) {
			modal.showModal(); // Ferme le modal
		}
	}
</script>

{#key coin}
	<Modal {coin} />
{/key}
<tr class=" hover cursor-pointer break-all" on:click={showModal}>
	<th class=" text-2xl">{coin.year || ''}</th>
	<td class=" text-2xl">{coin.label || ''}</td>
	<td class="flex justify-center text-2xl">{coin.contry || ''}</td>
</tr>
