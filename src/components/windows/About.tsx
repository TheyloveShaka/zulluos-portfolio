import about_png from '../../img/shaka-avatar.svg'
import Window from './Window'
import {
  WindupChildren,
  Pause,
  Pace,
} from 'windups'
import { useWindows } from '@contexts/WindowsContext'

const About = () => {
  const { aboutWindow } = useWindows()

  return (
    <Window window={aboutWindow}>
      {/* <div className="about" id="about"> */}

      <div id="aboutField" className="aboutText">
        <WindupChildren>
          <Pace ms={38}>
            <div className="about-first">
              <img alt="me" className='w-20 h-20 ' src={about_png} />
              <p className='pl-2'>
                Hi! <Pause ms={500} />
                I'm Shaka! <Pause ms={500} />
                Let me tell you a bit about me. <Pause ms={600} />
                It all began when I was a kid <Pause ms={500} />
                and I touched a computer to try to make it do something I
                wanted. <Pause ms={1000} /> And it worked.{' '}
                <Pause ms={400} /> My life has never been the same since.
                <Pause ms={450} /> From that moment on, I was hooked.
                <Pause ms={700} />
                <br />
                <br />
              </p>
            </div>
            <p>
              Every interaction with tech since has really just been me
              chasing that same magic <Pause ms={500} /> - poking around
              in settings I didn't understand, <Pause ms={150} />
              breaking things on purpose to see how they worked,
              <Pause ms={150} />
              and slowly figuring out how to bend a machine to my will.
              <Pause ms={1000} />
              <br></br> <br></br>
              That chase eventually turned into a career.
              <Pause ms={200} /> I'm a Developer &amp; AI Engineer based in
              Kampala, Uganda, <Pause ms={150} />
              and I still get the same rush today that I did back then.
              <Pause ms={600} />
              <br></br> <br></br>
              On the frontend, I build with React and TypeScript,{' '}
              <Pause ms={150} />
              on the AI side I'm deep into LLM-powered apps and agents,
              <Pause ms={150} />
              and underneath it all I lean on Python and data to make
              sense of things. <Pause ms={150} />
              <br></br> <br></br>
              Lately that's meant building real products end-to-end
              <Pause ms={100} /> - like{' '}
              <a href="https://the-venue-menu.vercel.app" target="_blank" rel="noreferrer">The Venue Menu</a>,
              {' '}Uganda's wedding &amp; venue discovery platform.
              <Pause ms={400} />
              <br></br> <br></br>
              Outside of code, I'm a comic-book fan, <Pause ms={200} />
              an astrophysics nerd who can't stop reading about black holes,
              <Pause ms={200} />
              a music lover, <Pause ms={200} />
              I'm always behind on some movie or anime, <Pause ms={200} />
              and you'll usually find me either gaming <Pause ms={150} />
              or watching sports when I'm not building something.
              <br></br>
            </p>
          </Pace>
        </WindupChildren>
      </div>
      {/* </div> */}
    </Window>
  )
}

export default About
