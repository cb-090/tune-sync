import { db } from "../firebaseConfig"
import { loggedInUserDisplayName, loggedInUserProfilePhoto, loggedInUserId } from '../services/authService.js'
import {
  query,
  doc,
  collection,
  getDocs,
  where,
  setDoc,
  orderBy,
  limit,
  Timestamp,
} from "firebase/firestore"

export async function addUser() {
  console.log("Added user to database")

  const userId = loggedInUserId()
  const username = loggedInUserDisplayName()
  const userPhoto = loggedInUserProfilePhoto()

  const data = { 
    userId,
    username,
    userPhoto,
    date: Timestamp.now()
  }


  const docRef = await setDoc(doc(db, "users", data.userId), data);
  
  return data
}

export async function addSong(song) {
  console.log("Added song to database")

  const userId = loggedInUserId()
  const userRef = doc(db, "users", userId)

  const data = { 
    trackId: song.trackId,
    userId,
    date: Timestamp.now() 
  }

  await setDoc(doc(db, collection(db, userRef), data.trackId), data)
  
  return true
}

export async function addArtist() {
  console.log("Added artist to database")

  const userId = loggedInUserId()
  const username = loggedInUserDisplayName()
  const userPhoto = loggedInUserProfilePhoto()

  const data = { 
    userId,
    username,
    userPhoto,
    date: Timestamp.now() 
  }

  await setDoc(doc(db, "users", data.userId), data)
  
  return true
}

export async function addAlbum() {
  console.log("Added album to database")

  const userId = loggedInUserId()
  const username = loggedInUserDisplayName()
  const userPhoto = loggedInUserProfilePhoto()

  const data = { 
    userId,
    username,
    userPhoto,
    date: Timestamp.now() 
  }

  await setDoc(doc(db, "users", data.userId), data)
  
  return true
}

export async function fetchUsers() {
  const snapshot = await getDocs(
    query(collection(db, "users"), orderBy("date", "desc"))
  )
  return snapshot.docs.map((doc) => ({
    id: doc.data().userId,
    ...doc.data(),
  }))
}

export async function fetchSongs() {
  const snapshot = await getDocs(
    query(collection(db, "songs"), where("userId", "==", loggedInUserId()), limit(20))
  )
  return snapshot.docs.map((doc) => ({
    id: doc.data().userId,
    ...doc.data(),
  }))
}

// export async function fetchArtists() {
  
// }

// export async function fetchAlbums() {
  
// }

// export async function addUser({ title, body }) {
//   const data = { 
//     title, 
//     body, 
//     date: Timestamp.now() 
//   }
//   const docRef = await addDoc(collection(db, "users"), data)
//   return { id: docRef.id, ...data }
// }

// NOT FINISHED: This only gets the first 20 articles. In a real app,
// you would implement pagination.
// export async function fetchSongs() {
//   const snapshot = await getDocs(
//     query(collection(db, "articles"), orderBy("date", "desc"), limit(20))
//   )
//   return snapshot.docs.map((doc) => ({
//     id: doc.id,
//     ...doc.data(),
//   }))
// }