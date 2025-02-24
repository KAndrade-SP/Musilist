import { useLocation, useParams } from 'react-router-dom'
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
import { User } from '../../types/UserTypes'

const MediaDetails = ({ user }: { user: User | null }) => {
  const { type } = useParams<{ type: 'artists' | 'tracks' | 'albums' }>()
  const location = useLocation()
  const item = location.state

  if (!item) return <DetailContainer>Empty</DetailContainer>

  return (
    <DetailContainer>
      <DetailContainerBackground>
        <DetailContent>
          <MediaInfoContainer>
            {item.image && <MediaImage src={item.image} alt={item.name} />}

            <MediaDescriptionContainer>
              <MediaTitle>{item.name}</MediaTitle>

              {type === 'artists' && (
                <>
                  <MediaInfo>Name: {item.name}</MediaInfo>
                  <LikeButton itemId={item.id} type="artists" />
                </>
              )}

              {type === 'tracks' && (
                <>
                  <MediaInfo>Artist: {item.name}</MediaInfo>
                  <MediaInfo>Album: {item.album}</MediaInfo>
                  <MediaInfo>Duration: {formatDuration(item.duration)}</MediaInfo>
                  <LikeButton itemId={item.id} type="tracks" />
                </>
              )}

              {type === 'albums' && (
                <>
                  <MediaInfo>Artist: {item.artist}</MediaInfo>
                  <MediaInfo>Total songs: {item.totalTracks}</MediaInfo>
                  <MediaInfo>Type: {item.albumType}</MediaInfo>
                  <LikeButton itemId={item.id} type="albums" />
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
