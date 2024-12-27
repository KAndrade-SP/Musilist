import { User } from '../../types/UserTypes'
import Banner from '../../components/Banner'
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
} from './styles'

const Home = ({ user }: { user: User | null }) => {
  return (
    <>
      <Banner user={user} />
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

            <LastActivityDivisor>
              <LastActivityItem>
                <LastActivityImage src={MusicImage} alt="" />
                <span>
                  Plans to listen <LastActivityText>Song name</LastActivityText>
                </span>
              </LastActivityItem>

              <LastActivityData>Artist name</LastActivityData>

              <LastActivityTime>1 day ago</LastActivityTime>
            </LastActivityDivisor>

            <LastActivityDivisor>
              <LastActivityItem>
                <LastActivityImage src={MusicImage} alt="" />
                <span>
                  Completed <LastActivityText>Song name</LastActivityText>
                </span>
              </LastActivityItem>

              <LastActivityData>Artist name</LastActivityData>

              <LastActivityTime>1 day ago</LastActivityTime>
            </LastActivityDivisor>

            <LastActivityDivisor>
              <LastActivityItem>
                <LastActivityImage src={MusicImage} alt="" />
                <span>
                  Dropped <LastActivityText>Song name</LastActivityText>
                </span>
              </LastActivityItem>

              <LastActivityData>Artist name</LastActivityData>

              <LastActivityTime>1 day ago</LastActivityTime>
            </LastActivityDivisor>

            <LastActivityDivisor>
              <LastActivityItem>
                <LastActivityImage src={MusicImage} alt="" />
                <span>
                  Listened <LastActivityText>Song name</LastActivityText>
                </span>
              </LastActivityItem>

              <LastActivityData>Artist name</LastActivityData>

              <LastActivityTime>1 day ago</LastActivityTime>
            </LastActivityDivisor>
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
            <FavoritesBox>
              <Favorite src={ArtistImage} />
              Favorite Artist
            </FavoritesBox>
            <FavoritesBox>
              <Favorite src={ArtistImage} />
              Favorite Artist
            </FavoritesBox>
            <FavoritesBox>
              <Favorite src={ArtistImage} />
              Favorite Artist
            </FavoritesBox>
            <FavoritesBox>
              <Favorite src={ArtistImage} />
              Favorite Artist
            </FavoritesBox>
            <FavoritesBox>
              <Favorite src={ArtistImage} />
              Favorite Artist
            </FavoritesBox>
            <FavoritesBox>
              <Favorite src={ArtistImage} />
              Favorite Artist
            </FavoritesBox>
            <FavoritesBox>
              <Favorite src={ArtistImage} />
              Favorite Artist
            </FavoritesBox>
            <FavoritesBox>
              <Favorite src={ArtistImage} />
              Favorite Artist
            </FavoritesBox>
            <FavoritesBox>
              <Favorite src={ArtistImage} />
              Favorite Artist
            </FavoritesBox>
            <FavoritesBox>
              <Favorite src={ArtistImage} />
              Favorite Artist
            </FavoritesBox>
          </FavoritesArea>
        </HomeSection>

        <HomeSection>
          <h2>Favorite Tracks</h2>

          <FavoritesArea>
            <FavoritesBox>
              <Favorite src={MusicImage} />
              Favorite Track
            </FavoritesBox>
            <FavoritesBox>
              <Favorite src={MusicImage} />
              Favorite Track
            </FavoritesBox>
            <FavoritesBox>
              <Favorite src={MusicImage} />
              Favorite Track
            </FavoritesBox>
            <FavoritesBox>
              <Favorite src={MusicImage} />
              Favorite Track
            </FavoritesBox>
            <FavoritesBox>
              <Favorite src={MusicImage} />
              Favorite Track
            </FavoritesBox>
            <FavoritesBox>
              <Favorite src={MusicImage} />
              Favorite Track
            </FavoritesBox>
            <FavoritesBox>
              <Favorite src={MusicImage} />
              Favorite Track
            </FavoritesBox>
            <FavoritesBox>
              <Favorite src={MusicImage} />
              Favorite Track
            </FavoritesBox>
            <FavoritesBox>
              <Favorite src={MusicImage} />
              Favorite Track
            </FavoritesBox>
            <FavoritesBox>
              <Favorite src={MusicImage} />
              Favorite Track
            </FavoritesBox>
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
