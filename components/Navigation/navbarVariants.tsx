export const CircleButtonVariants = {
  animate: {opacity: 1, scale: 1} ,
  exit: {opacity: 0.7, scale: 0.2},
}

export const hbgrVariants = {
  initial: {opacity: 0, scale: 0.5},
  animate: {opacity: 1, scale: 1}
}

export const NavItemsVariants = {
  initial: { y: "3rem" },
  animate: { y: 0 }
}

export const ActiveMenuVariants = {
  initial: {
    y: 260, 
    opacity: 0.5,
    transition: {duration: 0.3, type: "tween"}
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {duration: 0.3, type: "tween"}
  }
}