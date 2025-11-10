import { useParams } from 'react-router-dom'
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
  ReviewInput,
} from './MediaDetails.styles'
import { formatDuration } from '../../helpers/FormatDuration'
import LikeButton from '../LikeButton/LikeButton'
import { useSpotifyDetails } from '../../hooks/useSpotifyDetails'
import ListDropdown from '../ListDropdown'
import { capitalize } from '../../helpers/Capitalize'
import MediaBanner from '../MediaBanner/MediaBanner'
import { IconBrandSpotifyFilled, IconCarambolaFilled, IconHeartFilled } from '@tabler/icons-react'

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
          <ReviewInput type="text" placeholder="Write a review" />
        </MediaDetailReviewArea>
      </MediaDetailStats>
    </DetailContainer>
  )
}

export default MediaDetails
