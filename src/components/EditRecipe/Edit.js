import React, {Component} from "react";
import logo from "../../images/logo3.png";
import './Edit.css'
import recipeService from '../../repository/recipesRepository'

class Edit extends Component{

    componentDidMount() {

        document.getElementById("inputTitle").value= this.props.recipe.title;
        this.props.recipe.ingredients.forEach(this.loadIngredients);
        this.props.recipe.instructions.forEach(this.loadInstructions);

    }

    loadIngredients = (item) => {
        document.getElementById("inputIngredients").value += item.trim() + "; ";
    };

    loadInstructions = (item) => {
        document.getElementById("inputInstructions").value += item.trim() + ". ";
    };

    isFormValid = (e) => {

        var flag = true;

        if(e.target.title.value == ""){
            document.getElementById("inputTitle").classList.add("invalidBorder");
            flag = false;
        } else {
            document.getElementById("inputTitle").classList.remove("invalidBorder");
        }

        if(e.target.ingredients.value == ""){
            document.getElementById("inputIngredients").classList.add("invalidBorder");
            flag = false;
        } else {
            document.getElementById("inputIngredients").classList.remove("invalidBorder");
        }

        if(e.target.instructions.value == ""){
            document.getElementById("inputInstructions").classList.add("invalidBorder");
            flag = false;
        } else {
            document.getElementById("inputInstructions").classList.remove("invalidBorder");
        }

        return flag;

    };

    onSubmitHandler = (e) => {
        e.preventDefault();

        if(this.isFormValid(e)){

            const recipeData = {
                id: this.props.recipe.id,
                title: e.target.title.value,
                ingredients: e.target.ingredients.value,
                instructions: e.target.instructions.value
            }

            recipeService.updateRecipe(recipeData).then((response) => {
                this.props.updateRecipes(response.data);
            })

        }

    };

    render() {

        return (

            <div id="create">

                <div className="container">
                    <div className="row">
                        <div className="mx-auto ok">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <div style={{height:'40px', marginTop:"-1%"}}>
                                        <img src={logo} width="50px" height="50px" alt="" className="logoImage"/>
                                        <i className="h3 pt-2 studentText"><i
                                            className="helperText text-primary">1M</i>Recipes</i>
                                    </div>
                                    <hr>
                                    </hr>
                                    <form className="form-create mt-4" onSubmit={this.onSubmitHandler}>
                                        <div className="form-group row">
                                            <div className="col-sm-8">
                                                <div className="row">
                                                    <label className="col-sm-3 col-form-label"
                                                           htmlFor="inputTitle">Title</label>
                                                    <div className="col-sm-7">
                                                        <input type="text" id="inputTitle" className="form-control"
                                                               placeholder="Title" name="title" autoFocus/>

                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label"
                                                   htmlFor="inputIngredients">Ingredients</label>
                                            <div className="col-sm-10">
                                            <textarea className="form-control" id="inputIngredients"
                                                      rows="4" name="ingredients"
                                                      placeholder="Separate ingredients with ',' " />

                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label"
                                                   htmlFor="inputInstructions">Instructions</label>
                                            <div className="col-sm-10">
                                            <textarea className="form-control" id="inputInstructions"
                                                      rows="6" name="instructions"
                                                      placeholder="Enter instructions." />

                                            </div>
                                        </div>

                                        <div id="errorMessage">Invalid Username or Password</div>

                                        <div className="row pb-2">

                                            <div className="offset-2 col-4">
                                                <button
                                                    className="btn btn-lg btn-block text-uppercase btn-success"
                                                    type="submit"
                                                    id="addRecipe">UPDATE
                                                </button>
                                            </div>

                                            <div className="col-4">
                                                <button
                                                    className="btn btn-lg btn-block text-uppercase btn-danger"
                                                    type="button"
                                                    onClick={this.props.hide}
                                                    id="cancelRecipe">CANCEL
                                                </button>
                                            </div>

                                        </div>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );

    }

}

export default Edit;