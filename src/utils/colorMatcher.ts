import { tailwindColors } from '../data/tailwindColors';

function hexToRgb(hex: string): [number, number, number] {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return [r, g, b];
}

function colorDistance(rgb1: [number, number, number], rgb2: [number, number, number]): number {
  const [r1, g1, b1] = rgb1;
  const [r2, g2, b2] = rgb2;
  return Math.sqrt(
    Math.pow(r2 - r1, 2) + Math.pow(g2 - g1, 2) + Math.pow(b2 - b1, 2)
  );
}

export type TailwindColorMatch = {
  name: string;
  shade: string | null;
  hex: string;
  tailwindClass: string;
};

export function findNearestTailwindColor(hex: string): TailwindColorMatch {
  const normalizedHex = hex.toLowerCase();

  if (!/^#[0-9a-f]{6}$/.test(normalizedHex)) {
    throw new Error('Invalid hex color format. Must be #RRGGBB');
  }

  // Handle black and white as special cases
  if (normalizedHex === '#000000') {
    return {
      name: 'black',
      shade: null,
      hex: '#000000',
      tailwindClass: 'black' // No suffix for black/white
    };
  }
  if (normalizedHex === '#ffffff') {
    return {
      name: 'white',
      shade: null,
      hex: '#ffffff',
      tailwindClass: 'white' // No suffix for black/white
    };
  }

  const inputRgb = hexToRgb(normalizedHex);
  let closestColor = {
    name: '',
    shade: '',
    hex: '',
    distance: Infinity,
    tailwindClass: ''
  };

  for (const [colorName, colorData] of Object.entries(tailwindColors)) {
    if (colorName === 'black' || colorName === 'white') continue;

    if (typeof colorData === 'object') {
      for (const [shade, shadeHex] of Object.entries(colorData)) {
        const shadeRgb = hexToRgb(shadeHex);
        const distance = colorDistance(inputRgb, shadeRgb);

        if (distance < closestColor.distance) {
          closestColor = {
            name: colorName,
            shade,
            hex: shadeHex,
            distance,
            tailwindClass: `${colorName}-${shade}`
          };
        }
      }
    }
  }

  return closestColor;
}

export function isValidHexColor(hex: string): boolean {
  return /^#[0-9A-F]{6}$/i.test(hex);
}