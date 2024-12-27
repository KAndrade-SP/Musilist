import Banner from '../../components/Banner/Banner'
import { Container } from '../../components/Container'
import { User } from '../../types/UserTypes'

const Stats = ({ user }: { user: User | null }) => {
  return (
    <>
      <Banner user={user} />
      <Container>
        <h1>Stats</h1>
      </Container>
    </>
  )
}

export default Stats
