
import Banner from '../../components/Banner'
import { Container } from '../../components/Container'
import { User } from '../../types/UserTypes'

const Home = ({ user }: { user: User | null }) => {
  return (
    <>
      <Banner user={user} />
      <Container>
        <h1>Home</h1>
      </Container>
    </>
  )
}

export default Home