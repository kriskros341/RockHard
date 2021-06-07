import style from './Navbar.module.scss'
import Link from 'next/link'
import {navlinks, MobileNavigationButtonSvg, MobileCancelButtonSvg, LinesSvg, CogIconSvg} from './NavLinks'
import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CircleButtonVariants, hbgrVariants, NavItemsVariants, ActiveMenuVariants } from './navbarVariants'
import useTapGesture from './useTapGesture'

export const CircleButton: React.FC<{label: string}> = ({label, children}) => {
  return (
    <motion.div 
      variants={CircleButtonVariants}
      initial="exit"
      animate="animate"
      exit="exit"
      whileTap={{scale: 0.9}}
      layout 
      className={`${style.CircleButton}`} 
      role='button' 
      aria-label={label}
    >
      {children}
    </motion.div>
  )
}

const ToggleCircleButton: React.FC<{toggleFn?: () => void}> = ({children, toggleFn}) => {
  const [ isActive, setActive ] = useState<boolean>(false)
  return (
    <div 
      className={`${style.ToggleCircleButton} ${isActive && style.active}`}
      onClick={() => {setActive(!isActive); toggleFn && toggleFn()}} 
    >
      <CircleButton label={"Options"}>
        {children}
      </CircleButton>
    </div>
  )
}

const NavbarLink: React.FC<{to: string}> = ({to, children}) => {
  return (
    <Link href={to}>
      <div className={style.link}>
        {children}
      </div>
    </Link>
  )
}

const MobileHamburger: React.FC<{isNavigationActive: boolean, toggleNavigation: () => void}> = ({isNavigationActive, toggleNavigation}) => {
  return (
    <div onClick={() => toggleNavigation()} className={style.MobileNavigationButtonContainer}>
      <CircleButton label="Mobile Navigation Button">
        <AnimatePresence exitBeforeEnter>
          {isNavigationActive ?
            <motion.div key="a" variants={hbgrVariants} initial="initial" animate="animate">
              <MobileCancelButtonSvg />
            </motion.div>
          :
            <motion.div key="b" variants={hbgrVariants} initial="initial" animate="animate">
              <MobileNavigationButtonSvg />
            </motion.div>
          }
        </AnimatePresence>
      </CircleButton>
    </div>
  )
}

const NavbarActive = ({closeNavigation}) => {
  const closeTreshold: number = 50
  const shouldBecomeInactive = (panOffsetValue: number): void => {
    if (panOffsetValue > closeTreshold) closeNavigation()
  }
  const [ currentMotionValue, updateMotionValue, restartMotionValue ] = useTapGesture(shouldBecomeInactive)
  return (
    <motion.div animate={{y: currentMotionValue}} className={style.Navbar__container_active}>
      <motion.div whileTap={{scale: 0.9}} onPan={updateMotionValue} onPanEnd={restartMotionValue} className={style.lines}>
        <LinesSvg/>
      </motion.div>
      <nav className={`${style.Navbar__links__container} ${style.contentWidth}`}>
        {navlinks.map(({to, text, icon}) => 
        <motion.li whileTap={{scale: 0.95}}>
          <NavbarLink to={to}>
            <Image height="40" width="40" src={icon} alt={text} />
            <div className={style.link__text}>
              {text}
            </div>
          </NavbarLink>
        </motion.li>
        )}
      </nav>
    </motion.div>
  )
}

const NavbarContent = ({isActive, toggleNavigation}) => {
  return (
    <div className={style.Navbar__container}>
      <nav className={`${style.Navbar__content} ${style.contentWidth}`}>
        <MobileHamburger isNavigationActive={isActive} toggleNavigation={toggleNavigation}/>
        <AnimatePresence>
          {!isActive && (
            <motion.nav variants={NavItemsVariants} initial="initial" animate="animate" exit="initial" className={style.Navbar__links}>
              {navlinks.map(({to, text, icon}) => 
                <NavbarLink to={to}>
                  <Image height="24" width="24" src={icon} alt={text} />
                </NavbarLink>
              )}
            </motion.nav>
          )}
        </AnimatePresence>
      </nav>
    </div>
  )
}

const Navbar = () => {
  const [ isActive, setActive ] = useState<boolean>(false)
  const toggleNavigation = () => setActive(v => !v)
  return (
    <>
      <div className={style.Navbar__component}>
        <AnimatePresence>
          {isActive && 
            <motion.div variants={ActiveMenuVariants} layout initial="initial" animate="animate" exit="initial" transition={{type: "Inertia", duration: 0.3}}>
              <NavbarActive closeNavigation={() => setActive(false)} />
            </motion.div>
          }
        </AnimatePresence>
        <NavbarContent isActive={isActive} toggleNavigation={toggleNavigation}/>
      </div>
      <div className={style.additionalItemsGroup}>
        <AnimatePresence exitBeforeEnter>
          {isActive ? 
            <ToggleCircleButton>
              <CogIconSvg />
            </ToggleCircleButton>
          : 
            navlinks.map(({to, text, icon}) => 
              <CircleButton label={text}>
                <Image src={icon} height="24" width="24" alt={text}/>
              </CircleButton>
            )
          }
        </AnimatePresence>
      </div>
    </>
  )
}

export default Navbar

