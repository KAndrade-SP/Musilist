
import Banner from '../../components/Banner'
import { Container } from '../../components/Container'
import { User } from '../../types/UserTypes'

const SongList = ({ user }: { user: User | null }) => {
  return (
    <>
      <Banner user={user} />
      <Container>
        <h1>Song List</h1>
      </Container>
    </>
  )
}

export default SongList