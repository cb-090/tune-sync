import { useEffect, useState } from 'react'
import { useAuthentication, loggedInUserDisplayName, loggedInUserProfilePhoto, loggedInUserId } from '../services/authService.js'
import { addUser, fetchUsers, addSong, addArtist, addAlbum, fetchSongs, fetchArtists, fetchAlbums } from "../services/databaseService.js"

import Header from './Header.jsx'
import Users from './Users.jsx'
import Feed from './Feed.jsx'
import UserProfile from './UserProfile.jsx'
import Results from "./Results.jsx"
import SearchBar from "./SearchBar.jsx"
import Home from "./Home.jsx"

import '../App.css'

export default function App() {

  const [editing, setEditing] = useState(false)
  const [browsing, setBrowsing] = useState(false)
  const [searchData, setSearchData] = useState({})
  const [query, setQuery] = useState("")
  const [queryType, setQueryType] = useState("")
  
  const [profile, setProfile] = useState(null)
  const [userList, setUserList] = useState([])

  const [songs, setSongs] = useState([])
  const [artists, setArtists] = useState([])
  const [albums, setAlbums] = useState([])

  const user = useAuthentication()

  async function save(result) {
    console.log("saving!")
    if (result.wrapperType == "track") {
        console.log(`Saved track ${result.trackId}`)
        addSong(result).then(() => {fetchProfile(profile)})
    }
    if (result.wrapperType == "artist") {
        console.log(`Saved artist ${result.artistId}`)
        addArtist(result).then(() => {fetchProfile(profile)})
    }
    if (result.wrapperType == "collection") {
        console.log(`Saved album ${result.collectionId}`)
        addAlbum(result).then(() => {fetchProfile(profile)})
    }
  }

  function setHome() {
    setEditing(false)
    setBrowsing(false)
  }

  async function switchProfileTo(profile) {
    console.log("switching profile")
    setProfile(profile)
    fetchProfile(profile).then(() => {
      setBrowsing(true)
      setEditing(false)
    })
  }
  
  function editProfile() {
    setEditing(true)
    setBrowsing(false)
    addUser(loggedInUserId(), loggedInUserDisplayName(), loggedInUserProfilePhoto()).then(setProfile)
  }

  async function fetchSongById(id) {
    if (id) {
      const url = `https://itunes.apple.com/lookup?id=${id}&entity=song`
      return fetch(url).then((r) => r.json()).then((r) => [r.results[0].trackName, r.results[0].artistName, r.results[0].artworkUrl100, r.results[0].collectionName])
    }
  }

  async function fetchArtistById(id) {
    if (id) {
      const url = `https://itunes.apple.com/lookup?id=${id}&entity=musicArtist`
      return fetch(url).then((r) => r.json()).then((r) => [r.results[0].artistName, r.results[0].primaryGenreName])
    }
  }

  async function fetchAlbumById(id) {
    if (id) {
      const url = `https://itunes.apple.com/lookup?id=${id}&entity=album`
      return fetch(url).then((r) => r.json()).then((r) => [r.results[0].collectionName, r.results[0].artistName, r.results[0].artworkUrl100, r.results[0].primaryGenreName])
    }
  }

  async function fetchProfile(profile) {
    await fetchSongs(profile.userId).then(async (songs) => {
      for (let song of songs) {
        let [songName, artistName, albumCover, albumName] = await fetchSongById(song.trackId)
        song.name = songName
        song.artist = artistName
        song.cover = albumCover
        song.album = albumName
      }
      setSongs(songs);
    })
    await fetchArtists(profile.userId).then(async (artists) => {
      for (let artist of artists) {
        let [artistName, primaryGenre] = await fetchArtistById(artist.artistId)
        artist.name = artistName
        artist.genre = primaryGenre
      }
      setArtists(artists);
    })
    await fetchAlbums(profile.userId).then(async (albums) => {
      for (let album of albums) {
        let [albumName, artistName, albumCover, primaryGenre] = await fetchAlbumById(album.collectionId)
        album.name = albumName
        album.artist = artistName
        album.art = albumCover
        album.genre = primaryGenre
      }
      setAlbums(albums);
    })
  }

  useEffect(() => {
    async function logInUser() {
      if (user) {
        console.log("signing in")
        addUser(loggedInUserId(), loggedInUserDisplayName(), loggedInUserProfilePhoto()).then(setProfile)
        fetchUsers().then(setUserList)
        setHome()
      }
      else {
        console.log("signing out")
        fetchUsers().then(setUserList)
        setHome()
      }
  }
  logInUser()
  }, [user])

  useEffect(() => {
  if (profile) {
    fetchProfile(profile)
  }
  }, [profile])

  useEffect(() => {
    if (query && queryType) {
      const encodedQuery = encodeURIComponent(query.toLowerCase());
      let url = ""
      if (queryType == "song") {
          url = `https://itunes.apple.com/search?term=${encodedQuery}&entity=song&limit=25`;
        }
      else if (queryType == "artist") {
          url = `https://itunes.apple.com/search?term=${encodedQuery}&entity=musicArtist&limit=25`;
        }
      else if (queryType == "album") {
          url = `https://itunes.apple.com/search?term=${encodedQuery}&entity=album&limit=25`;
        }
      fetch(url)
        .then((r) => r.json())
        .then((r) => setSearchData(r))
        .catch((e) => setSearchData(`${e}`));
      }}, [query, queryType]);

  return (
    <div className="App">
      <Header user={user} edit={editProfile} home={setHome} />
      <Users switchProfileTo={switchProfileTo} users={userList}/>
      {editing ?
      <div className="profile">
        <UserProfile profile={profile} songs={songs} artists={artists} albums={albums} />
        <SearchBar action={setQuery} selectOption={setQueryType} />
        <Results data={searchData} save={save}/>
      </div> :
      browsing ? <Feed profile={profile} songs={songs} artists={artists} albums={albums} /> :
      <Home />}
    </div>
  )
}
