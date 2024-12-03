export default function Results({data, save}) {
    return !data ? <div></div> : Object.prototype.toString.apply(data.results) == "[object Array]" ?
    (<ul className="resultList">
    {data.results.map((item, index) => (
        (item.wrapperType == "track" ?
        <li className="card" key={index}>
            <img src={item.artworkUrl60} />
            <p>{item.trackName}</p>
            <p>{item.collectionName}, {item.primaryGenreName}</p>
            <p>{item.artistName}</p>
            <button onClick={() => save(item)}>Save</button>
        </li> : item.wrapperType == "artist" ?
        <li className="card" key={index}>
            <p>{item.artistName}</p>
            <button onClick={() => save(item)}>Save</button>
        </li> : item.wrapperType == "collection" ?
        <li className="card" key={index}>
            <img src={item.artworkUrl60} />
            <p>{item.collectionName}</p>
            <p>{item.artistName}</p>
            <p>{item.primaryGenreName}</p>
            <button onClick={() => save(item)}>Save</button>
        </li> :
        ""
        )))}
    </ul>) :
    ""
    }
    // (data.results[0].wrapperType == "track" ?
    // <ul className="songList">
    //     {data.results.map((item, index) => (
    //     <li className="card" key={index}>
    //         <img src={item.artworkUrl60} />
    //         <p>{item.trackName}</p>
    //         <p>{item.collectionName}, {item.primaryGenreName}</p>
    //         <p>{item.artistName}</p>
    //         <button>Save</button>
    //     </li>
    //     ))}
    // </ul> : data.results[0].wrapperType == "artist" ? 
    // <ul className="artistList">
    // {data.results.map((item, index) => (
    //     <li className="card" key={index}>
    //         <p>{item.artistName}</p>
    //         <button>Save</button>
    //     </li>
    //     ))}
    // </ul> : data.results[0].wrapperType == "collection" ? 
    // <ul className="albumList">
    // {data.results.map((item, index) => (
    //     <li className="card" key={index}>
    //         <img src={item.artworkUrl60} />
    //         <p>{item.collectionName}</p>
    //         <p>{item.artistName}</p>
    //         <p>{item.primaryGenreName}</p>
    //         <button onClick={() => save(item)}>Save</button>
    //     </li>
    //     ))}
    // </ul> :
    // "") :
    // ""