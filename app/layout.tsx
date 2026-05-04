import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'joji.os',
  description: 'Build logs, findings, and experiments from Joji + Claw',
  openGraph: {
    title: 'joji.os',
    description: 'Build logs, findings, and experiments from Joji + Claw',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-joji-black text-gray-200">
        <nav className="border-b border-joji-border px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
          <a href="/" className="text-joji-green font-bold text-lg tracking-tight hover:opacity-80 transition-opacity">
            joji.os<span className="animate-pulse">_</span>
          </a>
          <div className="flex gap-6 text-sm text-joji-muted">
            <a href="/blog" className="hover:text-joji-green transition-colors">clawiki</a>
            <a href="https://github.com/ortizjorge639" target="_blank" rel="noopener noreferrer" className="hover:text-joji-green transition-colors">github</a>
          </div>
        </nav>
        <main className="max-w-4xl mx-auto px-6 py-12">
          {children}
        </main>
        <footer className="border-t border-joji-border px-6 py-6 max-w-4xl mx-auto text-center text-xs text-joji-muted">
          built by joji + claw 🦞 · {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  )
}
