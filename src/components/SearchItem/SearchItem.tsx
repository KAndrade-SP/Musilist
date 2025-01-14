import React from 'react'
import { SearchTitle } from './SearchItem.styles'

const SearchItem: React.FC<{ title: string }> = ({ title }) => {
  return <SearchTitle data-title={title}>{title}</SearchTitle>
}

export default SearchItem
