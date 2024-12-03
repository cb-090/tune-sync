import SearchBar from "./SearchBar"
import Results from "./Results"
import { addSong, addArtist, addAlbum } from "../services/databaseService"

export default function Profile( {user, data, search, changeQuery} ) {

    const userSongs = ["360", "Good Luck, Babe!", "Espresso"]
    const userArtists = ["Taylor Swift", "The Weeknd", "Tyler the Creator"]
    const userAlbums = ["Short 'n Sweet", "Hit Me Hard and Soft", "Brat"]

    function save(result) {
        console.log("saving!")
        if (result.wrapperType == "track") {
            console.log(`Saved track ${result.trackId}`)
            // addSong(result)
        }
        if (result.wrapperType == "artist") {
            console.log(`Saved artist ${result.artistId}`)
        }
        if (result.wrapperType == "collection") {
            console.log(`Saved album ${result.collectionId}`)
        }
    }

    return <div className="userProfile">
        <div className="userInfo">
            <img src={user.userPhoto} alt="User's profile picture"></img>
            Hello, {user.username}
        </div>
        <section className="favorites">
        <ul className="songList">
             {userSongs.map((song, index) => (
                <li key={index}>{song}</li>
             ))}
         </ul>
        <ul className="artistList">
            {userArtists.map((artist, index) => (
                <li key={index}>{artist}</li>
             ))}
         </ul>
         <ul className="albumList">
            {userAlbums.map((album, index) => (
                <li key={index}>{album}</li>
             ))}
         </ul>
         </section>
         <div className="searchButtons">
         <button onClick={() => changeQuery("artist")}>Add Artist</button>
         <button onClick={() => changeQuery("song")}>Add Song</button>
         <button onClick={() => changeQuery("album")}>Add Album</button>
         </div>
         <SearchBar action={search} />
         <Results data={data} save={save}/>
    </div>;
}