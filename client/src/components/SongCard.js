import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { song, index } = props;
    const [draggedTo, setDraggedTo] = useState(false);
    let cardClass = "list-card unselected-list-card";
    let itemClass = "";

    function handleDeleteSong(event) {
        event.stopPropagation();
        let i = event.target.id.substring("remove-song-".length); 
        store.markSongForDelete(i);
    }

    function handleEdit(event) {
        event.stopPropagation();
        let i = event.target.id.slice(event.target.id.indexOf('-')+1, event.target.id.lastIndexOf('-'));
        store.markSongForEdit(i);
    }

    function handleDragStart(event) {
        event.dataTransfer.setData("song", event.target.id);
    }

    function handleDragOver(event) {
        event.preventDefault();
        setDraggedTo(false);
    }
    function handleDragEnter(event) {
        event.preventDefault();
        setDraggedTo(false);

    }
    function handleDragLeave(event) {
        event.preventDefault();
        setDraggedTo(false);
    }
    function handleDrop (event) {
        event.preventDefault();
        let target = event.target;
        let targetId = target.id;
        targetId = targetId.substring(target.id.indexOf("-") + 1, target.id.lastIndexOf("-"));
        let sourceId = event.dataTransfer.getData("song");
        sourceId = sourceId.substring(sourceId.indexOf("-") + 1, target.id.lastIndexOf("-"));

        setDraggedTo(false);

        // ASK THE MODEL TO MOVE THE DATA
        store.addMoveSongTransaction(sourceId, targetId);
    }

    if (draggedTo) {
        itemClass = " playlister-song-dragged-to";
    }
    else {
        itemClass = "";
    }

    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass + itemClass}
            onDoubleClick={handleEdit}
            onDragStart={handleDragStart}
            onDragOver={handleDragOver}
            onDragEnter={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            draggable="true"
        >
            {index + 1}.
            <a
                id={'song-' + index + '-link'}
                className="song-link"
                href={"https://www.youtube.com/watch?v=" + song.youTubeId}>
                {song.title} by {song.artist}
            </a>
            <input
                type="button"
                id={"remove-song-" + index}
                className="list-card-button"
                value={"\u2715"}
                onClick={handleDeleteSong}
            />
        </div>
    );
}

export default SongCard;