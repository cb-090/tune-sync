import { useState } from "react";

export default function SearchBar({action}) {
    const [content, setContent] = useState("");

    function submit(e) {
      e.preventDefault();
      action(content);
      setContent("");
    }

    return <form onSubmit={submit} className="searchBar">
        <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
        <button>Search</button>
    </form>
}