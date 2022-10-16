import React, { useContext } from 'react'
import { GlobalStoreContext } from '../store'

function DeleteListModal() {
        const { store } = useContext(GlobalStoreContext);
        let name = "";
        //let clasName = "modal";

        //if(store.deleteListModalOpen){
            //clasName = clasName + " is-visible";
        //}

        if (store.markedInfo !== null) {
            name = store.markedInfo.name;
        }

        return (
            <div 
                className={store.deleteListModalOpen?"modal is-visible":"modal"} 
                id="delete-list-modal"
                data-animation="slideInOutLeft">
                    <div className="modal-root" id='verify-delete-list-root'>
                        <div className="modal-north">
                            Delete playlist?
                        </div>
                        <div className="modal-center">
                            <div className="modal-center-content" style={{width:900, height:100, fontSize:40}}>
                                Are you sure you wish to permanently delete the <span>{name}</span> playlist?
                            </div>
                        </div>
                        <div className="modal-south">
                            <input type="button" 
                                id="delete-list-confirm-button" 
                                className="modal-button" 
                                onClick={() => {store.deletePlaylist()}}
                                value='Confirm' />
                            <input type="button" 
                                id="delete-list-cancel-button" 
                                className="modal-button" 
                                onClick={() => store.toggleModals("delete-list-modal", false)}
                                value='Cancel' />
                        </div>
                    </div>
            </div>
        );
}
export default DeleteListModal;