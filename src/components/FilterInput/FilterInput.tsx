import React, { useState } from 'react'
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

  React.useEffect(() => {
    if (data) {
      onSearchComplete(data)
    }
  }, [data, onSearchComplete])

  return (
    <SearchInputContainer>
      <SearchIcon size={20} />
      <Input
        type="text"
        placeholder="Search for tracks, artists or albums"
        value={query}
        onChange={e => setQuery(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && handleSearch()}
      />
    </SearchInputContainer>
  )
}

export default FilterInput
