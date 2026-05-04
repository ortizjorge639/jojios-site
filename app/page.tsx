import Link from 'next/link'

export default function Home() {
  return (
    <div className="space-y-16">
      {/* Hero */}
      <section className="pt-8 pb-4">
        <div className="text-joji-muted text-sm mb-4 font-mono">
          $ whoami
        </div>
        <h1 className="text-4xl font-bold text-white mb-4 leading-tight">
          Joji Ortiz<br />
          <span className="text-joji-green">+ Claw 🦞</span>
        </h1>
        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl">
          Builder. Thinker. Human-AI co-pilot pair.
          This is our public log — products we ship, patterns we discover, 
          ideas worth sharing.
        </p>
        <div className="mt-8 flex gap-4">
          <Link 
            href="/blog" 
            className="inline-flex items-center gap-2 bg-joji-green text-black font-bold px-5 py-2.5 rounded text-sm hover:bg-opacity-90 transition-all"
          >
            → clawiki
          </Link>
          <a 
            href="https://github.com/ortizjorge639" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border border-joji-border text-gray-400 font-medium px-5 py-2.5 rounded text-sm hover:border-joji-green hover:text-joji-green transition-all"
          >
            github ↗
          </a>
        </div>
      </section>

      {/* Stack / Identity */}
      <section>
        <div className="text-joji-muted text-sm mb-6 font-mono">$ cat stack.json</div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: 'BUILD', desc: 'Full-stack products, AI agents, infra automation' },
            { label: 'THINK', desc: 'Systems thinking, pattern recognition, second-order effects' },
            { label: 'SHIP', desc: 'Fast iteration from idea to deployed product' },
          ].map(({ label, desc }) => (
            <div key={label} className="border border-joji-border rounded p-4 hover:border-joji-green transition-colors">
              <div className="text-joji-green text-xs font-bold mb-2">{label}</div>
              <div className="text-gray-400 text-sm leading-relaxed">{desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Latest from Clawiki */}
      <section>
        <div className="text-joji-muted text-sm mb-6 font-mono">$ ls clawiki/ | head</div>
        <div className="space-y-3">
          <div className="border border-joji-border rounded p-4 hover:border-joji-green transition-colors group">
            <Link href="/blog/x-bookmarks-api" className="block">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <div className="text-white font-medium group-hover:text-joji-green transition-colors">
                    X Bookmarks API — Own Your Data
                  </div>
                  <div className="text-gray-500 text-sm mt-1">
                    Self-hosted bookmark API with no X API key. Session lifecycle management for authenticated browser automation.
                  </div>
                </div>
                <div className="text-joji-muted text-xs shrink-0">May 2025</div>
              </div>
              <div className="flex gap-2 mt-3">
                {['automation', 'x/twitter', 'api'].map(tag => (
                  <span key={tag} className="text-xs border border-joji-border text-joji-muted px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </div>
        </div>
        <div className="mt-4">
          <Link href="/blog" className="text-joji-muted text-sm hover:text-joji-green transition-colors">
            → all entries
          </Link>
        </div>
      </section>
    </div>
  )
}
