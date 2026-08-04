import { describe, expect, it } from 'vitest';
import euCountries from './eu-contries';
import euroCoins from './euro-pieces';
import { firstYear, isIssued, notIssued, type Denomination } from './coin-issues';

const denominations = Object.keys(euroCoins) as Denomination[];

describe('coin-issues', () => {
	it('couvre tous les pays de la grille', () => {
		for (const contry of euCountries) expect(firstYear[contry], contry).toBeDefined();
	});

	it("n'a pas d'entrée orpheline", () => {
		for (const contry of Object.keys(firstYear)) expect(euCountries, contry).toContain(contry);
		for (const contry of Object.keys(notIssued)) {
			expect(euCountries, contry).toContain(contry);
			for (const coin of Object.keys(notIssued[contry])) expect(denominations).toContain(coin);
		}
	});

	it('barre les années antérieures au premier millésime', () => {
		expect(isIssued('🇭🇷 Croatie', '2€', 2022)).toBe(false);
		expect(isIssued('🇭🇷 Croatie', '2€', 2023)).toBe(true);
		expect(isIssued('🇧🇬 Bulgarie', '1c', 2025)).toBe(false);
		expect(isIssued('🇧🇬 Bulgarie', '1c', 2026)).toBe(true);
		expect(isIssued('🇩🇪 Allemagne - A', '1€', 2001)).toBe(false);
		expect(isIssued('🇫🇷 France', '1€', 1999)).toBe(true);
	});

	it('barre les trous connus par valeur faciale', () => {
		expect(isIssued('🇲🇨 Monaco', '5c', 2003)).toBe(false);
		expect(isIssued('🇲🇨 Monaco', '10c', 2003)).toBe(true);
	});

	it('ne barre pas les pièces frappées uniquement en coffret', () => {
		// 1c/2c finlandais, néerlandais et italiens récents : hors circulation
		// mais le millésime existe, donc pas de croix.
		expect(isIssued('🇫🇮 Finlande', '1c', 2020)).toBe(true);
		expect(isIssued('🇳🇱 Pays-Bas', '2c', 2020)).toBe(true);
		expect(isIssued('🇮🇹 Italie', '1c', 2020)).toBe(true);
	});

	it('considère une pièce comme éditée par défaut', () => {
		expect(isIssued('🇽🇽 Pays inconnu', '2€', 1999)).toBe(true);
	});
});
