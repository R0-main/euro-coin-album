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
 * Les trous de la Lettonie, de la Lituanie, de Malte et de Monaco ont depuis été
 * tranchés en croisant les tableaux de frappe de Wikipédia (légende « — aucune
 * pièce frappée » vs « s : petites quantités pour coffrets uniquement ») avec les
 * fiches Numista par type, qui listent séparément les tirages en coffret BU.
 * Les deux sources concordent sur tous les points vérifiés.
 *
 * Pays sans aucun trou (vérifiés, aucune croix à poser) : Chypre, Slovénie,
 * Slovaquie, Saint-Marin, Vatican, Andorre. Ces pays émettent un coffret annuel
 * couvrant les huit valeurs, donc chaque millésime existe.
 *
 * Allemagne : le tableau de Wikipédia est bien ventilé par atelier (A, D, F, G, J)
 * et ne contient que des chiffres ou des « s » — aucun atelier n'a sauté une
 * valeur. Aucune croix par atelier n'est donc justifiée.
 *
 * 2025 et 2026 restent volontairement vierges partout : les tirages ne sont pas
 * encore consolidés. Mieux vaut une case vide à cocher qu'une croix fausse.
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
	// confirmé — coffrets complets uniquement en 2011, 2016, 2018 et 2022.
	// https://en.wikipedia.org/wiki/Estonian_euro_coins
	'🇪🇪 Estonie': [2013, 2014],

	// confirmé — pas de coffret BU cette année-là, aucune valeur frappée.
	// Wikipédia : ligne 2017 entièrement « — ». Numista : 2017 absent des fiches
	// 1c, 5c et 1 €. Les 2 € commémoratives 2017 (Kurzeme, Latgale) ne comptent pas.
	// https://en.wikipedia.org/wiki/Latvian_euro_coins
	// https://en.numista.com/53177 · https://en.numista.com/catalogue/pieces53179.html
	// https://en.numista.com/catalogue/pieces53187.html
	'🇱🇻 Lettonie': [2017],

	// confirmé — aucune frappe maltaise en 2009, coffret compris.
	// Wikipédia : ligne 2009 entièrement « — ». Numista : 2009 absent des fiches
	// 1c, 10c et 2 €.
	// https://en.wikipedia.org/wiki/Maltese_euro_coins
	// https://en.numista.com/2181 · https://en.numista.com/catalogue/pieces2184.html
	// https://en.numista.com/catalogue/pieces2188.html
	'🇲🇹 Malte': [2009],

	// confirmé — ni coffret BU ni frappe de circulation en 2008.
	// Wikipédia : ligne 2008 entièrement « — ». Numista : 2008 absent de la fiche 1c
	// Albert II, dont le motif d'années correspond exactement à Wikipédia sur 20 ans.
	// https://en.wikipedia.org/wiki/Monegasque_euro_coins
	// https://en.numista.com/catalogue/pieces5028.html
	'🇲🇨 Monaco': [2008]
};

/**
 * Millésimes qui n'existent pour aucune émission (ni circulation, ni coffret),
 * pour une valeur faciale précise.
 *
 * Pour ajouter un trou : `'🇽🇽 Pays': { '1c': [2003, 2004] }`.
 */
