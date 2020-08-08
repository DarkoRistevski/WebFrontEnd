import React from "react";
import './Modal.css'

const Modal = (props) => {

    if(props.recipe !== null){
        if(props.showModal == false){

            return (

                <div
                    className="Modal"
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0',
                        width: '80%', left: '10%'
                    }}>

                    {props.children}
                </div>
            )

        } else {
            return (

                <div
                    className="Modal"
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0',
                        backgroundColor: '#ffe6e6'
                    }}>

                    <div className="modalHeader text-center" style={{borderTopLeftRadius: '2rem',borderTopRightRadius: '2rem', backgroundColor:'#ffb3b3'}}>
                        <span onClick={props.hide} style={{cursor: 'pointer'}} className="close pr-3 pt-2">&times;</span>
                        <h3 className="modalHeaderContent text-dark">{props.recipe.title.toUpperCase()}</h3>
                    </div>

                    {props.children}
                </div>

            )
        }

    } else {
        if(props.deleteRecipe){
            return (
                <div
                    className="Modal"
                    style={{
                        transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0',
                        width: '40%', left: '30%'
                    }}>

                    {props.children}
                </div>
            )
        } else {
            return (
                <div></div>
            )
        }

    }



};

export default Modal;