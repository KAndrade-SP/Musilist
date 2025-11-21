import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {
  DetailContainer,
  DetailContent,
  MediaArtistName,
  MediaDescriptionContainer,
  MediaDetailPopularityArea,
  MediaDetailReviewArea,
  MediaDetailStats,
  MediaInfo,
  MediaInfoContainer,
  MediaItems,
  MediaPopularityBox,
  MediaPopularityItem,
  MediaPopularityItemLink,
  MediaTitle,
  ReviewAddButton,
  ReviewInput,
} from './MediaDetails.styles'
import { formatDuration } from '../../helpers/FormatDuration'
import LikeButton from '../LikeButton/LikeButton'
import { useSpotifyDetails } from '../../hooks/useSpotifyDetails'
import ListDropdown from '../ListDropdown'
import ScoreDropdown from '../ScoreDropdown/ScoreDropdown'
import { capitalize } from '../../helpers/Capitalize'
import MediaBanner from '../MediaBanner/MediaBanner'
import { IconBrandSpotifyFilled } from '@tabler/icons-react'
import { RootState } from '../../redux/store'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { updateItemReview } from '../../redux/reducers/userSlice'
import { toast } from 'react-toastify'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../services/firebase'

const MediaDetails = () => {
  const { type, id } = useParams<{ type: 'artists' | 'tracks' | 'albums'; id: string }>()
  const { data: item, loading, error } = useSpotifyDetails(id!, type!)
  const dispatch = useAppDispatch()
  const user = useSelector((state: RootState) => state.auth.user)
  const [reviewText, setReviewText] = useState('')

  const getItemData = (item: any, type: 'artists' | 'tracks' | 'albums') => {
    if (!item) return null

    return {
      id: item.id,
      name: item.name,
      image: item.images?.[0]?.url || item.album?.images?.[0]?.url || '',
    }
  }

  const formattedItem = item && type ? getItemData(item, type) : null

  const getItemListInfo = () => {
    if (!user?.lists || !id) return null

    for (const listType of ['planning', 'completed', 'dropped'] as const) {
      const foundItem = user.lists[listType]?.find(i => i.id === id)
      if (foundItem) {
        return { listType, item: foundItem }
      }
    }
    return null
  }

  const listInfo = getItemListInfo()
  const isItemInList = !!listInfo
  const isButtonDisabled = !isItemInList

  useEffect(() => {
    if (listInfo?.item?.review !== undefined) {
      setReviewText(listInfo.item.review || '')
    } else if (!listInfo) {
      setReviewText('')
    }
  }, [listInfo?.item?.id, listInfo?.item?.review])

  const handleAddReview = () => {
    if (!user || !listInfo) return

    dispatch(
      updateItemReview({
        uid: user.uid,
        listType: listInfo.listType,
        itemId: id!,
        review: reviewText.trim(),
      })
    )

    toast.success('Review updated successfully!')
  }

  const [globalRating, setGlobalRating] = useState<{
    averageScore: number
    totalRatings: number
  } | null>(null)

  useEffect(() => {
    const fetchRating = async () => {
      const ref = doc(db, 'ratings', id!)
      const snap = await getDoc(ref)

      if (snap.exists()) {
        const data = snap.data()
        setGlobalRating({
          averageScore: data.averageScore,
          totalRatings: data.totalRatings,
        })
      } else {
        setGlobalRating(null)
      }
    }

    fetchRating()
  }, [id])

  if (loading) return <DetailContainer>Loading...</DetailContainer>
  if (error) return <DetailContainer>Error: {error}</DetailContainer>
  if (!item || !type || !formattedItem) return <DetailContainer>Empty</DetailContainer>

  return (
    <DetailContainer>
      <MediaBanner image={formattedItem.image}>
        <DetailContent>
          <MediaInfoContainer>
            <MediaDescriptionContainer>
              <MediaArtistName>{item.artists && item.artists[0]?.name}</MediaArtistName>
              <MediaTitle>{item.name}</MediaTitle>

              {type === 'artists' && (
                <>
                  <MediaItems>
                    <ListDropdown item={item} />
                    <ScoreDropdown item={item} />
                    <LikeButton item={formattedItem} type="artists" />
                  </MediaItems>
                </>
              )}

              {type === 'tracks' && (
                <>
                  <MediaInfo>
                    Album: <strong>{item.album?.name}</strong>
                  </MediaInfo>
                  <MediaInfo>
                    Duration: <strong>{formatDuration(item.duration_ms)}</strong>
                  </MediaInfo>
                  <MediaItems>
                    <ListDropdown item={item} />
                    <ScoreDropdown item={item} />
                    <LikeButton item={formattedItem} type="tracks" />
                  </MediaItems>
                </>
              )}

              {type === 'albums' && (
                <>
                  <MediaInfo>
                    Total songs: <strong>{item.total_tracks}</strong>
                  </MediaInfo>
                  <MediaInfo>
                    Type: <strong>{capitalize(item.album_type)}</strong>
                  </MediaInfo>
                  <MediaItems>
                    <ListDropdown item={item} />
                    <ScoreDropdown item={item} />
                    <LikeButton item={formattedItem} type="albums" />
                  </MediaItems>
                </>
              )}
            </MediaDescriptionContainer>
          </MediaInfoContainer>
        </DetailContent>
      </MediaBanner>

      <MediaDetailStats>
        <MediaDetailPopularityArea>
          <MediaPopularityBox>
            {item.external_urls?.spotify && (
              <MediaPopularityItem>
                <strong>Spotify: </strong>{' '}
                <MediaPopularityItemLink href={item.external_urls?.spotify} target="_blank" rel="noopener noreferrer">
                  <IconBrandSpotifyFilled size={16} />
                  {item.name}
                </MediaPopularityItemLink>
              </MediaPopularityItem>
            )}
            {item.label && (
              <MediaPopularityItem>
                <strong>Label: </strong> {item.label}
              </MediaPopularityItem>
            )}
            {globalRating && (
              <MediaPopularityItem>
                <strong>Community Rating: </strong>
                {globalRating.averageScore.toFixed(1)}
              </MediaPopularityItem>
            )}
            <MediaPopularityItem>
              <strong>Popularity rating: </strong> {item.popularity}
            </MediaPopularityItem>
            {(item.release_date || item.album?.release_date) && (
              <MediaPopularityItem>
                <strong>Release date: </strong> {item.release_date || item.album?.release_date}
              </MediaPopularityItem>
            )}
            {item.genres &&
              item.album_type !== 'album' &&
              item.album_type !== 'single' &&
              item.album_type !== 'compilation' && (
                <MediaPopularityItem>
                  <strong>Genres: </strong> {item.genres.join(', ')}
                </MediaPopularityItem>
              )}
          </MediaPopularityBox>
        </MediaDetailPopularityArea>
        <MediaDetailReviewArea>
          <ReviewInput
            type="text"
            placeholder="Write a review"
            value={reviewText}
            onChange={e => setReviewText(e.target.value)}
          />
          <ReviewAddButton onClick={handleAddReview} disabled={isButtonDisabled}>
            Save Review
          </ReviewAddButton>
        </MediaDetailReviewArea>
      </MediaDetailStats>
    </DetailContainer>
  )
}

export default MediaDetails
