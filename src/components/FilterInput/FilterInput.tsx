import React, { useEffect, useState } from 'react'
import { Input, SearchIcon, SearchInputContainer } from './FilterInput.styles'
import { useSpotifySearch } from '../../hooks/useSpotifySearch'

type FilterInputProps = {
  onSearchComplete: (data: any) => void
  searchType: 'artists' | 'tracks' | 'albums'
}

const FilterInput: React.FC<FilterInputProps> = ({ onSearchComplete, searchType }) => {
  const [query, setQuery] = useState('')
  const { data, search } = useSpotifySearch()

  const handleSearch = () => {
    if (query.trim()) {
      search(query, searchType)
    }
  }

  useEffect(() => {
    if (query.trim()) {
      handleSearch()
    }
  }, [searchType])

  useEffect(() => {
    if (data) {
      onSearchComplete(data)
    }
  }, [data, onSearchComplete])

  return (
    <SearchInputContainer>
      <SearchIcon size={20} />
      <Input
        type="text"
        placeholder={`Search for ${searchType}`}
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSearch()}
      />
    </SearchInputContainer>
  )
}

export default FilterInput
