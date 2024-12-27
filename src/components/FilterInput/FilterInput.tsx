import React from 'react'
import { Input, SearchIcon, SearchInputContainer } from './FilterInput.styles'

const FilterInput: React.FC = () => {
  return (
    <SearchInputContainer>
      <SearchIcon size={20} />
      <Input type="text" placeholder="Filter" />
    </SearchInputContainer>
  )
}

export default FilterInput
