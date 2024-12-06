export default function Results({data, save}) {
    return !data ? <div></div> : 
    Object.prototype.toString.apply(data.results) == "[object Array]" ?
    (<ul className="resultList">
    {data.results.map((item, index) => (
        (item.wrapperType == "track" ?
        <li className="card" key={index}>
            <img src={item.artworkUrl60} />
            <p>{item.trackName}</p>
            <p>{item.collectionName} - {item.primaryGenreName}</p>
            <p>{item.artistName}</p>
            <button onClick={() => save(item)}>Save</button>
        </li> : item.wrapperType == "artist" ?
        <li className="card" key={index}>
            <div></div>
            <p>{item.artistName}</p>
            <div></div>
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