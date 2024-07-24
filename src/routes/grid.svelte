<script>
	import euCountries from '$lib/eu-contries';
	import euroCoins from '$lib/euro-pieces';
	import Coin from './coin.svelte';
	export let contry = euCountries[0];

	const from = 1999;
	const to = new Date().getFullYear() + 1;
</script>

<h1 class=" my-5 w-full justify-center text-center align-middle text-5xl font-bold">
	<span role="img">{contry}</span>
</h1>

<div class=" flex w-full justify-center">
	<table class="table-pin-cols table-xs text-center mr-16">
		<thead>
			<tr>
				<th />
				{#each Object.keys(euroCoins).reverse() as coin}
					<td class=" font-bold text-2xl">{coin}</td>
				{/each}
			</tr>
		</thead>
		<tbody class="">
			{#each { length: to - from } as _, i}
				<tr>
					<th class=" font-bold text-2xl">{i + from}</th>
					{#each Object.values(euroCoins).reverse() as coinImg, y}
						<Coin coinImg={coinImg} contry={contry} coin={Object.keys(euroCoins)[y]} year={i + from}/>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
