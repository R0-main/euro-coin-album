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
 * - Estonie 2013 et 2014 : aucune pièce émise, et aucun coffret complet non plus
 *   (Wikipédia, « Estonian euro coins » : coffrets complets uniquement en 2011,
 *   2016, 2018 et 2022). Les pièces de collection en argent de ces années-là ne
 *   font pas partie des huit valeurs de la grille.
 * - Estonie 2012 : seuls les 1 et 2 centimes ont été frappés (commande de la
 *   Banque d'Estonie à la Monnaie royale des Pays-Bas).
 *
 * Les trous restants ne sont volontairement pas renseignés : les sources
 * consultables ne permettent pas de distinguer « millésime inexistant » de
 * « frappé uniquement en coffret » pour la Lettonie, la Lituanie, Chypre, Malte
 * ou Monaco après 2003. Mieux vaut une case vide à cocher qu'une croix fausse.
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
 * Années entières sans aucune pièce, alors que le pays frappait déjà des euros.
 *
 * Pour ajouter un trou : `'🇽🇽 Pays': [2013, 2014]`.
 */
export const notIssuedYears: Record<string, number[]> = {
	'🇪🇪 Estonie': [2013, 2014]
};

/**
 * Millésimes qui n'existent pour aucune émission (ni circulation, ni coffret),
 * pour une valeur faciale précise.
 *
 * Pour ajouter un trou : `'🇽🇽 Pays': { '1c': [2003, 2004] }`.
 */
export const notIssued: Record<string, Partial<Record<Denomination, number[]>>> = {
	'🇪🇪 Estonie': {
		'5c': [2012],
		'10c': [2012],
		'20c': [2012],
		'50c': [2012],
		'1€': [2012],
		'2€': [2012]
	},
	'🇲🇨 Monaco': { '1c': [2003], '2c': [2003], '5c': [2003] }
};

/** Cette pièce a-t-elle été éditée ? `true` si aucune donnée ne dit le contraire. */
export function isIssued(contry: string, coin: Denomination, year: number): boolean {
	const start = firstYear[contry];
	if (start !== undefined && year < start) return false;

	if (notIssuedYears[contry]?.includes(year)) return false;

	const gaps = notIssued[contry]?.[coin];
	if (gaps !== undefined && gaps.includes(year)) return false;

	return true;
}

export default isIssued;