export const notIssued: Record<string, Partial<Record<Denomination, number[]>>> = {
	// confirmé — 2012 : seuls les 1c et 2c ont été commandés par la Banque d'Estonie.
	// https://en.wikipedia.org/wiki/Estonian_euro_coins
	'🇪🇪 Estonie': {
		'5c': [2012],
		'10c': [2012],
		'20c': [2012],
		'50c': [2012],
		'1€': [2012],
		'2€': [2012]
	},

	// 2023 : seule la 5c a été frappée (15 000 000, Monnaie de Finlande), sans coffret BU.
	// confirmé pour 1c et 1 € (absents de Numista) ; la 5c 2023 est bien présente sur
	// Numista, ce qui valide la forme de la ligne. probable pour 2c/10c/20c/50c/2 €,
	// qui reposent sur le tableau Wikipédia — mais ces valeurs n'existent en Lettonie
	// que par le coffret annuel, absent en 2023.
	// https://en.wikipedia.org/wiki/Latvian_euro_coins · https://en.numista.com/53177
	// https://en.numista.com/catalogue/pieces53179.html (5c 2023 = 15 000 000)
	// https://en.numista.com/catalogue/pieces53187.html
	'🇱🇻 Lettonie': {
		'1c': [2023],
		'2c': [2023],
		'10c': [2023],
		'20c': [2023],
		'50c': [2023],
		'1€': [2023],
		'2€': [2023]
	},

	// confirmé, les huit valeurs vérifiées une à une sur Numista ET Wikipédia.
	// 2016 : seule la 1c existe (20 000 000). 2017 : 5c, 50c et 1 € non frappées.
	// Aucun coffret BU lituanien en 2016 ni 2017 (Numista passe de 2015 à 2018).
	// https://en.wikipedia.org/wiki/Lithuanian_euro_coins
	// https://en.numista.com/catalogue/pieces67625.html (1c : 2016 présent)
	// https://en.numista.com/catalogue/pieces67626.html · .../pieces67627.html
	// https://en.numista.com/catalogue/pieces67628.html · .../pieces67629.html
	// https://en.numista.com/catalogue/pieces67630.html · .../pieces67631.html
	// https://en.numista.com/catalogue/pieces67632.html
	'🇱🇹 Lituanie': {
		'2c': [2016],
		'5c': [2016, 2017],
		'10c': [2016],
		'20c': [2016],
		'50c': [2016, 2017],
		'1€': [2016, 2017],
		'2€': [2016]
	},

	// 2010 : seule la 2 € ordinaire a été frappée (2 000 000). L'année 2009 entière
	// est dans notIssuedYears.
	// confirmé pour 1c et 10c (absents de Numista) et pour la 2 € 2010 (présente).
	// probable pour 2c/5c/20c/50c/1 €, tableau Wikipédia seul.
	// https://en.wikipedia.org/wiki/Maltese_euro_coins · https://en.numista.com/2181
	// https://en.numista.com/catalogue/pieces2184.html · .../pieces2188.html
	'🇲🇹 Malte': {
		'1c': [2010],
		'2c': [2010],
		'5c': [2010],
		'10c': [2010],
		'20c': [2010],
		'50c': [2010],
		'1€': [2010]
	},

	// Monaco ne frappe les petites valeurs que les années où un coffret BU paraît.
	// confirmé pour la 1c : le motif d'années de Numista (2001, 2002, 2004, 2005, 2006,
	// 2009, 2011, 2013, 2014, 2017, 2020, 2025) recoupe exactement Wikipédia sur deux
	// types successifs. confirmé aussi pour la 10c 2005 (fiche Rainier III : 2001-2004).
	// probable pour 2c/5c (co-émises avec la 1c) et 20c/50c (co-émises avec la 10c).
	// probable pour 1 € et 2 €, tableau Wikipédia seul.
	// 2008 est dans notIssuedYears. 2025 et 2026 laissées vierges.
	// https://en.wikipedia.org/wiki/Monegasque_euro_coins
	// https://en.numista.com/204 (1c 2001-2005 : 2003 absent)
	// https://en.numista.com/catalogue/pieces5028.html (1c 2006-2025)
	// https://en.numista.com/207 (10c 2001-2004)
	'🇲🇨 Monaco': {
		'1c': [2003, 2007, 2010, 2012, 2015, 2016, 2018, 2019, 2021, 2022, 2023, 2024],
		'2c': [2003, 2007, 2010, 2012, 2015, 2016, 2018, 2019, 2021, 2022, 2023, 2024],
		'5c': [2003, 2007, 2010, 2012, 2015, 2016, 2018, 2019, 2021, 2022, 2023, 2024],
		'10c': [2005, 2007, 2010, 2012, 2015, 2016, 2018, 2019, 2021, 2022, 2023, 2024],
		'20c': [2005, 2007, 2010, 2012, 2015, 2016, 2018, 2019, 2021, 2022, 2023, 2024],
		'50c': [2005, 2007, 2010, 2012, 2015, 2016, 2018, 2019, 2021, 2022, 2023, 2024],
		'1€': [2005, 2010, 2012, 2015],
		'2€': [2005, 2007]
	}
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
