import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { useHistory } from 'react-router-dom'
/*
    This toolbar is a functional React component that
    manages the undo/redo/close buttons.
    
    @author McKilla Gorilla
*/
function EditToolbar() {
    const { store } = useContext(GlobalStoreContext);
    const history = useHistory();
    let canAddSong = "";
    let canUndo = "";
    let canRedo = "";
    let canCloseList = "";

    let enabledButtonClass = "playlister-button";

    function handleUndo() {
        store.undo();
    }
    function handleRedo() {
        store.redo();
    }
    function handleClose() {
        history.push("/");
        store.closeCurrentList();
    }
    let editStatus = false;
    if (store.isListNameEditActive) {
        editStatus = true;
    }

    if(store.deleteListModalOpen || store.deleteSongModalOpen || store.editSongModalOpen) {
        canAddSong = " playlister-button-disabled";
        canUndo = " playlister-button-disabled";
        canRedo = " playlister-button-disabled";
        canCloseList = " playlister-button-disabled";
    }

    if(!store.doHasUndoTransaction()) {
        canUndo = " playlister-button-disabled";
    }

    if(!store.doHasRedoTransaction()) {
        canRedo = " playlister-button-disabled";
    }


    return (
        <span id="edit-toolbar">
            <input
                style={{fontSize: 53}}
                type="button"
                id='add-song-button'
                disabled={editStatus}
                value="+"
                className={enabledButtonClass+canAddSong}
                onClick={() => {store.addAddSongTransaction()}}
            />
            <input
                type="button"
                id='undo-button'
                disabled={editStatus}
                value="⟲"
                className={enabledButtonClass+canUndo}
                onClick={handleUndo}
            />
            <input
                type="button"
                id='redo-button'
                disabled={editStatus}
                value="⟳"
                className={enabledButtonClass+canRedo}
                onClick={handleRedo}
            />
            <input
                type="button"
                id='close-button'
                disabled={editStatus}
                value="&#x2715;"
                className={enabledButtonClass+canCloseList}
                onClick={handleClose}
            />
        </span>);
}

export default EditToolbar;