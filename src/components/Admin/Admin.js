import React, {Component} from "react";
import './Admin.css'

class Admin extends Component {

    delRecipe = () => {
        this.props.deleteRecipe(this.props.recipe.id, this.props.recipe.title);

    };

    edRecipe = () => {
        this.props.editRecipe(this.props.recipe)
    };

    render() {

        return (

            <div className="Admin">

                <div className="firstDiv btn-sm btn-primary" onClick={this.edRecipe}>
                    <span className="fa fa-edit"/>
                </div>

                <div className="btn-sm btn-danger" onClick={this.delRecipe}>
                    <span className="fa fa-trash"/>
                </div>

            </div>

        )

    }

}

export default Admin;