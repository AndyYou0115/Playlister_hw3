import jsTPS_Transaction from "../common/jsTPS.js"

/**
 * DeleteSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class DeleteSong_Transaction extends jsTPS_Transaction {
    constructor(initStore) {
        super();
        this.store = initStore;
    }

    doTransaction() {
        this.store.deleteSongAt();
    }
    
    undoTransaction() {
        this.store.addSongAt();
    }
}