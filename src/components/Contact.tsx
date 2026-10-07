import { useState } from 'react'
import { profile } from '../data/content'

const field = 'w-full rounded-md bg-white/5 border border-white/25 px-3.5 py-2.5 text-sm text-white placeholder:text-white/45 focus:border-white focus:outline-none'

export default function Contact() {
  const [name, setName] = useState('')
  const [from, setFrom] = useState('')
  const [msg, setMsg] = useState('')
  const [copied, setCopied] = useState(false)
  const [warn, setWarn] = useState(false)

  const subject = `Opportunity for Harini R${name ? ` (from ${name})` : ''}`
  const body = `${msg}\n\n${name}${from ? `\n${from}` : ''}`
  const gmail = `https://mail.google.com/mail/?view=cm&fs=1&to=${profile.email}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const mailto = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  const ready = name.trim() && msg.trim()
  const guard = (e: React.MouseEvent) => { if (!ready) { e.preventDefault(); setWarn(true) } else setWarn(false) }

  const copy = async () => {
    try { await navigator.clipboard.writeText(profile.email) } catch {
      const t = document.createElement('textarea'); t.value = profile.email; document.body.appendChild(t); t.select(); document.execCommand('copy'); t.remove()
    }
    setCopied(true); setTimeout(() => setCopied(false), 2000)
  }
  const row = 'flex items-baseline justify-between gap-4 border-b border-white/15 py-4'
  const lab = 'text-xs uppercase tracking-widest text-white/55 w-24 shrink-0'

  return (
    <section id="contact" className="bg-[#101b3f] text-white">
      <div className="mx-auto max-w-5xl px-5 py-20 grid lg:grid-cols-2 gap-12 lg:gap-16">
        <div>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">Get in touch</h2>
          <p className="mt-4 text-white/75 leading-relaxed max-w-md">I am looking for an internship and placement opportunity. A short message with the role and company is the best way to start.</p>
          <ul className="mt-8 text-sm">
            <li className={row}><span className={lab}>Email</span>
              <span className="flex-1 break-all">{profile.email}</span>
              <button onClick={copy} className="shrink-0 rounded border border-white/35 px-2.5 py-1 text-xs hover:bg-white/10" aria-live="polite">{copied ? 'Copied' : 'Copy'}</button></li>
            <li className={row}><span className={lab}>LinkedIn</span><a className="flex-1 underline underline-offset-4 hover:text-white/80" target="_blank" rel="noreferrer" href={profile.linkedin}>linkedin.com/in/harini86</a></li>
            <li className={row}><span className={lab}>GitHub</span><a className="flex-1 underline underline-offset-4 hover:text-white/80" target="_blank" rel="noreferrer" href={profile.github}>github.com/Harini-R-2007</a></li>
            <li className={row}><span className={lab}>Location</span><span className="flex-1">{profile.location}</span></li>
          </ul>
        </div>

        <div className="rounded-lg border border-white/20 bg-white/[0.04] p-6">
          <h3 className="font-bold">Write a message</h3>
          <div className="mt-4 space-y-3">
            <label className="block text-sm"><span className="sr-only">Your name</span><input className={field} placeholder="Your name" value={name} onChange={e => setName(e.target.value)} autoComplete="name" /></label>
            <label className="block text-sm"><span className="sr-only">Your email (optional)</span><input className={field} type="email" placeholder="Your email (optional)" value={from} onChange={e => setFrom(e.target.value)} autoComplete="email" /></label>
            <label className="block text-sm"><span className="sr-only">Message</span><textarea className={`${field} min-h-32`} placeholder="Your message" value={msg} onChange={e => setMsg(e.target.value)} /></label>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a href={gmail} target="_blank" rel="noreferrer" onClick={guard} className="rounded-md bg-white text-[#101b3f] px-5 py-2.5 text-sm font-semibold hover:bg-white/90">Open in Gmail</a>
            <a href={mailto} onClick={guard} className="rounded-md border border-white/40 px-5 py-2.5 text-sm font-semibold hover:bg-white/10">Use my mail app</a>
          </div>
          {warn && <p role="alert" className="mt-3 text-sm text-amber-200">Please add your name and a message first.</p>}
          <p className="mt-4 text-xs text-white/55">This opens your email with the message filled in, and you press send there. Nothing is stored on this website.</p>
        </div>
      </div>
    </section>
  )
}
