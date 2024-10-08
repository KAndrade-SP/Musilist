import { User } from '../../types/UserTypes'
import Banner from '../../components/Banner'
import { Container } from '../../components/Container'
import styled from 'styled-components'
import PlaylistImage from '../../assets/PlaceholderImages/Playlist.png'
import MusicImage from '../../assets/PlaceholderImages/Music.jpg'
import AlbumImage from '../../assets/PlaceholderImages/Album.jpg'
import ArtistImage from '../../assets/PlaceholderImages/Artist.jpg'

const HomeSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
  margin-top: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.xmd}) {
    flex-direction: column;
  }
`

const HomeSectionRow = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 2rem;

  @media (max-width: ${({ theme }) => theme.breakpoints.xmd}) {
    flex-direction: column;
  }
`

const ActivityArea = styled.section`
  ${({ theme: { colors, breakpoints } }) => `
    background-color: ${colors.grayBackground};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    padding: 1rem;
    margin-bottom: 2rem;
    width: 100%;
    box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);

    @media (max-width: ${breakpoints.xmd}) {
      padding: 0.2rem;
    }
  `}
`

const ActivityStats = styled.div`
  ${({ theme: { breakpoints } }) => `
    border-radius: 10px;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 1.25rem;
    width: 100%;

    @media (max-width: ${breakpoints.mini}) {
      flex-direction: column;
      gap: 2rem;
    }
  `}
`

const ActivityItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
`

const MetricValue = styled.strong`
  ${({ theme: { colors, fontSizes, breakpoints } }) => `
    font-size: ${fontSizes.normalFontSize};
    color: ${colors.lightPurple};

    @media (max-width: ${breakpoints.sm}) {
      font-size: ${fontSizes.smallFontSize};
    }
  `}
`

const MetricLabel = styled.span`
  ${({ theme: { colors, fontSizes, breakpoints } }) => `
    font-size: ${fontSizes.smallFontSize};
    color: ${colors.textWhite};

    @media (max-width: ${breakpoints.sm}) {
      font-size: ${fontSizes.smallFontSize};
    }
  `}
`

const LastActivityArea = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.5rem;
`

const LastActivityDivisor = styled.div`
  ${({ theme: { colors, fontSizes, breakpoints } }) => `
    font-size: ${fontSizes.normalFontSize};
    color: ${colors.textWhite};
    border-bottom: solid 1px;
    border-color: rgba(224, 192, 255, 0.5);
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem;

    @media (max-width: ${breakpoints.sm}) {
      font-size: ${fontSizes.smallFontSize};
    }
  `}
`

const LastActivityItem = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  align-items: center;
  width: 35%;
`

const LastActivityText = styled.strong`
  ${({ theme: { colors } }) => `
    color: ${colors.lightPurple};
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  `}
`

const LastActivityData = styled.span`
  ${({ theme: { colors } }) => `
    color: ${colors.textWhite};
    cursor: pointer;
    font-weight: 300;

    &:hover {
      text-decoration: underline;
    }
  `}
`

const LastActivityTime = styled.span`
  font-weight: 300;
`

const LastActivityImage = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`

const GenrePlayArea = styled.div`
  ${({ theme: { breakpoints } }) => `
      display: flex;
      width: 70%;
      flex-direction: column;
      gap: 0.5rem;

      @media (max-width: ${breakpoints.xmd}) {
        width: 100%;
      }
  `}
`

const GenreOverviewArea = styled.div`
  ${({ theme: { breakpoints } }) => `
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 1.25rem;
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
      border: solid 1px;
      border-color: rgba(224, 192, 255, 0.5);
      box-shadow: 0 8px 8px rgba(0, 0, 0, 0.1);

      @media (max-width: ${breakpoints.sm}) {
        flex-wrap: wrap;
        gap: 1rem;
      }
  `}
`

const GenreDivisor = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
  align-items: center;
  justify-content: center;
`

const GenreBox = styled.div`
  ${({ theme: { colors, fontSizes, breakpoints } }) => `
    color: ${colors.textWhite};
    font-size: ${fontSizes.normalFontSize};
    border-radius: 5px;
    background-color: ${colors.darkPurple};
    padding: 0.3rem 1rem;
    font-weight: 400;

    @media (max-width: ${breakpoints.lg}) {
      font-size: ${fontSizes.smallFontSize};
    }
  `}
`

const GenreEntries = styled.span`
  ${({ theme: { colors, fontSizes, breakpoints } }) => `
    color: ${colors.lightPurple};
    font-size: ${fontSizes.normalFontSize};
    font-weight: 400;

    @media (max-width: ${breakpoints.lg}) {
      font-size: ${fontSizes.smallFontSize};
    }
  `}
