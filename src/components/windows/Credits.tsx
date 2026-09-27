
import Window from './Window'
import {
  WindupChildren,
  Pace,
} from 'windups'
import { useWindows } from '@contexts/WindowsContext'

const Credits = () => {
  const { creditsWindow } = useWindows()

  return (

    <Window window={creditsWindow}>
      <div className="window-text">
        <WindupChildren>
          <Pace ms={1}>
            <p>
              <strong>Original Design &amp; Code:</strong> This site is
              adapted from{' '}
              <a href="https://kisimoff.com" target="_blank">
                {' '}
                kisimoff.com
              </a>
              , the open-source portfolio built by{' '}
              <a
                href="https://github.com/kisimoff/portfolio"
                target="_blank"
              >
                {' '}
                Valentin Kisimov
              </a>
              . Huge thanks to Valentin for open-sourcing such a polished
              piece of work. Browse the original source on{' '}
              <a
                href="https://github.com/kisimoff/portfolio"
                target="_blank"
              >
                {' '}
                GitHub
              </a>
              .
              <br />
              <br />
              <strong>Original Logo and Animation Design:</strong> Special
              thanks goes to
              <a
                href="https://www.linkedin.com/in/hivaluedesign/"
                target="_blank"
              >
                {' '}
                Valentin Ivanov{' '}
              </a>
              the creative force behind the CPU Portal intro animation and
              the OS logo for the original KisimoffOS. Those assets have
              since been retired and replaced with new ones for this site, but
              the craft that shaped the original is well worth a look. Watch
              the full RSA Award winning{' '}
              <a
                href="https://www.youtube.com/watch?v=6k12O1iADwc"
                target="_blank"
              >
                {' '}
                animation
              </a>{' '}
              and explore more of their remarkable work on{' '}
              <a href="https://www.hivaldesign.com/" target="_blank">
                {' '}
                HiValDesign
              </a>
              .
              <br />
              <br />
              <strong>Inspiration: </strong>
              The concept of KisimoffOS (now Shaka's Portfolio) was inspired by
              <a href="https://poolsuite.net/" target="_blank">
                {' '}
                Poolside FM
              </a>
              , revealing the boundless potential of web apps.
              <br />
              Replicating WindowsXP posed an exciting challange and a deep
              dive in the early 2000s nostalgia - an era which motivated
              Valentin to become a developer.
              <br />
              <br />
              <strong>Feautred Libraries:</strong>
              <br />
              <br />
              <ul>
                <li>
                  <a
                    href="https://xtermjs.org/"
                    target="_blank"
                  >
                    {' '}
                    Xterm.js
                  </a>
                </li>
                <li>
                  <a
                    href="https://zenfs.dev/core/"
                    target="_blank"
                  >
                    {' '}
                    ZenFS
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.npmjs.com/package/react-device-detect"
                    target="_blank"
                  >
                    {' '}
                    react-device-detect
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.npmjs.com/package/react-draggable"
                    target="_blank"
                  >
                    {' '}
                    react-draggable
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.npmjs.com/package/react-ip-details"
                    target="_blank"
                  >
                    {' '}
                    react-ip-details
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.npmjs.com/package/framer-motion"
                    target="_blank"
                  >
                    {' '}
                    framer-motion
                  </a>
                </li>
              </ul>
              <br />
              These invaluable tools played a significant role in the
              successful development and execution of the original
              KisimoffOS, and continue to power this site today.
            </p>
          </Pace>
        </WindupChildren>
      </div>
    </Window>
  )
}

export default Credits
