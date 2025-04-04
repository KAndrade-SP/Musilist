import { ListItem } from '../types/UserTypes'
import { doc, collection, setDoc } from 'firebase/firestore'
import { db } from '../services/firebase'
import { v4 as uuidv4 } from 'uuid'

export const addActivityToFeed = async ({
  uid,
  item,
  listType,
}: {
  uid: string
  item: ListItem
  listType: 'completed' | 'planning' | 'dropped'
}) => {
  const feedItem = {
    id: uuidv4(),
    itemId: item.id,
    name: item.name,
    artist: item.artistName,
    image: item.image || '',
    listType,
    type: item.type,
    timestamp: Date.now(),
  }

  const feedRef = doc(collection(db, 'users', uid, 'activityFeed'), feedItem.id)
  await setDoc(feedRef, feedItem)
}
