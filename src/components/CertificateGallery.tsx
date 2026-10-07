import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { EffectCoverflow, Keyboard } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/effect-coverflow'
import { certificates } from '../data/content'

const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
const pad = (n: number) => String(n).padStart(2, '0')
const arrow = 'h-10 w-10 rounded-full border border-line bg-white text-lg hover:border-accent disabled:opacity-30 transition-colors'

export default function CertificateGallery() {
  const sw = useRef<SwiperType | null>(null)
  const [i, setI] = useState(0)
  const [box, setBox] = useState<number | null>(null)
  const [zoom, setZoom] = useState(false)
  const n = certificates.length
  const c = certificates[i]

  const move = (d: number) => { setZoom(false); setBox(b => (b === null ? b : (b + d + n) % n)) }
  useEffect(() => {
    if (box === null) return
    const key = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setBox(null)
      if (e.key === 'ArrowRight') move(1)
      if (e.key === 'ArrowLeft') move(-1)
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', key)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', key) }
  }, [box])
  useEffect(() => { if (box !== null) sw.current?.slideTo(box) }, [box])

  return (
    <div>
      <Swiper modules={[EffectCoverflow, Keyboard]} onSwiper={s => (sw.current = s)} onSlideChange={s => setI(s.activeIndex)}
        effect="coverflow" coverflowEffect={{ rotate: 10, stretch: 0, depth: 110, modifier: 1, scale: 0.86, slideShadows: false }}
        centeredSlides slidesPerView="auto" spaceBetween={16} grabCursor keyboard={{ enabled: true }} speed={reduce ? 0 : 450} className="!py-4">
        {certificates.map((x, k) => (
          <SwiperSlide key={x.id} style={{ width: 'auto' }}>
            <button onClick={() => { setBox(k); setZoom(false) }} aria-label={`Open ${x.title} full screen`} className="block">
              <img src={`/certificates/${x.id}-thumb.jpg`} alt={`${x.title}, ${x.org}`} loading={k < 3 ? 'eager' : 'lazy'} draggable={false} onLoad={() => sw.current?.update()}
                className="h-[260px] sm:h-[360px] md:h-[400px] w-auto max-w-[82vw] object-contain bg-white border border-line rounded-sm shadow-sm" />
            </button>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="mt-4 flex items-center justify-between gap-4">
        <button className={arrow} onClick={() => sw.current?.slidePrev()} disabled={i === 0} aria-label="Previous certificate">‹</button>
        <div className="text-center min-w-0" aria-live="polite">
          <p className="font-semibold">{c.title}</p>
          <p className="text-sm text-muted">{c.org} · {c.date}</p>
          {c.verify && <a href={c.verify} target="_blank" rel="noreferrer" className="text-sm text-accent underline underline-offset-4">Verify certificate</a>}
          {c.credentialId && <p className="text-sm text-muted">Credential ID: {c.credentialId}</p>}
          <p className="mt-1 text-xs text-muted tabular-nums">{pad(i + 1)} / {pad(n)}</p>
        </div>
        <button className={arrow} onClick={() => sw.current?.slideNext()} disabled={i === n - 1} aria-label="Next certificate">›</button>
      </div>

      {box !== null && (
        <div role="dialog" aria-modal="true" aria-label="Certificate preview" className="fixed inset-0 z-50 bg-black/90 flex flex-col">
          <div className="flex items-center justify-between px-4 py-3 text-white text-sm">
            <span className="tabular-nums">{pad(box + 1)} / {pad(n)}</span>
            <span className="hidden sm:block truncate px-4">{certificates[box].title}</span>
            <button autoFocus onClick={() => setBox(null)} className="rounded border border-white/40 px-3 py-1 hover:bg-white/10">Close</button>
          </div>
          <div className="relative flex-1 overflow-auto flex items-center justify-center p-2" onClick={e => { if (e.target === e.currentTarget) setBox(null) }}>
            <img src={`/certificates/${certificates[box].id}.jpg`} alt={`${certificates[box].title}, ${certificates[box].org}`}
              onClick={() => setZoom(!zoom)} className={`bg-white ${zoom ? 'max-w-none w-[180%] md:w-[140%] cursor-zoom-out m-auto' : 'max-h-full max-w-full object-contain cursor-zoom-in'}`} />
          </div>
          <div className="flex justify-center gap-3 py-3 text-white">
            <button className="rounded border border-white/40 px-4 py-1.5 hover:bg-white/10" onClick={() => move(-1)} aria-label="Previous certificate">Previous</button>
            <button className="rounded border border-white/40 px-4 py-1.5 hover:bg-white/10" onClick={() => setZoom(!zoom)}>{zoom ? 'Fit to screen' : 'Zoom'}</button>
            <button className="rounded border border-white/40 px-4 py-1.5 hover:bg-white/10" onClick={() => move(1)} aria-label="Next certificate">Next</button>
          </div>
        </div>
      )}
    </div>
  )
}
