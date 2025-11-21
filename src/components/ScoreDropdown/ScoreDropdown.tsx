import { useMemo, useState, useEffect, useCallback } from 'react'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import MediaDropdown from '../Dropdown/MediaDropdown'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { RootState } from '../../redux/store'
import { updateItemScore } from '../../redux/reducers/userSlice'

interface ScoreDropdownProps {
  item: any
}

const ScoreDropdown: React.FC<ScoreDropdownProps> = ({ item }) => {
  const dispatch = useAppDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const [selectedScore, setSelectedScore] = useState<string | null>(null)

  const scoreOptions = useMemo(() => {
    return Array.from({ length: 10 }, (_, index) => (index + 1).toString())
  }, [])

  const findListInfo = useCallback(() => {
    if (!user?.lists) return null

    for (const listType of ['planning', 'completed', 'dropped'] as const) {
      const foundItem = user.lists[listType]?.find(listItem => listItem.id === item.id)
      if (foundItem) {
        return { listType, item: foundItem }
      }
    }

    return null
  }, [item.id, user?.lists])

  const listInfo = useMemo(() => findListInfo(), [findListInfo])

  useEffect(() => {
    if (listInfo?.item?.score !== undefined && listInfo.item.score !== null) {
      const formattedScore = Number.isInteger(listInfo.item.score)
        ? listInfo.item.score.toString()
        : listInfo.item.score.toFixed(1)
      setSelectedScore(formattedScore)
    } else {
      setSelectedScore(null)
    }
  }, [listInfo?.item?.id, listInfo?.item?.score])

  const ensureItemInList = () => {
    if (!user) {
      toast.error('You need to be logged in to score media.')
      return null
    }

    if (!listInfo) {
      toast.info('Add this media to one of your lists to give it a score.')
      return null
    }

    return listInfo
  }

  const getItemDataForScore = () => {
    return {
      id: item.id,
      name: item.name,
      image: item.images?.[0]?.url || item.album?.images?.[0]?.url || '',
      type: item.type,
    }
  }

  const handleSelect = (value: string) => {
    const info = ensureItemInList()
    if (!info || !user) return

    const numericScore = parseFloat(value)

    dispatch(
      updateItemScore({
        uid: user.uid,
        listType: info.listType,
        itemId: item.id,
        score: numericScore,
        itemData: getItemDataForScore(),
      })
    )
      .unwrap()
      .then(() => {
        setSelectedScore(value)
      })
      .catch(() => {
        toast.error('Failed to update score. Please try again.')
      })
  }

  const handleClear = () => {
    const info = ensureItemInList()
    if (!info || !user) return

    dispatch(
      updateItemScore({
        uid: user.uid,
        listType: info.listType,
        itemId: item.id,
        score: null,
        itemData: getItemDataForScore(),
      })
    )
      .unwrap()
      .then(() => {
        setSelectedScore(null)
      })
      .catch(() => {
        toast.error('Failed to remove score. Please try again.')
      })
  }

  return (
    <MediaDropdown
      options={scoreOptions}
      defaultLabel="Score"
      selected={selectedScore}
      onSelect={handleSelect}
      onClear={handleClear}
    />
  )
}

export default ScoreDropdown
