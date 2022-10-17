import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import ListCard from './ListCard.js'
import { GlobalStoreContext } from '../store'
/*
    This React component lists all the playlists in the UI.
    
    @author McKilla Gorilla
*/
const ListSelector = () => {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    let canAddList = "";

    useEffect(() => {
        store.loadIdNamePairs();
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    
    let listCard = "";
    if (store) {
        listCard = store.idNamePairs.map((pair) => (
            <ListCard
                key={pair._id}
                idNamePair={pair}
                selected={false}
            />
        ))
    }

    if(store.deleteListModalOpen){
        canAddList = " playlister-button-disabled";
    } else {
        canAddList = "";
    }

    return (
        <div id="playlist-selector">
            <div id="list-selector-list">
            <div id="playlist-selector-heading" style={{fontSize: 48}}>
                <input
                    type="button"
                    id="add-list-button"
                    onClick={handleCreateNewList}
                    className={"playlister-button"+canAddList}
                    value="+" />
                &nbsp;&nbsp;&nbsp;Your Lists
            </div> 
                {listCard}
            </div>
        </div>)
}

export default ListSelector;