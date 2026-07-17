import React, { useState } from 'react'

// Components
import Window from '@components/windows/Window'
import ProjectShowcase from '@components/ProjectShowcase'

import { useWindows } from '@contexts/WindowsContext'
import { projects } from '@/data/projects'

export default function Projs() {
  const { projectsWindow } = useWindows()
  const [currentLoadingIndex, setCurrentLoadingIndex] = useState(0)

  const handleLoad = () => {
    setCurrentLoadingIndex((prevIndex) => prevIndex + 1)
  }

  return (
    <Window window={projectsWindow}>
      <div className="projectsScroll">
        <div className="projectsExplain">
          Tap or hover on a project to learn more. Each
          repository has a README with more detailed information about the
          project.
        </div>
        <div className="projectsField">
          {projects.map((project, index) => (
            <ProjectShowcase
              key={project.id}
              {...project}
              onLoad={handleLoad}
              // Only reveal the poster/video once this card is the current
              // loading index, so cards don't all fetch their preview at once.
              poster={index <= currentLoadingIndex ? project.poster : null}
              video={index <= currentLoadingIndex ? project.video : null}
            />
          ))}
        </div>
      </div>
    </Window>
  )
}
