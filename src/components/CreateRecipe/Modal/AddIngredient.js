import React from "react";

const AddIngredient = (props) => {

        return (

            <div
                className="Modal"
                style={{
                    transform: props.show ? 'translateY(30vh)' : 'translateY(-100vh)',
                    opacity: props.show ? '1' : '0',
                    width: '70%', left: '15%'
                }}>

                {props.children}
            </div>
        )

};

export default AddIngredient;
