import { useState } from "react"

function  Modal({closeModal,children}){
    
    return(

        <div className={"modal-container"}>
            <div className="overlay">

            </div>
            <div className="model-content">
                <div className="header">
                    <button onClick={()=>closeModal(false)}>X</button>
                </div>
                <div className="modal-body">
                    {children}
                </div>
               
            </div>
        </div>
    )

}

export default Modal