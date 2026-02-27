import { useEffect, useMemo, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../../services/firebase'
import {
  COLORS,
  Container,
  CountText,
  FooterText,
  PercentText,
  Pill,
  ProgressBarWrapper,
  Row,
  Segment,
  StatusCard,
} from './StatsDistribution.styles'

interface Props {
  itemId: string
  showTitle?: boolean
}

type StatusKey = 'completed' | 'planning' | 'dropped'

const STATUS_CONFIG: { key: StatusKey; label: string; color: string }[] = [
  { key: 'completed', label: 'Completed', color: COLORS.completed },
  { key: 'planning', label: 'Planning', color: COLORS.planning },
  { key: 'dropped', label: 'Dropped', color: COLORS.dropped },
]

export default function StatusDistributionGlobal({ itemId, showTitle = true }: Props) {
  const [counts, setCounts] = useState<Record<StatusKey, number>>({ completed: 0, planning: 0, dropped: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!itemId) return

    const ref = doc(db, 'globalStats', itemId)

    const unsub = onSnapshot(
      ref,
      snap => {
        if (snap.exists()) {
          const data = snap.data()
          setCounts({
            completed: Math.max(0, Number(data.completed || 0)),
            planning: Math.max(0, Number(data.planning || 0)),
            dropped: Math.max(0, Number(data.dropped || 0)),
          })
        } else {
          setCounts({ completed: 0, planning: 0, dropped: 0 })
        }
        setLoading(false)
      },
      err => {
        console.error(err)
        setLoading(false)
      }
    )

    return () => unsub()
  }, [itemId])

  const total = counts.completed + counts.planning + counts.dropped
  const safeTotal = total || 1

  const percentages = useMemo(
    () => ({
      completed: (counts.completed / safeTotal) * 100,
      planning: (counts.planning / safeTotal) * 100,
      dropped: (counts.dropped / safeTotal) * 100,
    }),
    [counts, safeTotal]
  )

  return (
    <Container>
      {showTitle && <h4>Status Distribution</h4>}

      <Row>
        {STATUS_CONFIG.map(({ key, label, color }) => (
          <StatusCard key={key}>
            <Pill bg={color}>{label}</Pill>
            <CountText><strong>{counts[key]}</strong>Users</CountText>
            <PercentText>{percentages[key].toFixed(0)}%</PercentText>
          </StatusCard>
        ))}
      </Row>

      <ProgressBarWrapper>
        <Segment width={`${percentages.completed}%`} color={COLORS.completed} />
        <Segment width={`${percentages.planning}%`} color={COLORS.planning} />
        <Segment width={`${percentages.dropped}%`} color={COLORS.dropped} />
      </ProgressBarWrapper>

      <FooterText>{loading ? 'Loading stats...' : `${total} users tracked`}</FooterText>
    </Container>
  )
}

