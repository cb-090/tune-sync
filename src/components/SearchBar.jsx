import { useState } from "react";

export default function SearchBar({action, selectOption}) {
    const [content, setContent] = useState("");
    const [selected, setSelected] = useState("");

    function submit(e) {
      e.preventDefault();
      action(content);
      setContent("");
    }

    function select(option) {
      setSelected(option);
      selectOption(option);
    }

    return <form onSubmit={submit} className="searchBar">
      <div>
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
        <button>Search</button>
      </div>
      <div className="queryButtons">
        {selected == "song" ? <button disabled title="Already Selected">Add Song</button> :
        <button onClick={() => select("song")}>Add Song</button>
        }
        {selected == "artist" ? <button disabled title="Already Selected">Add Artist</button> :
        <button onClick={() => select("artist")}>Add Artist</button>
        }
        {selected == "album" ? <button disabled title="Already Selected">Add Album</button> :
        <button onClick={() => select("album")}>Add Album</button>
        }
      </div>
    </form>
}