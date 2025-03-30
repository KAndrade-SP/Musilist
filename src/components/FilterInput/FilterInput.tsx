import React from 'react'
import { Input, SearchIcon, SearchInputContainer } from '../SearchInput/SearchInput.styles'

interface SearchInputProps {
  searchTerm: string
  setSearchTerm: (value: string) => void
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <SearchInputContainer>
      <SearchIcon size={20} />
      <Input type="text" placeholder="Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
    </SearchInputContainer>
  )
}

export default SearchInput
