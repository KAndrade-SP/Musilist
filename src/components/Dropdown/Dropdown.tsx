import { useState, useRef, useEffect } from 'react'
import { IconChevronDown, IconChevronUp, IconXboxXFilled } from '@tabler/icons-react'
import { DropdownContainer, DropdownHeader, DropdownItem, DropdownList, IconButton } from './Dropdown.styles'
import { DropdownProps } from './Dropdown.interface'

const Dropdown = ({ options, defaultLabel, selected, onSelect, onClear }: DropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const toggleDropdown = () => {
    setIsOpen(prev => !prev)
  }

  const handleSelect = (option: string) => {
    onSelect(option)
    setIsOpen(false)
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <DropdownContainer ref={dropdownRef}>
      <DropdownHeader onClick={toggleDropdown} className={isOpen ? 'open' : ''}>
        <span>{selected || defaultLabel}</span>
        {selected ? (
          <IconButton onClick={onClear} aria-label="Clear selection">
            <IconXboxXFilled size={20} />
          </IconButton>
        ) : isOpen ? (
          <IconChevronUp size={20} />
        ) : (
          <IconChevronDown size={20} />
        )}
      </DropdownHeader>
      <DropdownList className={isOpen ? 'open' : ''}>
        {options.map((option, index) => (
          <DropdownItem key={index} onClick={() => handleSelect(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownList>
    </DropdownContainer>
  )
}

export default Dropdown
