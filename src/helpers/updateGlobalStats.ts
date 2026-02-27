import { db } from '../services/firebase'
import { doc, runTransaction } from 'firebase/firestore'

type ListType = 'planning' | 'completed' | 'dropped'

export async function updateGlobalStats({
  item,
  previousList,
  newList,
}: {
  item: { id: string; name: string; image: string; type: string }
  previousList: ListType | null
  newList: ListType | null
}) {
  if (previousList && newList && previousList === newList) {
    return
  }

  const ref = doc(db, 'globalStats', item.id)

  await runTransaction(db, async transaction => {
    const snap = await transaction.get(ref)

    const current = snap.exists()
      ? (snap.data() as Partial<Record<ListType, number>>)
      : { planning: 0, completed: 0, dropped: 0 }

    const next = {
      itemId: item.id,
      name: item.name,
      image: item.image,
      type: item.type,
      planning: Math.max(0, Number(current.planning ?? 0)),
      completed: Math.max(0, Number(current.completed ?? 0)),
      dropped: Math.max(0, Number(current.dropped ?? 0)),
    }

    if (previousList) {
      next[previousList] = Math.max(0, next[previousList] - 1)
    }

    if (newList) {
      next[newList] = next[newList] + 1
    }

    transaction.set(ref, next, { merge: true })
  })
}
