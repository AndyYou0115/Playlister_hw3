import jsTPS_Transaction from "../common/jsTPS.js"

/**
 * MoveSong_Transaction
 * 
 * This class represents a transaction that works with drag
 * and drop. It will be managed by the transaction stack.
 * 
 * @author McKilla Gorilla
 * @author ?
 */
export default class MoveSong_Transaction extends jsTPS_Transaction {
    constructor(initStore, initStart, initEnd) {
        super();
        this.store = initStore;
        this.start = initStart;
        this.end = initEnd;
    }

    doTransaction() {
        this.store.moveSong(this.start, this.end);
    }
    
    undoTransaction() {
        this.store.moveSong(this.end, this.start);
    }
}