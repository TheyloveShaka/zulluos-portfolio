import React, { useState, useRef, useEffect } from 'react'
import { AiFillGithub } from 'react-icons/ai'
import { BiWorld } from 'react-icons/bi'

// A project card can preview itself with either a static poster image or a
// looping video. Video takes priority when both are supplied — none of the
// current cards ship a video yet, but the prop stays wired up so a future
// preview clip can just be dropped into the data file.
interface ProjShowcaseProps {
  poster?: string | null
  video?: string | null
  title: string
  description: string
  technologies?: string
  repo?: string
  live?: string
  onLoad?: () => void
}

function Proj({ onLoad, poster, video, ...props }: ProjShowcaseProps) {
  const [isVisible, setIsVisible] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const node = containerRef.current
    if (!node) return

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setIsVisible(true)
        observer.unobserve(node)
      }
    })

    observer.observe(node)

    return () => {
      observer.disconnect()
    }
  }, [])

  // Videos signal readiness via onCanPlayThrough; images via onLoad. Either
  // way we bubble it up so Projects.tsx can stagger loading of the next card.
  const handleReady = () => {
    onLoad?.()
  }

  const hasFooter = Boolean(props.technologies || props.repo || props.live)

  return (
    <div className="project-container" ref={containerRef}>
      {isVisible && video && (
        <video
          className="project-animation"
          playsInline
          loop
          muted
          autoPlay
          src={video}
          onCanPlayThrough={handleReady}
        />
      )}
      {isVisible && !video && poster && (
        <img
          className="project-animation"
          src={poster}
          alt={`${props.title} preview`}
          loading="lazy"
          onLoad={handleReady}
        />
      )}
      <div className="project-title-overlay">
        <span> {props.title}</span>
      </div>
      <div className="project-description-overlay">
        <div className="project-text-wrapper">
          <p>{props.description}</p>
          {hasFooter && (
            <div className="text-bottom-row">
              {props.technologies && (
                <p>
                  <b> Technologies used:</b> <br></br>
                  {props.technologies}
                </p>
              )}
              <div className="text-bottom-row-icons-wrapper">
                {props.repo && (
                  <a
                    className="text-bottom-row-singleicon-wrapper"
                    href={props.repo}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <AiFillGithub className="text-bottom-row-icon" />
                    <span>Repo</span>
                  </a>
                )}

                {props.live && (
                  <a
                    className="text-bottom-row-singleicon-wrapper"
                    href={props.live}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <BiWorld className="text-bottom-row-icon" />
                    <span>Web</span>
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Proj
