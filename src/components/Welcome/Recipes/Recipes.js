import React, {Component} from "react";
import recipe1 from "../../../images/recipe1.jpg";
import recipe4 from "../../../images/recipe4.jpeg";
import recipe3 from "../../../images/recipe3.jpeg";
import CardRecipe from "./CardRecipe";
import Cookie from "js-cookie";
import recipesService from "../../../repository/recipesRepository";

class Recipes extends Component{

    constructor(props) {
        super(props);

    }


    render(){

        return(

                <div style={{height: '58%'}}>
                <div className="container">
                    <div className="row" style={{height: '100px', marginTop: '5%'}}>

                        <CardRecipe clickEdit={this.props.clickEdit} click={this.props.click} deleteRecipe={this.props.deleteRecipe} image={recipe1} recipe={this.props.recipe1}/>
                        <CardRecipe clickEdit={this.props.clickEdit} click={this.props.click} deleteRecipe={this.props.deleteRecipe} image={recipe4} recipe={this.props.recipe2}/>
                        <CardRecipe clickEdit={this.props.clickEdit} click={this.props.click} deleteRecipe={this.props.deleteRecipe} image={recipe3} recipe={this.props.recipe3}/>

                    </div>
                </div>

            </div>

        )

    }

}

export default Recipes;