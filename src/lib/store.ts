import { writable } from 'svelte/store';
import type { CommemorativeCoin } from '../commeratives';

export const coins = writable<CommemorativeCoin[]>([]);