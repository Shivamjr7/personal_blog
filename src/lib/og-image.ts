import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import satori from 'satori';
import { Resvg } from '@resvg/resvg-js';

const WIDTH = 1200;
const HEIGHT = 630;

const TERRACOTTA = '#b8543a';
const INK = '#1c1917';
const MUTED = '#78716c';
const BG = '#fdfaf6';

const fontDir = resolve(process.cwd(), 'node_modules/@fontsource/source-serif-4/files');

let cachedFonts: { regular: Buffer; bold: Buffer } | null = null;

async function loadFonts() {
  if (cachedFonts) return cachedFonts;
  const [regular, bold] = await Promise.all([
    readFile(resolve(fontDir, 'source-serif-4-latin-400-normal.woff')),
    readFile(resolve(fontDir, 'source-serif-4-latin-700-normal.woff')),
  ]);
  cachedFonts = { regular, bold };
  return cachedFonts;
}

export interface OgImageOptions {
  title: string;
  category?: string;
  byline?: string;
}

function el(type: string, props: Record<string, unknown>) {
  return { type, props } as never;
}

function buildTree({ title, category, byline = 'Shivam Jari' }: OgImageOptions) {
  return el('div', {
    style: {
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      backgroundColor: BG,
      padding: '80px',
      fontFamily: 'Source Serif 4',
      position: 'relative',
    },
    children: [
      el('div', {
        style: {
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '8px',
          backgroundColor: TERRACOTTA,
        },
      }),
      el('div', {
        style: { display: 'flex', flexDirection: 'column', gap: '32px', flex: 1, justifyContent: 'center' },
        children: [
          category
            ? el('div', {
                style: {
                  display: 'flex',
                  fontSize: '22px',
                  color: TERRACOTTA,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  fontWeight: 600,
                },
                children: category,
              })
            : null,
          el('div', {
            style: {
              display: 'flex',
              fontSize: title.length > 60 ? '64px' : '76px',
              lineHeight: 1.15,
              color: INK,
              fontWeight: 700,
              letterSpacing: '-0.01em',
              maxWidth: '1000px',
            },
            children: title,
          }),
        ].filter(Boolean),
      }),
      el('div', {
        style: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '24px', color: MUTED },
        children: [
          el('div', { style: { display: 'flex', color: INK, fontWeight: 600 }, children: byline }),
          el('div', { style: { display: 'flex' }, children: 'shivam.blog' }),
        ],
      }),
    ],
  });
}

export async function renderOgImage(options: OgImageOptions): Promise<Uint8Array> {
  const fonts = await loadFonts();
  const svg = await satori(buildTree(options), {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: 'Source Serif 4', data: fonts.regular, weight: 400, style: 'normal' },
      { name: 'Source Serif 4', data: fonts.bold, weight: 700, style: 'normal' },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: 'width', value: WIDTH } }).render().asPng();
  return new Uint8Array(png);
}
