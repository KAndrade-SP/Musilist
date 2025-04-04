import { User } from '../../types/UserTypes'
import { Container } from '../../components/Container'
import PlaylistImage from '../../assets/PlaceholderImages/Playlist.png'
import MusicImage from '../../assets/PlaceholderImages/Music.jpg'
import AlbumImage from '../../assets/PlaceholderImages/Album.jpg'
import ArtistImage from '../../assets/PlaceholderImages/Artist.jpg'
import { IconDisc, IconMusicStar, IconPlayerPlay } from '@tabler/icons-react'
import {
  ActivityArea,
  ActivityItem,
  Favorite,
  FavoritesArea,
  FavoritesBox,
  GenreBox,
  GenreDivisor,
  GenreEntries,
  GenreOverviewArea,
  GenrePlayArea,
  HomeSection,
  HomeSectionRow,
  LastActivityArea,
  LastActivityData,
  LastActivityDivisor,
  LastActivityImage,
  LastActivityItem,
  LastActivityText,
  LastActivityTime,
  MetricItem,
  MetricLabel,
  MetricValue,
  Playlist,
  PlaylistArea,
  PlaylistBox,
  TopDescription,
  TopGrid,
  TopImage,
  TopItem,
} from './Home.styles'
import { Tooltip } from '../FavoritesPage/FavoritesPage.styles'
import { useMediaNavigation } from '../../hooks/useMediaNavigation'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { useEffect } from 'react'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { fetchActivityFeed } from '../../redux/reducers/userSlice'
import { getActionText, getTimeAgo } from '../../helpers/getFormattedActivity'

