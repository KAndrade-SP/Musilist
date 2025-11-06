import { useParams } from 'react-router-dom'
import {
  DetailContainer,
  DetailContent,
  MediaArtistName,
  MediaDescriptionContainer,
  MediaDetailPopularityArea,
  MediaDetailStats,
  MediaInfo,
  MediaInfoContainer,
  MediaItems,
  MediaPopularityBox,
  MediaTitle,
} from './MediaDetails.styles'
import { formatDuration } from '../../helpers/FormatDuration'
import LikeButton from '../LikeButton/LikeButton'
import { useSpotifyDetails } from '../../hooks/useSpotifyDetails'
import ListDropdown from '../ListDropdown'
import { capitalize } from '../../helpers/Capitalize'
import MediaBanner from '../MediaBanner/MediaBanner'
import { IconCarambolaFilled, IconHeartFilled } from '@tabler/icons-react'

const MediaDetails = () => {
  const { type, id } = useParams<{ type: 'artists' | 'tracks' | 'albums'; id: string }>()
  const { data: item, loading, error } = useSpotifyDetails(id!, type!)

  const getItemData = (item: any, type: 'artists' | 'tracks' | 'albums') => {
    if (!item) return null

    return {
      id: item.id,
      name: item.name,
      image: item.images?.[0]?.url || item.album?.images?.[0]?.url || '',
    }
  }

  const formattedItem = item && type ? getItemData(item, type) : null

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
            <IconCarambolaFilled size={16} color="#FFEB3B" />
            Popularity rating: <strong> {item.popularity}</strong>
          </MediaPopularityBox>
          <MediaPopularityBox>
            <IconHeartFilled size={16} color="#eb3d37" />
            Popularity rating: <strong> {item.popularity}</strong>
          </MediaPopularityBox>
        </MediaDetailPopularityArea>
      </MediaDetailStats>
    </DetailContainer>
  )
}

export default MediaDetails
