import React from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { DetailContainer, MediaImage, MediaInfo, MediaTitle } from './MediaDetails.styles'

const MediaDetails: React.FC = () => {
  const { type } = useParams<{ type: 'artists' | 'tracks' | 'albums' }>()
  const location = useLocation()
  const item = location.state

  if (!item) return <DetailContainer>Empty</DetailContainer>

  return (
    <DetailContainer>
      {item.image && <MediaImage src={item.image} alt={item.name} />}
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
          <MediaInfo>Album: </MediaInfo>
          <MediaInfo>Duration: </MediaInfo>
        </>
      )}

      {type === 'albums' && (
        <>
          <MediaInfo>Artist: </MediaInfo>
          <MediaInfo>Total songs: </MediaInfo>
          <MediaInfo>Type: </MediaInfo>
        </>
      )}
    </DetailContainer>
  )
}

export default MediaDetails
