import { motion } from 'framer-motion'
import { SlSocialLinkedin } from 'react-icons/sl'
import { VscGithubAlt } from 'react-icons/vsc'
import { FaInstagram, FaWhatsapp } from 'react-icons/fa'
import type { IconType } from 'react-icons'
import IconTask from './IconTask'
import { useTheme } from '@contexts/ThemeContext'
import { useAnimations } from '@contexts/AnimationsContext'
import { useWindows } from '@contexts/WindowsContext'
import { profile } from '@/data/profile'
import { durMicro, easeOut } from '@/styles/motion'

const socials: { label: string; href?: string; Icon: IconType }[] = [
  { label: 'LinkedIn', href: profile.linkedinUrl, Icon: SlSocialLinkedin },
  { label: 'GitHub', href: profile.githubUrl, Icon: VscGithubAlt },
  { label: 'Instagram', href: profile.instagramUrl, Icon: FaInstagram },
  { label: 'WhatsApp', href: profile.whatsappUrl, Icon: FaWhatsapp },
]

function Navbar() {
  const { themeValues } = useTheme()
  const { desktopRevealed, revealTransition } = useAnimations()
  const { windows } = useWindows()

  return (
    <motion.div
      className="navbar"
      animate={desktopRevealed ? { opacity: 1, transition: revealTransition } : undefined}
      style={themeValues.navbar}
      initial={{ opacity: 0 }}
    >
      <div className="nav-heading">Shaka's Portfolio</div>
      <div className="nav-icon-task">
        {Object.entries(windows).map(([key, win]) => win.visibility && <IconTask key={key} window={win} />)}
      </div>
      <div className="nav-socials">
        {socials.map(({ label, href, Icon }) =>
          href ? (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              transition={{ duration: durMicro / 1000, ease: easeOut }}
            >
              <Icon className="nav-social-svg" aria-hidden="true" />
            </motion.a>
          ) : null,
        )}
      </div>
    </motion.div>
  )
}

export default Navbar
