import React, { useEffect } from 'react'
import { Input, SearchIcon, SearchInputContainer } from './SearchInput.styles'
import { useSpotifySearch } from '../../hooks/useSpotifySearch'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { setQuery } from '../../redux/reducers/searchSlice'
import { mapFilterToType } from '../../helpers/MapFilterToType'

const SearchInput: React.FC = () => {
  const dispatch = useDispatch()
  const { search } = useSpotifySearch()

  const query = useSelector((state: RootState) => state.search.query)
  const activeFilter = useSelector((state: RootState) => state.search.activeFilter)

  const handleSearch = () => {
    if (query.trim()) {
      const mappedType = mapFilterToType(activeFilter)
      search(query, mappedType)
    }
  }

  useEffect(() => {
    if (query.trim()) {
      handleSearch()
    }
  }, [activeFilter])

  return (
    <SearchInputContainer>
      <SearchIcon size={20} />
      <Input
        type="text"
        placeholder={`Search for ${activeFilter}`}
        value={query}
        onChange={e => dispatch(setQuery(e.target.value))}
        onKeyDown={e => {
          if (e.key === 'Enter') {
            handleSearch()
          }
        }}
      />
    </SearchInputContainer>
  )
}

export default SearchInput
