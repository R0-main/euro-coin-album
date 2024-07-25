<script>
	import euCountries from '$lib/eu-contries';
	import euroCoins from '$lib/euro-pieces';
	import Coin from './coin.svelte';
	export let contry = euCountries[0];

	const from = 1999;
	const to = new Date().getFullYear() + 1;

	const commemorativesCount = 5
</script>

<details class="collapse bg-base-100 hover:bg-base-200">
	<summary class="collapse-title text-xl font-medium"
		><h1 class="my-5 w-full justify-center text-center align-middle text-5xl font-bold">
			<span role="img">{contry}</span>
		</h1>
	</summary>
	<div class="collapse-content">
		<div class="flex w-full flex-col justify-center">
			<div class="flex w-full justify-center">
				<table class="table-pin-cols table-xs mr-16 text-center">
					<thead>
						<tr>
							<th />
							{#each Object.keys(euroCoins).reverse() as coin}
								<td class="text-2xl font-bold">{coin}</td>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each { length: to - from } as _, i}
							<tr>
								<th class="text-2xl font-bold">{i + from}</th>
								{#each Object.values(euroCoins).reverse() as coinImg, y}
									<Coin
										{coinImg}
										{contry}
										coin={Object.keys(euroCoins)[y]}
										year={i + from}
									/>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div>

			<!-- <h1 class="my-5 w-full justify-center text-center align-middle text-5xl font-bold">
				<span role="img">🏅 Pièces Commémoratives {contry}</span>
			</h1>

			<div class="flex w-full justify-center">
				<table class="table-pin-cols table-xs mr-16 text-center">
					<thead>
						<tr>
							<th />
							{#each { length: commemorativesCount } as _}
								<td class="text-2xl font-bold">2€</td>
							{/each}
						</tr>
					</thead>
					<tbody>
						{#each { length: to - from } as _, i}
							<tr>
								<th class="text-2xl font-bold">{i + from}</th>
								{#each { length: commemorativesCount } as _, id}
									<Coin
										coinImg={euroCoins['2€']}
										{contry}
										coin={'2€'}
										year={i + from}
										commemorative={true.toString()}
										id={id.toString()}
									/>
								{/each}
							</tr>
						{/each}
					</tbody>
				</table>
			</div> -->
		</div>
	</div>
</details>
