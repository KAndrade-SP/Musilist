import { useState, useEffect } from 'react'

export const useBreakpoint = (breakpoint: number) => {
  const [isScreenLarge, setIsScreenLarge] = useState(window.innerWidth >= breakpoint)

  useEffect(() => {
    const handleResize = () => {
      setIsScreenLarge(window.innerWidth >= breakpoint)
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [breakpoint])

  return isScreenLarge
}
