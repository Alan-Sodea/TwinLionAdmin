import { hookstate } from '@hookstate/core';

export const globalStore = hookstate([

]);

<<<<<<< HEAD
export const imagestore = hookstate([

]);

=======
>>>>>>> c143956da62df84ebaf8b2c3f86b0f83528dba1f
export const presetLayouts = [
  '/case1.png',
  '/case2.png',
  '/case3.png',
]

export const isConnected = hookstate(false);
export const ThePassword = hookstate("admin123");

export const actualSection = hookstate("");
