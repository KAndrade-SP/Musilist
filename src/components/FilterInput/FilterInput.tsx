import React from 'react'
import { Input, SearchIcon, SearchInputContainer } from '../SearchInput/SearchInput.styles'

const SearchInput: React.FC = () => {
  return (
    <SearchInputContainer>
      <SearchIcon size={20} />
      <Input type="text" placeholder={`Search`} />
    </SearchInputContainer>
  )
}

export default SearchInput
