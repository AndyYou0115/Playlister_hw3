import React, { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function DeleteSongModal() {
        const { store } = useContext(GlobalStoreContext);
        let name = "";

        if (store.markedInfo !== null) {
            if(typeof store.markedInfo.songs === 'undefined' || store.markedIndex < 0 || store.markedInfo.songs.length <= 0) {
                if(typeof store.markedInfo.songs[store.markedIndex] === 'undefined') {
                    name = "";
                }
                else {
                    name = store.markedInfo.songs[store.markedIndex].title;
                }
            }
        }

        return (
            <div 
                className={store.deleteSongModalOpen?"modal is-visible":"modal"} 
                id="delete-song-modal"
                data-animation="slideInOutLeft">
                    <div className="modal-root" id='verify-delete-song-root'>
                        <div className="modal-north">
                            Delete song?
                        </div>
                        <div className="modal-center">
                            <div className="modal-center-content" style={{width:900, height:100, fontSize:40}}>
                                Are you sure you wish to permanently delete the <span>{name}</span> from the playlist?
                            </div>
                        </div>
                        <div className="modal-south">
                            <input type="button" 
                                id="delete-song-confirm-button" 
                                className="modal-button" 
                                onClick={() => {store.addDeleteSongTransaction()}}
                                value='Confirm' />
                            <input type="button" 
                                id="delete-song-cancel-button" 
                                className="modal-button" 
                                onClick={() => {store.toggleModals("delete-song-modal", false)}}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
}
export default DeleteSongModal;