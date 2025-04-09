import { useState, useRef, useEffect } from 'react'
import { IconChevronDown, IconChevronUp, IconXboxXFilled } from '@tabler/icons-react'
import { DropdownProps } from './Dropdown.interface'
import { MediaDropdownContainer, MediaDropdownHeader, MediaDropdownList, MediaIconButton } from './MediaDropdown.styles'
import { DropdownItem } from './Dropdown.styles'

const MediaDropdown = ({ options, defaultLabel, selected, onSelect, onClear }: DropdownProps) => {
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
    <MediaDropdownContainer ref={dropdownRef}>
      <MediaDropdownHeader onClick={toggleDropdown} className={isOpen ? 'open' : ''}>
        <span>{selected || defaultLabel}</span>
        {selected ? (
          <MediaIconButton onClick={onClear} aria-label="Clear selection">
            <IconXboxXFilled size={20} />
          </MediaIconButton>
        ) : isOpen ? (
          <IconChevronUp size={20} />
        ) : (
          <IconChevronDown size={20} />
        )}
      </MediaDropdownHeader>
      <MediaDropdownList className={isOpen ? 'open' : ''}>
        {options.map((option, index) => (
          <DropdownItem key={index} onClick={() => handleSelect(option)}>
            {option}
          </DropdownItem>
        ))}
      </MediaDropdownList>
    </MediaDropdownContainer>
  )
}

export default MediaDropdown
