import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      colors: {
        'joji-black': '#0a0a0a',
        'joji-green': '#00ff88',
        'joji-dim': '#1a1a1a',
        'joji-muted': '#555',
        'joji-border': '#222',
      },
    },
  },
  plugins: [],
}
export default config
