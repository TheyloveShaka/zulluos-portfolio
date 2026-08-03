import { motion } from 'framer-motion'
import { SlSocialLinkedin } from 'react-icons/sl'
import { VscGithubAlt } from 'react-icons/vsc'
import { IoLogoGitlab } from 'react-icons/io5'
import IconTask from './IconTask'
import {
  isTablet,
} from 'react-device-detect'
import { useTheme } from '@contexts/ThemeContext'
import { useAnimations } from '@contexts/AnimationsContext'
import { useWindows } from '@contexts/WindowsContext'

function Navbar() {
  const { themeValues } = useTheme()
  const { navbarAnimation } = useAnimations()
  const { windows } = useWindows()

  return (
    <motion.div
      className="navbar"
      animate={navbarAnimation}
      style={themeValues.navbar}
      initial={{ opacity: 0 }}

    >
      <div className="nav-heading">
        <span style={isTablet ? { width: '350px' } : undefined}>
          Shaka's Portfolio
        </span>
      </div>
      <div
        className="nav-icon-task"
        style={isTablet ? { display: 'none' } : undefined}
      >
        {Object.entries(windows).map(([key, window]) => (
          window.visibility && (<IconTask key={key} window={window} />)
        ))}
      </div>
      <div className="nav-socials">
        <motion.a
          href="#"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => {
            // TODO: add real handle
            window.open('#')
          }}
        >
          <SlSocialLinkedin className="nav-social-svg" />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="#"
          onClick={() => {
            window.open('https://github.com/TheyloveShaka')
          }}
        >
          <VscGithubAlt className="nav-social-svg" />
        </motion.a>
        <motion.a
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          href="#"
          onClick={() => {
            // TODO: add real handle
            window.open('#')
          }}
        >
          <IoLogoGitlab className="nav-social-svg" />
        </motion.a>
      </div>
    </motion.div>
  )
}

export default Navbar