import { useSelector } from 'react-redux'
import { ListItem } from '../types/UserTypes'
import { RootState } from '../redux/store'
import { DropdownProps } from './Dropdown/Dropdown.interface'
import { useState } from 'react'
import { addToList, removeFromList } from '../redux/reducers/userSlice'
import { useAppDispatch } from '../hooks/useAppDispatch'
import MediaDropdown from './Dropdown/MediaDropdown'

interface ListDropdownProps {
  item: ListItem
}

const ListDropdown: React.FC<ListDropdownProps> = ({ item }) => {
  const dispatch = useAppDispatch()
  const user = useSelector((state: RootState) => state.auth.user)

  const listOptions: DropdownProps['options'] = ['Planning', 'Completed', 'Dropped']

  const getCurrentList = (): string | null => {
    if (!user?.lists) return null
    return (
      listOptions.find(list =>
        user.lists?.[list.toLowerCase() as keyof typeof user.lists]?.some(i => i.id === item.id)
      ) || null
    )
  }

  const [selectedList, setSelectedList] = useState<string | null>(getCurrentList())

  const handleSelect = (listType: string) => {
    if (user) {
      const formattedListType = listType.toLowerCase() as 'planning' | 'completed' | 'dropped'
      dispatch(addToList({ uid: user.uid, listType: formattedListType, item }))
      setSelectedList(listType)
    }
  }

  const handleClear = () => {
    if (user && selectedList) {
      const formattedListType = selectedList.toLowerCase() as 'planning' | 'completed' | 'dropped'
      dispatch(removeFromList({ uid: user.uid, listType: formattedListType, itemId: item.id }))
      setSelectedList(null)
    }
  }

  return (
    <MediaDropdown
      options={listOptions}
      defaultLabel="Add to List"
      selected={selectedList}
      onSelect={handleSelect}
      onClear={handleClear}
    />
  )
}

export default ListDropdown
