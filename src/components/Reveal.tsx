import { useEffect, useRef, useState, type ReactNode } from 'react'
export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const el = ref.current!
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setSeen(true); io.disconnect() } }, { threshold: 0.15 })
    io.observe(el); return () => io.disconnect()
  }, [])
  return [ref, seen] as const
}
export function Reveal({ children }: { children: ReactNode }) {
  const [ref, seen] = useInView<HTMLDivElement>()
  return <div ref={ref} className={`reveal ${seen ? 'in' : ''}`}>{children}</div>
}
export function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="mx-auto max-w-5xl px-5 py-16 border-t border-line">
      <Reveal>
        <div className="grid md:grid-cols-[200px_minmax(0,1fr)] gap-6 md:gap-12">
          <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
          <div className="min-w-0">{children}</div>
        </div>
      </Reveal>
    </section>
  )
}
