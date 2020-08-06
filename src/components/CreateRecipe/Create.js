import React, {Component} from "react";
import logo from "../../images/logo3.png";
import './Create.css'
import recipeService from '../../repository/recipesRepository'
import { withRouter } from "react-router-dom";

class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            image: null
        }

    }

    fileChangedHandler = (e) => {
        if (e.target.files.length) {
            this.setState({image: e.target.files[0]});
        }
    };

    onSubmitHandler = (e) => {
        e.preventDefault();

        if(this.isFormValid(e)){

            const recipeData = {
                title: e.target.title.value,
                ingredients: e.target.ingredients.value,
                instructions: e.target.instructions.value
            };

            const formData = new FormData();
            formData.append("recipeData", JSON.stringify(recipeData));
            formData.append("image", this.state.image);

            recipeService.createRecipe(formData).then((response) => {
                this.props.history.push("/recipes");
            });

        }

    };

    redirectToHomePage = () => {
        this.props.history.push("/recipes");
    };

    isFormValid = (e) => {

        var flag = true;

        if(e.target.title.value == ""){
            document.getElementById("inputTitle").classList.add("invalidBorder");
            flag = false;
        } else {
            document.getElementById("inputTitle").classList.remove("invalidBorder");
        }

        if(e.target.image.value == ""){
            document.getElementById("inputImage").classList.add("invalidBorder");
            flag = false;
        } else {
            document.getElementById("inputImage").classList.remove("invalidBorder");
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

    render() {

        return (

            <div id="create">

                <div className="container">
                    <div className="row">
                        <div className="mx-auto ok">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <div>
                                        <img src={logo} width="50px" height="50px" alt="" className="logoImage"/>
                                        <i className="h3 pt-2 studentText"><i
                                            className="helperText text-primary">1M</i>Recipes</i>
                                    </div>
                                    <hr>
                                    </hr>
                                    <form className="form-create mt-4" onSubmit={this.onSubmitHandler}>
                                        <div className="form-group row">
                                            <div className="col-sm-6">
                                                <div className="row">
                                                    <label className="col-sm-4 col-form-label"
                                                           htmlFor="inputTitle">Title</label>
                                                    <div className="col-sm-8">
                                                        <input type="text" id="inputTitle" className="form-control"
                                                               placeholder="Title" name="title" autoFocus/>

                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-sm-5" id="inputImage">
                                                <input type="file" className="custom-file-input" id="customFile"
                                                       accept="image/*" name="image"
                                                       onChange={this.fileChangedHandler}
                                                />
                                                <label className="custom-file-label"
                                                       htmlFor="customFile">{this.state.image === null ? "Find Image" : this.state.image.name}</label>
                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label"
                                                   htmlFor="inputIngredients">Ingredients</label>
                                            <div className="col-sm-10">
                                            <textarea className="form-control" id="inputIngredients"
                                                      rows="5" name="ingredients"
                                                      placeholder="Separate ingredients with ',' " />

                                            </div>
                                        </div>

                                        <div className="form-group row">
                                            <label className="col-sm-2 col-form-label"
                                                   htmlFor="inputInstructions">Instructions</label>
                                            <div className="col-sm-10">
                                            <textarea className="form-control" id="inputInstructions"
                                                      rows="5" name="instructions"
                                                      placeholder="Enter Instructions" />

                                            </div>
                                        </div>

                                        <br/>

                                        <div className="row pb-2">

                                            <div className="offset-2 col-4">
                                                <button
                                                    className="btn btn-lg btn-block text-uppercase btn-success"
                                                    type="submit"
                                                    id="addRecipe">ADD
                                                </button>
                                            </div>

                                            <div className="col-4">
                                                <button
                                                    className="btn btn-lg btn-block text-uppercase btn-danger"
                                                    type="button"
                                                    onClick={this.redirectToHomePage}
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

export default withRouter(Create);