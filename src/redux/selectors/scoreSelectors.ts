import { RootState } from '../store'

export const selectScoreDistribution = (state: RootState) => {
  const lists = state.user.profile?.lists
  if (!lists) return Array.from({ length: 10 }, (_, i) => ({ score: i + 1, count: 0 }))

  const allItems = [...(lists.completed ?? []), ...(lists.planning ?? []), ...(lists.dropped ?? [])]

  const distribution = Array.from({ length: 10 }, (_, i) => ({
    score: i + 1,
    count: 0,
  }))

  allItems.forEach(item => {
    if (item.score && item.score >= 1 && item.score <= 10) {
      distribution[item.score - 1].count += 1
    }
  })

  return distribution
}
