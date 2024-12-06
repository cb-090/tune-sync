export default function Feed({ profile, songs, artists, albums }) {
    return !profile || !songs || !artists || !albums ? 
    <div className="error">
        <p>Our API is having trouble fetching your songs right now. Please wait before trying again.</p>
    </div> : 
    <div className="feed">
            <h1>{profile.username} is listening to...</h1>
            <section className="playlist">
                <h3>Curated Playlist for {profile.username}</h3>
                <div className="playlistBody">
                    <div className="playlistDesc">
                        {songs.length > 0 && <img src={songs[Math.floor(Math.random() * songs.length)].cover} />}
                        <p className="playlistTitle">hidden gems 💎</p>
                        <p>{profile.username} ⋅ {songs.length} songs</p>
                    </div>
                <ul>
                    {!songs ? "" :
                    songs.map((song, index) => (
                        <li key={index}>
                        <img src={song.cover} />
                        <div>
                            <p>{song.name}</p>
                            <p>{song.artist}</p>
                        </div>
                        <p>{song.album}</p>
                        </li>
                    ))}
                </ul>
                </div>
            </section>
            <section className="topArtists">
                <h3>{profile.username}'s Top Artists</h3>
                <ul>
                    {!artists ? "" :
                    artists.map((artist, index) => (
                        <li key={index}>
                            {index == 0 && <p className="listIcon">👑</p>}
                            {index == 1 && <p className="listIcon">🥈</p>}
                            {index == 2 && <p className="listIcon">🥉</p>} 
                            {index > 2 && <p></p>}
                            <p>{artist.name}</p>
                            <p>{artist.genre}</p>
                        </li>
                    ))}
                </ul>
            </section>
            <section className="topAlbums">
                <h3>Albums {profile.username}'s Been Listening To</h3>
                <ul>
                    {!albums ? "" :
                    albums.map((album, index) => (
                        <li key={index}><img src={album.art}></img>
                            <p>{album.name}</p>
                            <p>{album.artist} - {album.genre}</p>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
}