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

/** 15000000 → « 15 000 000 » : un séparateur insécable tous les 3 chiffres. */
export function formatMintage(mintage: number | null): string {
	if (mintage === null) return '';
	return String(mintage).replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

/** Ne garde que les chiffres saisis : « 15 000 000 » → 15000000. */
export function parseMintage(text: string): number | null {
	const digits = text.replace(/\D/g, '');
	if (digits === '') return null;
	return Number(digits);
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
