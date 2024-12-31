import { coins } from '$lib/store';
import { uuidv4 } from './utils';

export class CommemorativeCoin {
	public static readonly localId: string = 'CommemorativesCoins';

	constructor(
		public contry: string,
		public label: string,
		public year: number,
		public count: number,
		public uuid: string = uuidv4()
	) {}

	public save() {
		if (!localStorage) return;
		let coins = CommemorativeCoin.getAll() || [];
		let id = coins.findIndex((coin) => coin.uuid == this.uuid);
		if (id != -1) coins[id] = this;
		else coins.push(this);
		coins.sort((a, b) => Math.abs(a.year) - Math.abs(b.year));
		localStorage.setItem(CommemorativeCoin.localId, JSON.stringify(coins));
	}

	public delete() {
		if (!localStorage) return;
		let coins = CommemorativeCoin.getAll() || [];
		coins = coins.filter((coin) => coin.uuid != this.uuid);
		localStorage.setItem(CommemorativeCoin.localId, JSON.stringify(coins));
	}

	public static getAll(): CommemorativeCoin[] {
		if (!localStorage) return [];
		let coins = JSON.parse(localStorage.getItem(CommemorativeCoin.localId) as string) || [];
		return coins.map(
			(coin: CommemorativeCoin) =>
				new CommemorativeCoin(coin.contry, coin.label, coin.year, coin.count, coin.uuid)
		);
	}
}
