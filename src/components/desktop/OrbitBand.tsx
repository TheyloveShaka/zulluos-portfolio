import { useWindows } from '@contexts/WindowsContext'
import SkillsOrbit from '@components/desktop/SkillsOrbit'

function OrbitBand() {
  const { openOrFocusWindow } = useWindows()

  return (
    <section id="orbit-band" aria-label="Tools I work with" className="orbit-band">
      <div className="orbit-slot" data-orbit-mount>
        <SkillsOrbit />
      </div>
      <button
        type="button"
        className="btn-secondary orbit-band__case-studies-shortcut"
        onClick={() => openOrFocusWindow('caseStudies')}
      >
        Case Studies
      </button>
    </section>
  )
}

export default OrbitBand
