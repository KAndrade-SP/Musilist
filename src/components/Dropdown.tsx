import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { IconChevronDown, IconChevronUp, IconXboxXFilled } from '@tabler/icons-react'

interface DropdownProps {
    options: string[]
    defaultLabel: string
    selected: string | null
    onSelect: (option: string) => void
    onClear: () => void
}

const DropdownContainer = styled.div`
  position: relative;
  width: 100%;
`

const DropdownHeader = styled.div`
    ${({ theme: { colors, fontSizes } }) => `
        padding: 8px 15px;
        background-color: ${colors.darkPurple};
        font-size: ${fontSizes.normalFontSize};
        border-radius: 8px;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: box-shadow 0.3s ease;
    `}
    &.open {
        border-bottom-left-radius: 0;
        border-bottom-right-radius: 0;
    }
`

const DropdownList = styled.ul`
    ${({ theme: { colors, fontSizes } }) => `
        position: absolute;
        top: 110%;
        left: 0;
        width: 100%;
        background-color: ${colors.textWhite};
        font-size: ${fontSizes.normalFontSize};
        border-radius: 8px;
        box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
        list-style: none;
        padding: 10px 0;
        margin: 0;
        z-index: 1000;
    
        opacity: 0;
        transform: translateY(-10px);
        visibility: hidden;
        pointer-events: none;
        transition: max-height 0.3s ease-in-out, opacity 0.3s ease-in-out, transform 0.3s ease;

        &::before {
            content: '';
            position: absolute;
            top: -10px;
            left: 20px;
            border-width: 0 10px 10px 10px;
            border-style: solid;
            border-color: transparent transparent ${colors.textWhite}; transparent;
        }
    `}
    &.open {
        opacity: 1;
        transform: translateY(0);
        visibility: visible;
        pointer-events: auto;
    }
`

const DropdownItem = styled.li`
    ${({ theme: { colors } }) => `
        padding: 10px 20px;
        cursor: pointer;
        color: ${colors.grayBackground};
        transition: background-color 0.2s ease;
        opacity: 0.6;

        &:hover {
            background-color: rgba(46, 41, 59, 0.1);
        }
    `}
`

const IconButton = styled.button`
    ${({ theme: { colors } }) => `
        background: none;
        border: none;
        cursor: pointer;
        padding: 0;
        display: flex;
        align-items: center;
        color: ${colors.textWhite};
    `}
`

const Dropdown = ({ 
    options, 
    defaultLabel,
    selected, 
    onSelect,
    onClear,
}: DropdownProps) => {

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
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
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
            <DropdownHeader onClick={toggleDropdown} className={isOpen ? "open" : ""}>
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
            <DropdownList className={isOpen ? "open" : ""}>
                {options.map((option, index) => (
                    <DropdownItem
                        key={index}
                        onClick={() => handleSelect(option)}
                    >
                        {option}
                    </DropdownItem>
                ))}
            </DropdownList>
        </DropdownContainer>
    )
}

export default Dropdown