`

const PlaylistArea = styled.div`
  ${({ theme: { breakpoints } }) => `
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    margin-top: 0.5rem;

    @media (max-width: ${breakpoints.sm}) {
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }
  `}
`

const PlaylistBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const Playlist = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 10px;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`

const FavoritesArea = styled.div`
  ${({ theme: { breakpoints } }) => `
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    @media (max-width: ${breakpoints.md}) {
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: center;
    }

    @media (min-width: 769px) and (max-width: ${breakpoints.xl}) {
      flex-wrap: wrap;
      gap: 1rem;
      justify-content: start;
    }
  `}
`

const FavoritesBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
  justify-content: center;
`

const Favorite = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
`

const TopGrid = styled.div`
  ${({ theme: { breakpoints } }) => `
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 0;
    width: 100%;

    @media (max-width: ${breakpoints.xmd}) {
      grid-template-columns: repeat(5, 1fr);
    }

    @media (max-width: ${breakpoints.sm}) {
      grid-template-columns: repeat(2, 1fr);
    }
  `}
`

const TopItem = styled.div`
  cursor: pointer;
  position: relative;
`

const TopImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(0.5);
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 0.7;
  }
`

const TopDescription = styled.div`
  ${({ theme: { fontSizes, breakpoints } }) => `
    display: flex;
    flex-direction: column;
    gap: 0.2rem;
    position: absolute;
    bottom: 20px;
    left: 20px;
    font-size; ${fontSizes.normalFontSize};

    @media (max-width: ${breakpoints.sm}) {
      font-size: ${fontSizes.smallFontSize};
    }

    @media (min-width: ${breakpoints.sm}) and (max-width: ${breakpoints.xmd}) {
      font-size: ${fontSizes.smallestFontSize};
    }
  `}
`

const Home = ({ user }: { user: User | null }) => {

  return (
    <>
      <Banner user={user} />
      <Container>

        <ActivityArea>
          <ActivityStats>
            <ActivityItem aria-label="Total Songs">
              <MetricValue>
                999
              </MetricValue>
              <MetricLabel>
                Total Songs
              </MetricLabel>
            </ActivityItem>

            <ActivityItem aria-label="Days Listened">
              <MetricValue>
                99.9
              </MetricValue>
              <MetricLabel>
                Days Listened
              </MetricLabel>
            </ActivityItem>

            <ActivityItem aria-label="Mean Score">
              <MetricValue>
                99.9
              </MetricValue>
              <MetricLabel>
                Mean Score
              </MetricLabel>
            </ActivityItem>
          </ActivityStats>
        </ActivityArea>

        <HomeSectionRow>
          <LastActivityArea>
            <h2>Activity</h2>

            <LastActivityDivisor>

              <LastActivityItem>
                <LastActivityImage src={MusicImage} alt="" />
                <span>Plans to listen <LastActivityText>Song name</LastActivityText></span>
              </LastActivityItem>

              <LastActivityData>Artist name</LastActivityData>

              <LastActivityTime>1 day ago</LastActivityTime>
            </LastActivityDivisor>

            <LastActivityDivisor>

              <LastActivityItem>
                <LastActivityImage src={MusicImage} alt="" />
                <span>Completed <LastActivityText>Song name</LastActivityText></span>
              </LastActivityItem>

              <LastActivityData>Artist name</LastActivityData>

              <LastActivityTime>1 day ago</LastActivityTime>
            </LastActivityDivisor>

            <LastActivityDivisor>

              <LastActivityItem>
                <LastActivityImage src={MusicImage} alt="" />
                <span>Dropped <LastActivityText>Song name</LastActivityText></span>
              </LastActivityItem>

              <LastActivityData>Artist name</LastActivityData>

              <LastActivityTime>1 day ago</LastActivityTime>
            </LastActivityDivisor>

            <LastActivityDivisor>

              <LastActivityItem>
                <LastActivityImage src={MusicImage} alt="" />
                <span>Listened <LastActivityText>Song name</LastActivityText></span>
              </LastActivityItem>

              <LastActivityData>Artist name</LastActivityData>

              <LastActivityTime>1 day ago</LastActivityTime>
            </LastActivityDivisor>
          </LastActivityArea>

          <GenrePlayArea>
            <h2>Genre overview</h2>

            <GenreOverviewArea>
              <GenreDivisor>
                <GenreBox>
                  Metal
                </GenreBox>
                <GenreEntries><strong>999</strong> Entries</GenreEntries>
              </GenreDivisor>

              <GenreDivisor>
                <GenreBox>
                  Pop
                </GenreBox>
                <GenreEntries><strong>999</strong> Entries</GenreEntries>
              </GenreDivisor>

              <GenreDivisor>
                <GenreBox>
                  K-Pop
                </GenreBox>
                <GenreEntries><strong>999</strong> Entries</GenreEntries>
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