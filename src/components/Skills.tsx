import { useState, type KeyboardEvent } from 'react'
import { Section } from './Reveal'
import { skills, projects, experience } from '../data/content'

const usedIn = (item: string) => {
  const m = (t: string) => t.toLowerCase() === item.toLowerCase()
  return [...projects.filter(p => p.tech.some(m)).map(p => p.name), ...experience.filter(e => e.tech?.some(m)).map(e => `${e.org} internship`)]
}

export default function Skills() {
  const [a, setA] = useState(0)
  const g = skills[a]
  const key = (e: KeyboardEvent) => {
    const d = ['ArrowDown', 'ArrowRight'].includes(e.key) ? 1 : ['ArrowUp', 'ArrowLeft'].includes(e.key) ? -1 : 0
    if (d) { e.preventDefault(); const n = (a + d + skills.length) % skills.length; setA(n); document.getElementById(`tab-${n}`)?.focus() }
  }
  const used = g.items.map(i => [i, usedIn(i)] as const).filter(([, u]) => u.length)
  return (
    <Section id="skills" title="Skills">
      <div className="md:flex gap-10">
        <div role="tablist" aria-label="Skill categories" onKeyDown={key} className="flex flex-wrap md:flex-col gap-2 md:gap-0 md:w-52 shrink-0 mb-6 md:mb-0">
          {skills.map((s, i) => (
            <button key={s.group} id={`tab-${i}`} role="tab" aria-selected={a === i} aria-controls="skill-panel" tabIndex={a === i ? 0 : -1} onClick={() => setA(i)}
              className={`text-left px-3 py-2 text-sm rounded-md md:rounded-none border md:border-0 md:border-l-2 transition-colors ${a === i ? 'border-accent bg-accent text-white md:bg-transparent md:text-accent md:font-semibold' : 'border-line text-muted hover:text-ink'}`}>
              {s.group}
            </button>
          ))}
        </div>
        <div id="skill-panel" role="tabpanel" aria-labelledby={`tab-${a}`} key={g.group} className="flex-1 min-w-0">
          <ul className="flex flex-wrap gap-2">
            {g.items.map((it, i) => <li key={it} className="chip text-sm border border-line bg-white rounded px-3 py-1.5" style={{ animationDelay: `${i * 50}ms` }}>{it}</li>)}
          </ul>
          {used.length > 0 && (
            <div className="chip mt-6 border-t border-line pt-4" style={{ animationDelay: `${g.items.length * 50 + 100}ms` }}>
              <p className="text-xs uppercase tracking-widest text-muted mb-2">Where I have used these</p>
              <ul className="space-y-1.5 text-sm">
                {used.map(([i, u]) => <li key={i}><span className="font-semibold">{i}</span><span className="text-muted"> in {u.join(', ')}</span></li>)}
              </ul>
            </div>
          )}
        </div>
      </div>
    </Section>
  )
}
