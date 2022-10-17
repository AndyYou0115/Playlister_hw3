import jsTPS_Transaction from "../common/jsTPS.js"

/**
 * EditSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class EditSong_Transaction extends jsTPS_Transaction {
    constructor(initStore) {
        super();
        this.store = initStore;
    }

    doTransaction() {
        this.store.editSongAt(this.store.markedInfo);
    }
    
    undoTransaction() {
        this.store.editSongAt(this.store.currentList.songs[this.store.markedIndex]);
    }
}