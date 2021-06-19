import { useEffect, useState, useCallback } from "react"
import { useRouter } from "next/router"
import { deepComparison } from "../someFunctions"
import { urlObjectModel } from '../pagePropsType'

const useToggleQuery = (to: urlObjectModel): [boolean, () => void] => {
  const router = useRouter()
  const currentRoute = { pathname: router.pathname, query: router.query } as urlObjectModel
  const [ isActive, setActive ] = useState<boolean>(deepComparison(currentRoute, to))
  useEffect(() => {
    setActive(deepComparison(currentRoute, to))
  }, [router.asPath])
  const handleToggle = useCallback(() => {
    router.replace(deepComparison(currentRoute, to) ? router.pathname : to)
  }, [router.asPath])
  return [ isActive, handleToggle ]
}

export default useToggleQuery