import React, { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function EditSongModal() {
    const { store } = useContext(GlobalStoreContext);
    let song = {"_id": "", "title": "", "artist": "", "youTubeId": ""};

    if (store.markedInfo !== null) {
        if(typeof store.markedInfo === 'undefined') {
            song = {"_id": "", "title": "", "artist": "", "youTubeId": ""};
        }
        else {
            song = store.markedInfo; 
        }
    }
    
    function handleChange(event) {
        let newSong = {"_id": song._id, "title": song.title, "artist": song.artist, "youTubeId": song.youTubeId};
        if(event.target.id === "title") {
            newSong.title = event.target.value;
        } else if(event.target.id === "artist") {
            newSong.artist = event.target.value;
        } else if(event.target.id === "you-tube-id") {
            newSong.youTubeId = event.target.value;
        }
        store.updateMarkedInfo(newSong);
    }
        return (
            <div 
                className={store.editSongModalOpen?"modal is-visible":"modal"}
                id="edit-song-modal" 
                data-animation="slideInOutLeft">
                    <div className="modal-root" id='verify-edit-song-root'>
                        <div className="modal-north">
                            Edit song
                        </div>
                        <div className="modal-center">
                            <span style={{fontSize:30, height:30, width:200}}>Title:</span> 
                            <input style={{fontSize:30}} type="text" id="title" value={song.title} onChange={handleChange}/> 
                            <span style={{fontSize:30, height:30, width:200}}>Artist:</span>  
                            <input style={{fontSize:30}} type="text" id="artist" value={song.artist} onChange={handleChange}/>                        
                            <span style={{fontSize:30, height:30, width:200}}>You Tube Id:</span>  
                            <input style={{fontSize:30}} type="text" id="you-tube-id" value={song.youTubeId} onChange={handleChange}/>
                        </div>
                        <div className="modal-south">
                            <input type="button" 
                                id="edit-song-confirm-button" 
                                className="modal-button" 
                                onClick={() => {store.addEditSongTransaction()}}
                                value='Confirm' />
                            <input type="button" 
                                id="edit-song-cancel-button" 
                                className="modal-button" 
                                onClick={() => {store.toggleModals("edit-song-modal", false)}}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
} 
export default EditSongModal;