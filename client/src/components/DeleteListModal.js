import React, { useContext} from 'react'
import { GlobalStoreContext } from '../store'

function DeleteListModal() {
        const { store } = useContext(GlobalStoreContext);
        let name = "";
        let idName = "delete-list-modal"

        if(store.DeleteListModal){
            idName = idName + "is-visible";
        }

        if (store.currentList) {
            name = store.currentList.name;
        }

        return (
            <div 
                class="modal" 
                id={idName}
                data-animation="slideInOutLeft">
                    <div class="modal-root" id='verify-delete-list-root'>
                        <div class="modal-header">
                            Delete playlist?
                        </div>
                        <div class="modal-center">
                            <div class="modal-dialog" style={{width:900, height:100, fontSize:54}}>
                                Are you sure you wish to permanently delete the <span>{name}</span> playlist?
                            </div>
                        </div>
                        <div class="modal-footer">
                            <input type="button" 
                                id="delete-list-confirm-button" 
                                class="modal-button" 
                                onClick={store.deletePlaylist()}
                                value='Confirm' />
                            <input type="button" 
                                id="delete-list-cancel-button" 
                                class="modal-button" 
                                onClick={store.toggleModals("delete-list-modal", false)}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
}
export default DeleteListModal;