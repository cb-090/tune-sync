import { db } from "../firebaseConfig"
import { loggedInUserDisplayName, loggedInUserProfilePhoto, loggedInUserId } from '../services/authService.js'
import {
  query,
  doc,
  collection,
  getDocs,
  where,
  setDoc,
  deleteDoc,
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

  const data = { 
    trackId: song.trackId,
    userId,
    date: Timestamp.now() 
  }

  const docRef = await setDoc(doc(db, "songs", `${data.userId}.${data.trackId}`), data)
  
  return true
}

export async function addArtist(artist) {
  console.log("Added artist to database")

  const userId = loggedInUserId()

  const data = { 
    artistId: artist.artistId,
    userId,
    date: Timestamp.now() 
  }

  const docRef = await setDoc(doc(db, "artists", `${data.userId}.${data.artistId}`), data)
  
  return true
}

export async function addAlbum(album) {
  console.log("Added album to database")

  const userId = loggedInUserId()

  const data = { 
    collectionId: album.collectionId,
    userId,
    date: Timestamp.now() 
  }

  const docRef = await setDoc(doc(db, "albums", `${data.userId}.${data.collectionId}`), data)
  
  return true
}

export async function deleteSong(song) {
  const userId = loggedInUserId()

  const docRef = await deleteDoc(doc(db, "songs", `${userId}.${song.trackId}`))
  
  return true
}

export async function deleteArtist(artist) {
  const userId = loggedInUserId()

  const docRef = await deleteDoc(doc(db, "artists", `${userId}.${artist.artistId}`))
  
  return true
}

export async function deleteAlbum(album) {
  const userId = loggedInUserId()

  const docRef = await deleteDoc(doc(db, "albums", `${userId}.${album.collectionId}`))
  
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

export async function fetchSongs(userId) {
  const snapshot = await getDocs(
    query(collection(db, "songs"), where("userId", "==", userId), limit(20))
  )

  return snapshot.docs.map((doc) => ({
    id: doc.data().userId,
    ...doc.data(),
  }))
}

export async function fetchArtists(userId) {
  const snapshot = await getDocs(
    query(collection(db, "artists"), where("userId", "==", userId), limit(20))
  )

  return snapshot.docs.map((doc) => ({
    id: doc.data().userId,
    ...doc.data(),
  }))
}

export async function fetchAlbums(userId) {
  const snapshot = await getDocs(
    query(collection(db, "albums"), where("userId", "==", userId), limit(20))
  )

  return snapshot.docs.map((doc) => ({
    id: doc.data().userId,
    ...doc.data(),
  }))
}

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