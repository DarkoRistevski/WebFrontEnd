import React, {Component} from "react";
import './CardRecipe.css'
import Admin from "../../Admin/Admin";
import Cookie from "js-cookie";

class CardRecipe extends Component {

    showFilledModal = () => {
        this.props.click(this.props.recipe)
    };

    checkAuthentication = () => {
        return Cookie.get("token") != null;
    };

    render() {

        return (
            <div className="col" style={{height: '100px'}}>

                {this.checkAuthentication() ? <Admin editRecipe={this.props.clickEdit} recipe={this.props.recipe} deleteRecipe={this.props.deleteRecipe}/> : null}

                <div onClick={this.showFilledModal} className="col" style={{height: '100px'}}>
                    <div className="card w-100 m-0 onHover" style={{cursor: 'pointer'}}>
                        <img className="card-img-top" src={this.props.image} alt="Card image cap"></img>


                        <div className="card-body text-center" style={{height: '80px'}}>
                            <h5>{this.props.recipe.title}</h5>
                        </div>
                    </div>
                </div>
            </div>
        )

    }

}

export default CardRecipe;