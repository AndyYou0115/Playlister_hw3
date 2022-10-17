import React, { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'

function SongCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { song, index } = props;
    let cardClass = "list-card unselected-list-card";

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

    return (
        <div
            key={index}
            id={'song-' + index + '-card'}
            className={cardClass}
            onDoubleClick={handleEdit}
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