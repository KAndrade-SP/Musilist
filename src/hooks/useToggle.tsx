import { useState, useEffect, useRef, MutableRefObject } from 'react'

type UseToggleWithOutsideClick = {
  toggle: boolean
  setToggle: (value: boolean) => void
  ref: MutableRefObject<HTMLDivElement | null>
  handleClick: () => void
}

export const useToggleWithOutsideClick = (): UseToggleWithOutsideClick => {
  const [toggle, setToggle] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const outsideClick = (e: MouseEvent) => {
    const element = ref.current
    if (toggle && element && !element.contains(e.target as Node)) {
      setToggle(false)
    }
  }

  const handleClick = () => {
    setToggle(!toggle)
  }

  useEffect(() => {
    if (toggle) {
      document.addEventListener('mousedown', outsideClick)
    } else {
      document.removeEventListener('mousedown', outsideClick)
    }

    return () => {
      document.removeEventListener('mousedown', outsideClick)
    }
  }, [toggle])

  return { toggle, setToggle, ref, handleClick }
}
