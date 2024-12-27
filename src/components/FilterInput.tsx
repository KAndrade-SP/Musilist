import React from 'react'
import styled from 'styled-components'
import { IconSearch } from '@tabler/icons-react'

const SearchInputContainer = styled.div`
  position: relative;
  width: 100%;
`

const SearchIcon = styled(IconSearch)`
  ${({ theme: { colors } }) => `
    position: absolute;
    left: 10px;
    top: 50%;
    transform: translateY(-50%);
    color: ${colors.textWhite};
  `}
`

const Input = styled.input`
  ${({ theme: { colors, fontSizes } }) => `
    width: 100%;
    padding: 8px 15px 8px 38px;
    border-radius: 8px;
    background-color: ${colors.darkPurple};
    color: ${colors.textWhite};
    font-size: ${fontSizes.normalFontSize};
    border: none;
    outline: none;
    font-family: inherit;

    &:focus {
      border: none;
      outline: none;
    }

    &::placeholder {
      color: ${colors.textWhite};
    }
  `}
`

const FilterInput: React.FC = () => {
  return (
    <SearchInputContainer>
      <SearchIcon size={20} />
      <Input type="text" placeholder="Filter" />
    </SearchInputContainer>
  )
}

export default FilterInput
