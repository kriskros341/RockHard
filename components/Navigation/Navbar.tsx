import style from './Navbar.module.scss'
import globalStyle from '../../styles/app.module.scss'
import Link from 'next/link'
import {navlinks, MobileNavigationButtonSvg, MobileCancelButtonSvg, LinesSvg, CogIconSvg} from './NavLinks'
import Image from 'next/image'
import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { hbgrVariants, NavItemsVariants, ActiveMenuVariants } from './navbarVariants'
import useTapGesture from './useTapGesture'
import router, { useRouter } from 'next/router'
import { urlObjectModel } from '../pagePropsType'
import useToggleQuery from './useToggleQuery'

export const CircleButton: React.FC<{label: string, callback?: () => void}> = ({label, children, callback}) => {
  return (
    <motion.div
      //Variants break whileTap for some reason
      animate={{opacity: 1, scale: 1}}
      initial={{opacity: 0.7, scale: 0.2}}
      whileTap={{scale: 0.9}}
      className={`${style.CircleButton}`} 
      role='button' 
      onClick={ callback ? () => callback() : () => {} }
      aria-label={label}
    >
      {children}
    </motion.div>
  )
}

interface ToggleCircleButtonInterface {
  to?: urlObjectModel
}

const ToggleCircleButton: React.FC<ToggleCircleButtonInterface> = ({to, children}) => {
  const [ isActive, handleToggle ] = useToggleQuery(to ? to : {pathname: '/'})
  return (
    <div 
      className={`${style.ToggleCircleButton} ${isActive && style.active}`}
      onClick={() => handleToggle()} 
    >
      <CircleButton label={"Options"}>
        {children}
      </CircleButton>
    </div>
  )
}

export const NavbarLink: React.FC<{to: string}> = ({to, children}) => {
  return (
    <Link href={to}>
      <div className={style.link}>
        {children}
      </div>
    </Link>
  )
}

interface MobileHamburgerInterface {
  isNavigationActive: boolean
  toggleNavigation: () => void
}

const MobileHamburger: React.FC<MobileHamburgerInterface> = ({isNavigationActive, toggleNavigation}) => {
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

const BasicNavigation: React.FC<{closeNavigation: () => void, extendNavigation: () => void}> = ({closeNavigation, extendNavigation}) => {
  const closeTreshold: number = 50
  const height: number = 260
  const shouldBecomeInactive = (panOffsetValue: number): void => {
    panOffsetValue >= closeTreshold && closeNavigation()
  } 
  const panEndHandler = (event, info): void => {
    info.offset.y < -1 * closeTreshold && extendNavigation()
    info.offset.y < closeTreshold && restartMotionValue()
  }
  const [ currentMotionValue, updateMotionValue, restartMotionValue ] = 
    useTapGesture(height, shouldBecomeInactive)
  return (
    <motion.div layoutId="MenuId" animate={{height: currentMotionValue}} className={style.Navbar__container_active}>
      <motion.div whileTap={{scale: 0.9}} onPan={updateMotionValue} onPanEnd={panEndHandler} className={style.lines}>
        <LinesSvg/>
      </motion.div>
      <nav className={`${style.Navbar__links__container} ${style.contentWidth}`}>
        {navlinks.map(({to, text, icon}, index) => 
          <motion.li key={`BasicNavigationLink__${index}`} whileTap={{scale: 0.95}}>
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
    <div className={`${style.Navbar__container}`}>
      <nav className={`${style.Navbar__content} ${style.contentWidth}`}>
        <MobileHamburger isNavigationActive={isActive} toggleNavigation={toggleNavigation}/>
        <AnimatePresence>
          {!isActive && (
            <motion.nav variants={NavItemsVariants} initial="initial" animate="animate" exit="initial" className={style.Navbar__links}>
              {navlinks.map(({to, text, icon}, index) => 
                <NavbarLink to={to} key={`NavbarContentlink__${index}`}>
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

const Navbar = ({additionalButtons}) => {
  const [ isActive, setActive ] = useState<boolean>(false)
  const toggleNavigation = () => setActive(v => !v)
  const goHome = () => {router.replace('/'); setActive(false)}
  return (
    <>
      <div className={style.Navbar__component}>
        <AnimatePresence>
          {isActive &&
            <motion.div variants={ActiveMenuVariants} initial="initial" animate="animate" exit="initial" transition={{type: "Inertia", duration: 0.3}}>
              <BasicNavigation closeNavigation={() => setActive(false)} extendNavigation={goHome}/>
            </motion.div>
          }
        </AnimatePresence>
        <NavbarContent isActive={isActive} toggleNavigation={toggleNavigation}/>
      </div>
      <motion.div className={style.additionalItemsGroup} initial="hidden" animate="show" exit="hidden">
        {isActive ? 
          <ToggleCircleButton key={`navSettings`} to={{pathname: '/settings'}}>
            <CogIconSvg />
          </ToggleCircleButton>
        : 
          additionalButtons?.map(({to, text, icon, toggle}, index: number) =>
            toggle ? 
              <ToggleCircleButton key={`navToggle_${index}`} to={to}>
                <Image src={icon} height="24" width="24" alt={text}/>
              </ToggleCircleButton>
            :
              <CircleButton key={`navButton_${index}`} label={text} callback={() => router.replace(to, undefined, { shallow: true })}>
                <Image src={icon} height="24" width="24" alt={text}/>
              </CircleButton>
            )
        }
      </motion.div>
    </>
  )
}

export default Navbar

