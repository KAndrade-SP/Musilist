import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import {
  DetailContainer,
  DetailContainerBackground,
  DetailContent,
  MediaDescriptionContainer,
  MediaImage,
  MediaInfo,
  MediaInfoContainer,
  MediaTitle,
} from './MediaDetails.styles'
import { formatDuration } from '../../helpers/FormatDuration'

const MediaDetails: React.FC = () => {
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
                  <MediaInfo>Popularity: 000</MediaInfo>
                  <MediaInfo>Followers: 000</MediaInfo>
                </>
              )}

              {type === 'tracks' && (
                <>
                  <MediaInfo>Artist: {item.name}</MediaInfo>
                  <MediaInfo>Album: {item.album}</MediaInfo>
                  <MediaInfo>Duration: {formatDuration(item.duration)}</MediaInfo>
                </>
              )}

              {type === 'albums' && (
                <>
                  <MediaInfo>Artist: </MediaInfo>
                  <MediaInfo>Total songs: </MediaInfo>
                  <MediaInfo>Type: </MediaInfo>
                </>
              )}
            </MediaDescriptionContainer>
          </MediaInfoContainer>
        </DetailContent>
      </DetailContainerBackground>
    </DetailContainer>
  )
}

export default MediaDetails
