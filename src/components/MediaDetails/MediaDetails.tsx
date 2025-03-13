import { useParams } from 'react-router-dom'
import {
  DetailContainer,
  DetailContainerBackground,
  DetailContent,
  MediaButtons,
  MediaDescriptionContainer,
  MediaImage,
  MediaInfo,
  MediaInfoContainer,
  MediaTitle,
} from './MediaDetails.styles'
import { formatDuration } from '../../helpers/FormatDuration'
import LikeButton from '../LikeButton'
import { useSpotifyDetails } from '../../hooks/useSpotifyDetails'

const MediaDetails = () => {
  const { type, id } = useParams<{ type: 'artists' | 'tracks' | 'albums'; id: string }>()
  const { data: item, loading, error } = useSpotifyDetails(id!, type!)

  if (loading) return <DetailContainer>Loading...</DetailContainer>
  if (error) return <DetailContainer>Error: {error}</DetailContainer>
  if (!item) return <DetailContainer>Empty</DetailContainer>

  const getItemData = (item: any, type: 'artists' | 'tracks' | 'albums') => {
    if (!item) return null

    return {
      id: item.id,
      name: item.name,
      image: item.images?.[0]?.url || item.album?.images?.[0]?.url || '',
    }
  }

  if (!type) return <DetailContainer>Invalid type</DetailContainer>

  const formattedItem = getItemData(item, type)
  if (!formattedItem) return <DetailContainer>Empty</DetailContainer>

  return (
    <DetailContainer>
      <DetailContainerBackground>
        <DetailContent>
          <MediaInfoContainer>
            <MediaImage src={formattedItem.image} alt={item.name} />

            <MediaDescriptionContainer>
              <MediaTitle>{item.name}</MediaTitle>

              {type === 'artists' && (
                <>
                  <MediaInfo>Name: {item.name}</MediaInfo>
                  <LikeButton item={formattedItem} type="artists" />
                </>
              )}

              {type === 'tracks' && (
                <>
                  <MediaInfo>Artist: {item.artists[0]?.name}</MediaInfo>
                  <MediaInfo>Album: {item.album?.name}</MediaInfo>
                  <MediaInfo>Duration: {formatDuration(item.duration_ms)}</MediaInfo>
                  <LikeButton item={formattedItem} type="tracks" />
                </>
              )}

              {type === 'albums' && (
                <>
                  <MediaInfo>Artist: {item.artists[0]?.name}</MediaInfo>
                  <MediaInfo>Total songs: {item.total_tracks}</MediaInfo>
                  <MediaInfo>Type: {item.album_type}</MediaInfo>
                  <LikeButton item={formattedItem} type="albums" />
                </>
              )}
            </MediaDescriptionContainer>

            <MediaButtons>
              <p>dropdown</p>
            </MediaButtons>
          </MediaInfoContainer>
        </DetailContent>
      </DetailContainerBackground>
    </DetailContainer>
  )
}

export default MediaDetails
