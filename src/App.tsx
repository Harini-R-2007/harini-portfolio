import { useEffect, useRef, useState, type ReactNode } from 'react'
import About from './components/About'
import Skills from './components/Skills'
import { Section } from './components/Reveal'
import Contact from './components/Contact'
import CertificateGallery from './components/CertificateGallery'
import { profile, skills, projects, experience, achievements, otherCertifications, education } from './data/content'

const links = ['About', 'Skills', 'Projects', 'Experience', 'Achievements', 'Certifications', 'Contact']

const btn = 'inline-block rounded-md px-5 py-2.5 text-sm font-semibold transition-colors'

export default function App() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <header className="sticky top-0 z-20 bg-paper/95 backdrop-blur border-b border-line">
        <nav className="mx-auto max-w-5xl px-5 h-14 flex items-center justify-between" aria-label="Main">
          <a href="#home" className="font-extrabold text-accent">Harini R</a>
          <ul className="hidden lg:flex gap-6 text-sm text-muted">
            {links.map(l => <li key={l}><a className="hover:text-ink" href={`#${l.toLowerCase()}`}>{l}</a></li>)}
          </ul>
          <a href={profile.resume} download className={`${btn} hidden lg:inline-block bg-accent text-white hover:bg-blue-950 !py-1.5`}>Download Resume</a>
          <button className="lg:hidden p-2" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            <span className="block w-5 h-0.5 bg-ink mb-1" /><span className="block w-5 h-0.5 bg-ink mb-1" /><span className="block w-5 h-0.5 bg-ink" />
          </button>
        </nav>
        {open && (
          <ul className="lg:hidden px-5 pb-4 flex flex-col gap-3 text-sm border-t border-line pt-3">
            {links.map(l => <li key={l}><a onClick={() => setOpen(false)} href={`#${l.toLowerCase()}`}>{l}</a></li>)}
            <li><a href={profile.resume} download className="font-semibold text-accent">Download Resume</a></li>
          </ul>
        )}
      </header>

      <main>
        <section id="home" className="mx-auto max-w-5xl px-5 py-14 md:py-24 grid md:grid-cols-[1fr_300px] gap-10 items-center">
          <div>
            <p className="text-muted mb-3">Hi, I'm</p>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">{profile.name}</h1>
            <p className="mt-3 text-xl text-accent font-semibold">{profile.headline}</p>
            <p className="mt-5 max-w-xl text-muted leading-relaxed">{profile.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className={`${btn} bg-accent text-white hover:bg-blue-950`}>View My Projects</a>
              <a href={profile.resume} download className={`${btn} border border-line hover:border-accent`}>Download Resume</a>
            </div>
          </div>
          <img src={profile.photo} alt="Portrait of Harini R" width={300} height={382} className="w-56 md:w-full rounded-lg border border-line object-cover aspect-[4/5] order-first md:order-last" />
        </section>

        <About />

        <Skills />

        <Section id="projects" title="Projects">
          <div className="space-y-5">
            {projects.map(p => (
              <article key={p.name} className={`rounded-lg border bg-white p-5 shadow-sm hover:shadow-md transition-shadow ${p.featured ? 'border-accent' : 'border-line'}`}>
                {p.event && <p className="text-xs font-semibold text-accent mb-1">{p.event}</p>}
                <h3 className="font-bold text-lg">{p.name}</h3>
                <p className="mt-2 text-muted leading-relaxed text-[15px]">{p.desc}</p>
                <ul className="mt-3 flex flex-wrap gap-2 text-xs text-muted">{p.tech.map(t => <li key={t} className="bg-paper border border-line rounded px-2 py-0.5">{t}</li>)}</ul>
                <p className="mt-3 text-sm"><span className="font-semibold">My role: </span><span className="text-muted">{p.role}</span></p>
                {p.team && <p className="mt-1 text-sm"><span className="font-semibold">Team: </span><span className="text-muted">{p.team}</span></p>}
                {(p.live || p.github || p.demo) && (
                  <div className="mt-4 flex flex-wrap gap-3">
                    {p.live && <a href={p.live} target="_blank" rel="noreferrer" className={`${btn} bg-accent text-white hover:bg-blue-950 !py-1.5`}>View Live Demo</a>}
                    {p.demo && <a href={p.demo} target="_blank" rel="noreferrer" className={`${btn} bg-accent text-white hover:bg-blue-950 !py-1.5`}>Watch Demo Video</a>}
                    {p.github && <a href={p.github} target="_blank" rel="noreferrer" className={`${btn} border border-line hover:border-accent !py-1.5`}>View GitHub</a>}
                  </div>
                )}
              </article>
            ))}
          </div>
        </Section>

        <Section id="experience" title="Experience">
          <ol className="border-l border-line pl-6 space-y-8">
            {experience.map(e => (
              <li key={e.org} className="relative">
                <span className="absolute -left-[29px] top-1.5 w-2.5 h-2.5 rounded-full bg-accent" />
                <p className="font-semibold">{e.role}</p>
                <p className="text-muted text-sm">{e.org}{e.duration ? `, ${e.duration}` : ''}</p>
                <p className="mt-2 text-muted text-[15px] leading-relaxed max-w-xl">{e.desc}</p>
                {e.tech && <ul className="mt-2 flex flex-wrap gap-2 text-xs text-muted">{e.tech.map(t => <li key={t} className="bg-white border border-line rounded px-2 py-0.5">{t}</li>)}</ul>}
                {e.github && <a href={e.github} target="_blank" rel="noreferrer" className="inline-block mt-3 text-sm font-semibold text-accent underline underline-offset-4">View GitHub</a>}
              </li>
            ))}
          </ol>
        </Section>

        <Section id="achievements" title="Hackathons & achievements">
          <ul className="space-y-3 text-muted leading-relaxed">
            {achievements.map(a => <li key={a} className="border-l-2 border-accent pl-4">{a}</li>)}
          </ul>
        </Section>

        <Section id="certifications" title="Certifications">
          <CertificateGallery />
          {otherCertifications.length > 0 && <p className="mt-6 text-sm text-muted">Also completed (certificate images not added yet): {otherCertifications.join(', ')}.</p>}
        </Section>

        <Contact />
      </main>
      <footer className="border-t border-line py-6 text-center text-sm text-muted">© {new Date().getFullYear()} Harini R</footer>
    </>
  )
}
