import AddSong_Transaction from '../transactions/AddSong_Transaction.js';
import DeleteSong_Transaction from '../transactions/DeleteSong_Transaction.js';
import EditSong_Transaction from '../transactions/EditSong_Transaction.js';
import MoveSong_Transaction from '../transactions/MoveSong_Transaction.js';

import { createContext, useState } from 'react'
import jsTPS from '../common/jsTPS'
import api from '../api'
export const GlobalStoreContext = createContext({});

/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    DELETE_LIST: "DELETE_LIST",
    TOGGLE_DELETE_LIST_MODAL: "TOGGLE_DELETE_LIST_MODAL",
    MARK_SONG_FOR_DELETION: "MARKED_SONG_FOR_DELETION",
    TOGGLE_DELETE_SONG_MODAL: "TOGGLE_DELETE_SONG_MODAL",
    UPDATE_MARKEDINDEX: "UPDATE_MARKEDINDEX",
    UPDATE_MARKEDINFO: "UPDATE_MARKEDINFO",
    MARK_SONG_FOR_EDIT: "MARK_SONG_FOR_EDIT",
    TOGGLE_EDIT_SONG_MODAL: "TOGGLE_EDIT_SONG_MODAL"
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
export const useGlobalStore = () => {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        idNamePairs: [],
        currentList: null,
        newListCounter: 0,
        markedId: "",
        deleteListModalOpen: false,
        deleteSongModalOpen: false,
        editSongModalOpen: false,
        editListName: false,
        markedIndex: -1,
        markedInfo: null,
        listNameActive: false
    });

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {
            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    idNamePairs: payload.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    markedId: store.markedId,
                    deleteListModalOpen: false,
                    deleteSongModalOpen: false,
                    editSongModalOpen: false,
                    editListName: false,
                    markedIndex: store.markedIndex,
                    markedInfo: store.markedInfo,
                    listNameActive: false
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    markedId: store.markedId,
                    deleteListModalOpen: false,
                    deleteSongModalOpen: false,
                    editSongModalOpen: false,
                    editListName: false,
                    markedIndex: store.markedIndex,
                    markedInfo: store.markedInfo,
                    listNameActive: false
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter + 1,
                    markedId: store.markedId,
                    deleteListModalOpen: false,
                    deleteSongModalOpen: false,
                    editSongModalOpen: false,
                    editListName: false,
                    markedIndex: store.markedIndex,
                    markedInfo: store.markedInfo,
                    listNameActive: false
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    idNamePairs: payload,
                    currentList: null,
                    newListCounter: store.newListCounter,
                    markedId: store.markedId,
                    deleteListModalOpen: false,
                    deleteSongModalOpen: false,
                    editSongModalOpen: false,
                    editListName: false,
                    markedIndex: store.markedIndex,
                    markedInfo: store.markedInfo,
                    listNameActive: false
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    markedId: payload[0],
                    deleteListModalOpen: payload[2],
                    deleteSongModalOpen: false,
                    editSongModalOpen: false,
                    editListName: false,
                    markedIndex: store.markedIndex,
                    markedInfo: payload[1],
                    listNameActive: false
                }); 
            }
            //DELETE A LIST
            case GlobalStoreActionType.DELETE_LIST: {
                return setStore({
                    idNamePairs: payload,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    markedId: store.markedId,
                    deleteListModalOpen: false,
                    deleteSongModalOpen: false,
                    editSongModalOpen: false,
                    editListName: false,
                    markedIndex: store.markedIndex,
                    markedInfo: store.markedInfo,
                    listNameActive: false
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    newListCounter: store.newListCounter,
                    markedId: payload,
                    deleteListModalOpen: false,
                    deleteSongModalOpen: false,
                    editSongModalOpen: false,
                    editListName: false,
                    markedIndex: store.markedIndex,
                    markedInfo: store.markedInfo,
                    listNameActive: false
                });
            }
            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: payload[0],
                    newListCounter: store.newListCounter,
                    markedId: store.markedId,
                    deleteListModalOpen: false,
                    deleteSongModalOpen: false,
                    editSongModalOpen: false,
                    editListName: payload[1],
                    markedIndex: store.markedIndex,
                    markedInfo: store.markedInfo,
                    listNameActive: true
                });
            }
            case GlobalStoreActionType.TOGGLE_DELETE_LIST_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    markedId: store.markedId,
                    deleteListModalOpen: payload,
                    deleteSongModalOpen: false,
                    editSongModalOpen: false,
                    editListName: false,
                    markedIndex: store.markedIndex,
                    markedInfo: store.markedInfo,
                    listNameActive: store.listNameActive
                });
            }
            case GlobalStoreActionType.TOGGLE_DELETE_SONG_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    markedId: store.markedId,
                    deleteListModalOpen: false,
                    deleteSongModalOpen: payload,
                    editSongModalOpen: false,
                    editListName: false,
                    markedIndex: store.markedIndex,
                    markedInfo: store.markedInfo,
                    listNameActive: store.listNameActive
                });
            }
            case GlobalStoreActionType.TOGGLE_EDIT_SONG_MODAL: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    markedId: store.markedId,
                    deleteListModalOpen: false,
                    deleteSongModalOpen: false,
                    editSongModalOpen: payload,
                    editListName: false,
                    markedIndex: store.markedIndex,
                    markedInfo: store.markedInfo,
                    listNameActive: store.listNameActive
                });
            }
            case GlobalStoreActionType.MARK_SONG_FOR_DELETION: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    markedId: store.markedId,
                    deleteListModalOpen: false,
                    deleteSongModalOpen: payload[2],
                    editSongModalOpen: false,
                    editListName: false,
                    markedIndex: payload[0],
                    markedInfo: payload[1],
                    listNameActive: store.listNameActive
                });
            }
            case GlobalStoreActionType.MARK_SONG_FOR_EDIT: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    markedId: store.markedId,
                    deleteListModalOpen: false,
                    deleteSongModalOpen: false,
                    editSongModalOpen: payload[2],
                    editListName: false,
                    markedIndex: payload[0],
                    markedInfo: payload[1],
                    listNameActive: store.listNameActive
                });
            }
            case GlobalStoreActionType.UPDATE_MARKEDINDEX: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    markedId: store.markedId,
                    deleteListModalOpen: store.deleteListModalOpen,
                    deleteSongModalOpen: store.deleteSongModalOpen,
                    editSongModalOpen: store.editSongModalOpen,
                    editListName: false,
                    markedIndex: payload,
                    markedInfo: store.markedInfo,
                    listNameActive: store.listNameActive
                });
            }
            case GlobalStoreActionType.UPDATE_MARKEDINFO: {
                return setStore({
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    newListCounter: store.newListCounter,
                    markedId: store.markedId,
                    deleteListModalOpen: store.deleteListModalOpen,
                    deleteSongModalOpen: store.deleteSongModalOpen,
                    editSongModalOpen: store.editSongModalOpen,
                    editListName: false,
                    markedIndex: store.markedIndex,
                    markedInfo: payload,
                    listNameActive: store.listNameActive
                });
            }
            default:
                return store;
        }
    }
    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                //console.log(response);
                let playlist = response.data.playlist;
                //console.log(playlist);
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: playlist
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    store.createNewList = function() {
        async function asyncCreateNewList() {
            // MAKE THE NEW LIST
            let newList = {
                "name": "Untitled "+ store.newListCounter,
                "songs": []
            }; 

            const response = await api.createPlaylist(newList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.CREATE_NEW_LIST,
                    payload: response.data.playlist
                });
                store.history.push("/playlist/" + response.data.playlist._id);
            }
        }
        asyncCreateNewList(); 
    }
    
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    store.history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }

    store.deletePlaylist = function() {
        async function asyncDeletePlaylistById() {
            let response = await api.deletePlaylistById(store.markedId);
            if (response.data.success) {
                let response = await api.getPlaylistPairs();
                if (response.data.success) {
                    storeReducer({
                        type: GlobalStoreActionType.DELETE_LIST,
                        payload: response.data.idNamePairs
                    });
                    store.loadIdNamePairs();
                }
            }
        }
        asyncDeletePlaylistById();
    }

    store.markListForDelete = function(id) {
        async function asyncMarkListForDelete(id) {
            const response = await api.getPlaylistById(id);
            if(response.data.success) {
                storeReducer ({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: [response.data.playlist._id, response.data.playlist, true]
                });                
            }
        }
        asyncMarkListForDelete(id);
    }

    store.markSongForDelete = function(index) {
        async function asyncMarkSongForDelete() {
            const response = await api.getPlaylistById(store.currentList._id);
            if(response.data.success) {
                storeReducer ({
                    type: GlobalStoreActionType.MARK_SONG_FOR_DELETION,
                    payload: [index, response.data.playlist, true]
                });                
            }
        }
        asyncMarkSongForDelete();
    }

    store.markSongForEdit = function(index) {
        async function asyncMarkSongForEdit() {
            const response = await api.getPlaylistById(store.currentList._id);
            if(response.data.success) {
                storeReducer ({
                    type: GlobalStoreActionType.MARK_SONG_FOR_EDIT,
                    payload: [index, response.data.playlist.songs[index], true]
                });                
            }
        }
        asyncMarkSongForEdit();
    }

    store.addSong = function() {
        async function asyncAddSong() {
            if(store.currentList) {
                let newSong = {"title": "Untitled", "artist": "Unknown", "youTubeId": "dQw4w9WgXcQ"};
                const response = await api.createSong(store.currentList._id, newSong);
                if(response.data.success) {
                    store.setCurrentList(response.data.playlist._id);
                }
            }
        }
        asyncAddSong();
    }

    store.addSongAt = function() {
        async function asyncAddSongAt() {
            console.log(store);
            const response = await api.createSongAt(store.currentList._id, store.markedIndex, store.markedInfo.songs[store.markedIndex]);
            if(response.data.success) {
                //console.log(response.data.playlist);
                store.setCurrentList(store.currentList._id);
            }
        }
        asyncAddSongAt();
    }

    store.deleteSongAt = function() {
        async function asyncDeleteSongAt() {
            if(store.currentList) {
                let id = store.currentList._id
                let index = store.markedIndex
                const response = await api.removeSongAt(id, index);
                if(response.data.success) {
                    store.setCurrentList(store.currentList._id);
                }
            }
        }
        asyncDeleteSongAt();
    }

    store.editSongAt = function(info) {
        async function asyncEditSongAt() {
            if(store.currentList) {
                //console.log(info);
                //console.log(store);
                const response = await api.editSongAt(store.currentList._id, store.markedIndex, info);
                if(response.data.success) {
                    store.setCurrentList(store.currentList._id);
                    //console.log(store.currentList);
                }
            }
        }
        asyncEditSongAt();
    }

    store.moveSong = function(start, end) {
        async function asyncMoveSong() {
            console.log(start+" " +end);
            const response = await api.moveSong(store.currentList._id, start, end);
            if(response.data.success) {
                store.setCurrentList(store.currentList._id);
            }
        }
        asyncMoveSong();
    }

    store.addAddSongTransaction = function() {
        let transaction = new AddSong_Transaction(store);
        tps.addTransaction(transaction);
        storeReducer ({
            type: GlobalStoreActionType.UPDATE_MARKEDINDEX,
            payload: store.idNamePairs.length+1
        })
    }

    store.addDeleteSongTransaction = function() {
        let transaction = new DeleteSong_Transaction(store);
        tps.addTransaction(transaction);
    }

    store.addEditSongTransaction = function() {
        let transaction = new EditSong_Transaction(store);
        tps.addTransaction(transaction);
    }

    store.addMoveSongTransaction = function(start, end) {
        // storeReducer ({
        //     type: GlobalStoreActionType.UPDATE_MARKEDINDEX,
        //     payload: [start, end]
        // });
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }

    store.toggleModals = function(type, mode) {
        if(type === "delete-list-modal") {
            storeReducer({
                type: GlobalStoreActionType.TOGGLE_DELETE_LIST_MODAL,
                payload: mode
            });
        }
        else if(type === "delete-song-modal") {
            storeReducer({
                type: GlobalStoreActionType.TOGGLE_DELETE_SONG_MODAL,
                payload: mode
            });
        }
        else if(type === "edit-song-modal") {
            storeReducer({
                type: GlobalStoreActionType.TOGGLE_EDIT_SONG_MODAL,
                payload: mode
            }); 
        }
    }

    store.updateMarkedInfo = function(info) {
        storeReducer ({
            type: GlobalStoreActionType.UPDATE_MARKEDINFO,
            payload: info
        });
    }

    store.doHasUndoTransaction = function() {
        return tps.hasTransactionToUndo();
    }

    store.doHasRedoTransaction = function() {
        return tps.hasTransactionToRedo();
    }

    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setListNameActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: [null, true]
        });
    }

    // THIS GIVES OUR STORE AND ITS REDUCER TO ANY COMPONENT THAT NEEDS IT
    return { store, storeReducer };
}