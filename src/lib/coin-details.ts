export type CoinDetails = {
	mintage: number | null;
	notes: string;
};

export function emptyDetails(): CoinDetails {
	return { mintage: null, notes: '' };
}

export function hasDetails(details: CoinDetails): boolean {
	return details.mintage !== null || details.notes.trim() !== '';
}

function detailsKey(key: string) {
	return key + ':details';
}

export function loadDetails(key: string): CoinDetails {
	if (typeof localStorage === 'undefined') return emptyDetails();
	const stored = localStorage.getItem(detailsKey(key));
	if (!stored) return emptyDetails();
	try {
		const parsed = JSON.parse(stored);
		return {
			mintage: typeof parsed.mintage === 'number' ? parsed.mintage : null,
			notes: typeof parsed.notes === 'string' ? parsed.notes : ''
		};
	} catch (err) {
		console.error('Failed to read coin details for ' + key, err);
		return emptyDetails();
	}
}

export function saveDetails(key: string, details: CoinDetails) {
	if (typeof localStorage === 'undefined') return;
	if (hasDetails(details)) localStorage.setItem(detailsKey(key), JSON.stringify(details));
	else localStorage.removeItem(detailsKey(key));
}
