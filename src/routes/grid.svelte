<script>
	import euCountries from '$lib/eu-contries';
	export let contry = euCountries[0];

	const from = 1999;
	const to = new Date().getFullYear() + 1;
</script>

<h1>{contry}</h1>

<div class="overflow-x-auto">
	<table class="table table-pin-rows table-pin-cols table-xs">
		<thead>
			<tr>
				<th />
				<td class=" justify-center align-middle text-center" >2€</td>
				<td class=" justify-center align-middle text-center">1€</td>
				<td class=" justify-center align-middle text-center">50c</td>
				<td class=" justify-center align-middle text-center">20c</td>
				<td class=" justify-center align-middle text-center">10c</td>
				<td class=" justify-center align-middle text-center">5c</td>
				<td class=" justify-center align-middle text-center">2c</td>
				<td class=" justify-center align-middle text-center">1c</td>
				<th />
			</tr>
		</thead>
		<tbody>
			{#each { length: to - from } as _, i}
				<tr>
					<th class=" justify-center align-middle text-center">{i + from}</th>
					{#each { length: 8 } as _, y}
						<td class=" justify-center align-middle text-center">
							<input type="checkbox" checked={true} class="checkbox checkbox-lg" />
						</td>
					{/each}
				</tr>
			{/each}
		</tbody>
	</table>
</div>