const Home = ({ user }: { user: User | null }) => {
  const dispatch = useAppDispatch()
  const { handleMediaDetails } = useMediaNavigation()
  const feed = useSelector((state: RootState) => state.user.activityFeed)
  const loading = useSelector((state: RootState) => state.user.loadingFeed)

  useEffect(() => {
    if (user?.uid) {
      dispatch(fetchActivityFeed(user.uid))
    }
  }, [user?.uid, dispatch])

  return (
    <>
      <Container>
        <ActivityArea>
          <ActivityItem aria-label="Total Songs">
            <IconDisc size={40} />
            <MetricItem>
              <MetricValue>999</MetricValue>
              <MetricLabel>Total Songs</MetricLabel>
            </MetricItem>
          </ActivityItem>

          <ActivityItem aria-label="Days Listened">
            <IconPlayerPlay size={40} />
            <MetricItem>
              <MetricValue>99.9</MetricValue>
              <MetricLabel>Days Listened</MetricLabel>
            </MetricItem>
          </ActivityItem>

          <ActivityItem aria-label="Mean Score">
            <IconMusicStar size={40} />
            <MetricItem>
              <MetricValue>99.9</MetricValue>
              <MetricLabel>Mean Score</MetricLabel>
            </MetricItem>
          </ActivityItem>
        </ActivityArea>

        <HomeSectionRow>
          <LastActivityArea>
            <h2>Activity</h2>

            {loading ? (
              <p>Loading...</p>
            ) : feed.length === 0 ? (
              <p>No activity yet.</p>
            ) : (
              feed.map(activity => (
                <LastActivityDivisor key={activity.id}>
                  <LastActivityItem>
                    <LastActivityImage src={activity.image} alt={activity.name} />
                    <span>
                      {getActionText(activity.listType)} <LastActivityText>{activity.name}</LastActivityText>
                    </span>
                  </LastActivityItem>

                  <LastActivityData>{activity.artist}</LastActivityData>
                  <LastActivityTime>{getTimeAgo(activity.timestamp)}</LastActivityTime>
                </LastActivityDivisor>
              ))
            )}
          </LastActivityArea>

          <GenrePlayArea>
            <h2>Genre overview</h2>

            <GenreOverviewArea>
              <GenreDivisor>
                <GenreBox>Metal</GenreBox>
                <GenreEntries>
                  <strong>999</strong> Entries
                </GenreEntries>
              </GenreDivisor>

              <GenreDivisor>
                <GenreBox>Pop</GenreBox>
                <GenreEntries>
                  <strong>999</strong> Entries
                </GenreEntries>
              </GenreDivisor>

              <GenreDivisor>
                <GenreBox>K-Pop</GenreBox>
                <GenreEntries>
                  <strong>999</strong> Entries
                </GenreEntries>
              </GenreDivisor>
            </GenreOverviewArea>

            <h2>Playlists</h2>

            <PlaylistArea>
              <PlaylistBox>
                <Playlist src={PlaylistImage} />
                Playlist name
              </PlaylistBox>
              <PlaylistBox>
                <Playlist src={PlaylistImage} />
                Playlist name
              </PlaylistBox>
              <PlaylistBox>
                <Playlist src={PlaylistImage} />
                Playlist name
              </PlaylistBox>
            </PlaylistArea>
          </GenrePlayArea>
        </HomeSectionRow>

        <HomeSection>
          <h2>Favorite Artists</h2>

          <FavoritesArea>
            {user?.favorites?.artists.slice(0, 10).map(artist => (
              <FavoritesBox key={artist.id} onClick={() => handleMediaDetails(artist.id, 'artists')}>
                <Favorite src={artist.image} alt={artist.name} />
                <Tooltip>{artist.name}</Tooltip>
              </FavoritesBox>
            ))}
          </FavoritesArea>
        </HomeSection>

        <HomeSection>
          <h2>Favorite Tracks</h2>

          <FavoritesArea>
            {user?.favorites?.tracks.slice(0, 10).map(track => (
              <FavoritesBox key={track.id} onClick={() => handleMediaDetails(track.id, 'tracks')}>
                <Favorite src={track.image} alt={track.name} />
                <Tooltip>{track.name}</Tooltip>
              </FavoritesBox>
            ))}
          </FavoritesArea>
        </HomeSection>

        <HomeSection>
          <h2>Top Artists</h2>

          <TopGrid>
            <TopItem>
              <TopImage src={ArtistImage} />
              <TopDescription>
                <strong>Artist name</strong>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>

            <TopItem>
              <TopImage src={ArtistImage} />
              <TopDescription>
                <strong>Artist name</strong>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>

            <TopItem>
              <TopImage src={ArtistImage} />
              <TopDescription>
                <strong>Artist name</strong>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>

            <TopItem>
              <TopImage src={ArtistImage} />
              <TopDescription>
                <strong>Artist name</strong>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>

            <TopItem>
              <TopImage src={ArtistImage} />
              <TopDescription>
                <strong>Artist name</strong>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>

            <TopItem>
              <TopImage src={ArtistImage} />
              <TopDescription>
                <strong>Artist name</strong>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>

            <TopItem>
              <TopImage src={ArtistImage} />
              <TopDescription>
                <strong>Artist name</strong>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>

            <TopItem>
              <TopImage src={ArtistImage} />
              <TopDescription>
                <strong>Artist name</strong>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>

            <TopItem>
              <TopImage src={ArtistImage} />
              <TopDescription>
                <strong>Artist name</strong>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>

            <TopItem>
              <TopImage src={ArtistImage} />
              <TopDescription>
                <strong>Artist name</strong>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>
          </TopGrid>
        </HomeSection>

        <HomeSection>
          <h2>Top Albums</h2>

          <TopGrid>
            <TopItem>
              <TopImage src={AlbumImage} />
              <TopDescription>
                <strong>Album name</strong>
                <span>Artist name</span>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>

            <TopItem>
              <TopImage src={AlbumImage} />
              <TopDescription>
                <strong>Album name</strong>
                <span>Artist name</span>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>

            <TopItem>
              <TopImage src={AlbumImage} />
              <TopDescription>
                <strong>Album name</strong>
                <span>Artist name</span>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>

            <TopItem>
              <TopImage src={AlbumImage} />
              <TopDescription>
                <strong>Album name</strong>
                <span>Artist name</span>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>

            <TopItem>
              <TopImage src={AlbumImage} />
              <TopDescription>
                <strong>Album name</strong>
                <span>Artist name</span>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>

            <TopItem>
              <TopImage src={AlbumImage} />
              <TopDescription>
                <strong>Album name</strong>
                <span>Artist name</span>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>

            <TopItem>
              <TopImage src={AlbumImage} />
              <TopDescription>
                <strong>Album name</strong>
                <span>Artist name</span>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>

            <TopItem>
              <TopImage src={AlbumImage} />
              <TopDescription>
                <strong>Album name</strong>
                <span>Artist name</span>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>

            <TopItem>
              <TopImage src={AlbumImage} />
              <TopDescription>
                <strong>Album name</strong>
                <span>Artist name</span>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>

            <TopItem>
              <TopImage src={AlbumImage} />
              <TopDescription>
                <strong>Album name</strong>
                <span>Artist name</span>
                <span>99 plays</span>
              </TopDescription>
            </TopItem>
          </TopGrid>
        </HomeSection>
      </Container>
    </>
  )
}

export default Home
