import euroCoins from './euro-pieces';

export type Denomination = keyof typeof euroCoins;

/**
 * Données de frappe des pièces de circulation.
 *
 * Règle retenue : une case n'est considérée « jamais éditée » que si le millésime
 * n'existe pas du tout. Une pièce frappée uniquement en coffret BU (1c/2c de
 * Finlande, des Pays-Bas ou d'Italie par exemple) existe bel et bien avec ce
 * millésime : un collectionneur peut l'avoir dans son album, donc pas de croix.
 *
 * Ces données servent uniquement de valeur par défaut : dès que l'utilisateur
 * clique sur une case, son choix est enregistré et prend le pas sur elles.
 *
 * Sources :
 * - Années d'adoption / premiers millésimes : Wikipédia « euro coins » par pays,
 *   Commission européenne (faces nationales des pièces en euro).
 * - Seuls la Belgique, l'Espagne, la Finlande, la France et les Pays-Bas ont
 *   frappé des pièces datées 1999, 2000 et 2001 ; les autres pays de la première
 *   vague datent leurs pièces de l'année d'émission, donc 2002 au plus tôt.
 * - Monaco 2003 : les 1, 2 et 5 centimes n'ont pas été émis (Wikipédia,
 *   « Monégasque euro coins »).
 */

/** Premier millésime existant pour chaque pays de la grille. */
export const firstYear: Record<string, number> = {
	'🇩🇪 Allemagne - A': 2002,
	'🇩🇪 Allemagne - D': 2002,
	'🇩🇪 Allemagne - F': 2002,
	'🇩🇪 Allemagne - G': 2002,
	'🇩🇪 Allemagne - J': 2002,
	'🇦🇩 Andorre': 2014,
	'🇦🇹 Autriche': 2002,
	'🇧🇪 Belgique': 1999,
	'🇧🇬 Bulgarie': 2026,
	'🇨🇾 Chypre': 2008,
	'🇭🇷 Croatie': 2023,
	'🇪🇸 Espagne': 1999,
	'🇪🇪 Estonie': 2011,
	'🇫🇮 Finlande': 1999,
	'🇫🇷 France': 1999,
	'🇬🇷 Grèce': 2002,
	'🇮🇪 Irlande': 2002,
	'🇮🇹 Italie': 2002,
	'🇱🇻 Lettonie': 2014,
	'🇱🇹 Lituanie': 2015,
	'🇱🇺 Luxembourg': 2002,
	'🇲🇹 Malte': 2008,
	'🇲🇨 Monaco': 2001,
	'🇳🇱 Pays-Bas': 1999,
	'🇵🇹 Portugal': 2002,
	'🇸🇰 Slovaquie': 2009,
	'🇸🇮 Slovénie': 2007,
	'🇸🇲 Saint-Marin': 2002,
	'🇻🇦 Vatican': 2002
};

/**
 * Millésimes qui n'existent pour aucune émission (ni circulation, ni coffret),
 * alors que le pays frappait déjà des euros cette année-là.
 *
 * Pour ajouter un trou : `'🇽🇽 Pays': { '1c': [2003, 2004] }`.
 */
export const notIssued: Record<string, Partial<Record<Denomination, number[]>>> = {
	'🇲🇨 Monaco': { '1c': [2003], '2c': [2003], '5c': [2003] }
};

/** Cette pièce a-t-elle été éditée ? `true` si aucune donnée ne dit le contraire. */
export function isIssued(contry: string, coin: Denomination, year: number): boolean {
	const start = firstYear[contry];
	if (start !== undefined && year < start) return false;

	const gaps = notIssued[contry]?.[coin];
	if (gaps !== undefined && gaps.includes(year)) return false;

	return true;
}

export default isIssued;
