export default function Feed({ user, songs, artists, albums }) {
    return <>
    {!user ? "" : <div className="feed">
            <section className="feedHeader">
            <h1>{user.username} is listening to...</h1>
            </section>
            <section className="playlist">
                <h3>Curated Playlist for {user.username}</h3>
                <div className="playlistBody">
                    <div className="playlistDesc">
                    <img src="https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg" />
                    <div>
                        <p className="playlistTitle">hidden gems 💎</p>
                        <p>{user.username} ⋅ {songs.length} songs</p>
                    </div>
                </div>
                <ul>
                    {songs.map((song, index) => (
                        <li key={index}>{song.trackId}</li>
                    ))}
                </ul>
                </div>
            </section>
            <section className="topArtists">
                <h3>{user.username}'s Top Artists</h3>
                <ul>
                    {artists.map((artist, index) => (
                        <li key={index}>{index == 0 && <p className="listIcon">👑</p>} {index == 1 && <p className="listIcon">🥈</p>} {index == 2 && <p className="listIcon">🥉</p>} {artist.artistId}</li>
                    ))}
                </ul>
            </section>
            <section className="topAlbums">
                <h3>Albums {user.username}'s Been Listening To</h3>
                <ul>
                    {albums.map((album, index) => (
                        <li key={index}><img src="https://static.vecteezy.com/system/resources/previews/004/141/669/original/no-photo-or-blank-image-icon-loading-images-or-missing-image-mark-image-not-available-or-image-coming-soon-sign-simple-nature-silhouette-in-frame-isolated-illustration-vector.jpg"></img>{album.collectionId}</li>
                    ))}
                </ul>
            </section>
        </div>
        }
    </>
}