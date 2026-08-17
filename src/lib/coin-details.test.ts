import { describe, expect, it } from 'vitest';
import { formatMintage, parseMintage } from './coin-details';

const nbsp = ' ';

describe('formatMintage', () => {
	it('sépare les milliers', () => {
		expect(formatMintage(15000000)).toBe(`15${nbsp}000${nbsp}000`);
		expect(formatMintage(5000)).toBe(`5${nbsp}000`);
	});

	it('laisse les nombres à moins de 4 chiffres intacts', () => {
		expect(formatMintage(0)).toBe('0');
		expect(formatMintage(999)).toBe('999');
	});

	it('rend une chaîne vide sans valeur', () => {
		expect(formatMintage(null)).toBe('');
	});
});

describe('parseMintage', () => {
	it('ignore les séparateurs et les caractères non numériques', () => {
		expect(parseMintage(`15${nbsp}000${nbsp}000`)).toBe(15000000);
		expect(parseMintage('1 234 567')).toBe(1234567);
		expect(parseMintage('12a3')).toBe(123);
	});

	it('rend null quand il ne reste aucun chiffre', () => {
		expect(parseMintage('')).toBeNull();
		expect(parseMintage('  ')).toBeNull();
	});

	it('fait l’aller-retour avec formatMintage', () => {
		expect(parseMintage(formatMintage(15000000))).toBe(15000000);
	});
});
