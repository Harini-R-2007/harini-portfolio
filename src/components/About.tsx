import { Section, useInView } from './Reveal'
import { profile, education } from '../data/content'

const facts: [string, string][] = [
  ['role', "'B.E. Computer Science student'"], ['college', "'IFET College of Engineering'"], ['cgpa', "'8.8 (up to 4th semester)'"],
  ['focus', "['Full-stack development', 'Data management', 'Data analytics']"], ['languages', "['Tamil', 'English']"],
  ['memberOf', "'ISTE'"], ['lookingFor', "'Internship and placement'"],
]

export default function About() {
  const [ref, seen] = useInView<HTMLDivElement>()
  return (
    <Section id="about" title="About">
      {profile.about.map(p => <p key={p} className="text-muted leading-relaxed mb-4 max-w-2xl">{p}</p>)}

      <div ref={ref} className={`mt-8 rounded-lg bg-[#101b3f] text-white font-mono text-[13px] sm:text-sm overflow-hidden ${seen ? 'seen' : ''}`}>
        <div className="px-4 py-2 border-b border-white/15 text-white/60 text-xs">harini.ts</div>
        <pre className="p-4 sm:p-5 leading-7 overflow-x-auto whitespace-pre-wrap break-words">
          <div className="codeline" style={{ '--i': 0 } as React.CSSProperties}><span className="text-[#9db4ff]">const</span> harini = {'{'}</div>
          {facts.map(([k, v], i) => (
            <div key={k} className="codeline pl-4" style={{ '--i': i + 1 } as React.CSSProperties}>
              <span className="text-white/60">{k}:</span> <span className="text-[#f3d9a4]">{v}</span>,
            </div>
          ))}
          <div className="codeline" style={{ '--i': facts.length + 1 } as React.CSSProperties}>{'}'}</div>
        </pre>
      </div>

      <h3 className="font-semibold mt-10 mb-3">Education</h3>
      <ul className="divide-y divide-line border-y border-line">
        {education.map(([deg, inst, yr, score]) => (
          <li key={deg} className="py-3 flex flex-wrap justify-between gap-x-6">
            <span><span className="font-semibold">{deg}</span><br /><span className="text-sm text-muted">{inst}</span></span>
            <span className="text-sm text-muted sm:text-right">{yr}<br />{score}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
