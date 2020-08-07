import React, {Component} from "react";
import logo from "../../images/logo3.png";
import './Create.css'
import recipeService from '../../repository/recipesRepository'
import {withRouter} from "react-router-dom";
import AddIngredient from "./Modal/AddIngredient";
import Backdrop from "../UI/Backdrop/Backdrop";

class Create extends Component {

    constructor(props) {
        super(props);

        this.state = {
            image: null,
            showIngredientModal: false,
            showInstructionModal: false,
            ingredients: [],
            instructions: [],
            editIngredient: false,
            changingIngredient: "",
            editInstruction:false,
            changingInstruction: ""
        }

    }

    fileChangedHandler = (e) => {
        if (e.target.files.length) {
            this.setState({image: e.target.files[0]});
        }
    };

    onSubmitHandler = (e) => {
        e.preventDefault();

        if (this.isFormValid(e)) {

            let finalIngredients = "";
            for (let i = 0; i < this.state.ingredients.length; i++) {
                finalIngredients += this.state.ingredients[i] + ";";
            }

            let finalInstructions = "";
            for (let i = 0; i < this.state.instructions.length; i++) {
                finalInstructions += this.state.instructions[i] + ";";
            }

            const recipeData = {
                title: e.target.title.value,
                ingredients: finalIngredients,
                instructions: finalInstructions
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

        if (e.target.title.value == "") {
            document.getElementById("inputTitle").classList.add("invalidBorder");
            flag = false;
        } else {
            document.getElementById("inputTitle").classList.remove("invalidBorder");
        }

        if (e.target.image.value == "") {
            document.getElementById("inputImage").classList.add("invalidBorder");
            flag = false;
        } else {
            document.getElementById("inputImage").classList.remove("invalidBorder");
        }

        if (this.state.ingredients.length == 0) {
            document.getElementById("createIngredients").classList.add("invalidBorder");
            flag = false;
        } else {
            document.getElementById("createIngredients").classList.remove("invalidBorder");
        }

        if (this.state.instructions.length == 0) {
            document.getElementById("createInstructions").classList.add("invalidBorder");
            flag = false;
        } else {
            document.getElementById("createInstructions").classList.remove("invalidBorder");
        }

        return flag;

    };

    showAddIngredientModal = () => {
        this.setState({
            showIngredientModal: true
        })
    };

    closeIngredientModal = () => {
        this.setState({
            showIngredientModal: false,
            editIngredient: false,
            changingIngredient: ""
        });
        document.getElementById("inputIngredient").classList.remove("emptyError");
    };

    showAddInstructionModal = () => {
        this.setState({
            showInstructionModal: true
        })
    };

    closeInstructionModal = () => {
        this.setState({
            showInstructionModal: false,
            editInstruction: false,
            changingInstruction: ""
        });
        document.getElementById("inputInstruction").classList.remove("emptyError");
    };

    addIngredient = () => {

        const ingredient = document.getElementById("inputIngredient").value.trim();
        if (ingredient != "") {

            this.setState({
                ingredients: [...this.state.ingredients, ingredient],
                showIngredientModal: false,
                editIngredient: false
            });
            document.getElementById("inputIngredient").classList.remove("emptyError");
            document.getElementById("inputIngredient").value = "";
        } else {
            document.getElementById("inputIngredient").classList.add("emptyError");
        }
    };

    addInstruction = () => {

        const instruction = document.getElementById("inputInstruction").value.trim();
        if (instruction != "") {

            this.setState({
                instructions: [...this.state.instructions, instruction],
                showInstructionModal: false,
                editInstruction: false
            });
            document.getElementById("inputInstruction").classList.remove("emptyError");
            document.getElementById("inputInstruction").value = "";
        } else {
            document.getElementById("inputInstruction").classList.add("emptyError");
        }

    };

    editIngredient = (e) => {
        e.preventDefault();

        this.showAddIngredientModal();
        this.setState({
            editIngredient: true,
            changingIngredient: e.target.innerText
        });

        document.getElementById("inputIngredient").value = e.target.innerText;

    };

    saveIngredient = () => {
        const newIngredient = document.getElementById("inputIngredient").value;

        this.setState((prevState) => {
            const newIngredientsRef = prevState.ingredients.map((item) => {
                if (item == this.state.changingIngredient) {
                    return newIngredient;
                }
                return item;
            });

            return {
                "ingredients": newIngredientsRef,
                "changingIngredient": "",
                "showIngredientModal": false,
                "editIngredient": false
            }

        });

    };

    deleteIngredient = () => {
        this.setState((prevState) => {
            const newIngredientsRef = prevState.ingredients.map((item) => {
                if (item == this.state.changingIngredient) {
                    return " ";
                } else {
                    return item;
                }

            });

            return {
                "ingredients": newIngredientsRef,
                "changingIngredient": "",
                "showIngredientModal": false,
                "editIngredient": false
            }

        });
    };

    editInstruction = (e) => {
        e.preventDefault();

        this.showAddInstructionModal()
        this.setState({
            editInstruction: true,
            changingInstruction: e.target.innerText
        });

        document.getElementById("inputInstruction").value = e.target.innerText;

    };

    saveInstruction = () => {
        const newInstruction = document.getElementById("inputInstruction").value;

        this.setState((prevState) => {
            const newInstructionsRef = prevState.instructions.map((item) => {
                if (item == this.state.changingInstruction) {
                    return newInstruction;
                }
                return item;
            });

            return {
                "instructions": newInstructionsRef,
                "changingInstruction": "",
                "showInstructionModal": false,
                "editInstruction": false
            }

        });

    };

    deleteInstruction = () => {
        this.setState((prevState) => {
            const newInstructionRef = prevState.instructions.map((item) => {
                if (item == this.state.changingInstruction) {
                    return " ";
                } else {
                    return item;
                }

            });

            return {
                "instructions": newInstructionRef,
                "changingInstruction": "",
                "showInstructionModal": false,
                "editInstruction": false
            }

        });
    };

    showCreateIngredientModal = () => {
        return (
            <div>
                <Backdrop show={this.state.showIngredientModal} hide={this.closeIngredientModal}/>

                <AddIngredient show={this.state.showIngredientModal}>
                    <div style={{padding: "20px"}}>

                        <h3 className="text-primary">Enter Ingredient</h3>
                        <hr/>
                        <input id="inputIngredient" type="text" className="form-control w-75" placeholder="Ingredient"/>

                        {!this.state.editIngredient ?
                            <button onClick={this.addIngredient} type="button" className="btn btn-success btnIng">Add
                            </button>
                            :
                            <button onClick={this.saveIngredient} type="button" className="btn btn-success btnIng">Save
                            </button>
                        }

                        {!this.state.editIngredient ?
                            <button onClick={this.closeIngredientModal} type="button"
                                    className="btn btn-danger btnIng">Cancel
                            </button>
                            :
                            <button onClick={this.deleteIngredient} type="button"
                                    className="btn btn-danger btnIng">Delete
                            </button>
                        }

                    </div>
                </AddIngredient>
            </div>
        )
    };

    showCreateInstructionModal = () => {
        return (
            <div>
                <Backdrop show={this.state.showInstructionModal} hide={this.closeInstructionModal}/>

                <AddIngredient show={this.state.showInstructionModal}>
                    <div style={{padding: "20px"}}>

                        <h3 className="text-primary">Enter Instruction</h3>
                        <hr/>
                        <input id="inputInstruction" type="text" className="form-control w-75"
                               placeholder="Instruction"/>

                        {!this.state.editInstruction ?
                            <button onClick={this.addInstruction} type="button" className="btn btn-success btnIng">Add
                            </button>
                            :
                            <button onClick={this.saveInstruction} type="button" className="btn btn-success btnIng">Save
                            </button>
                        }

                        {!this.state.editInstruction ?
                            <button onClick={this.closeInstructionModal} type="button"
                                    className="btn btn-danger btnIng">Cancel
                            </button>
                            :
                            <button onClick={this.deleteInstruction} type="button"
                                    className="btn btn-danger btnIng">Delete
                            </button>
                        }

                    </div>
                </AddIngredient>
            </div>
        )
    };

    render() {

        return (

            <div id="create">

                {this.showCreateIngredientModal()}
                {this.showCreateInstructionModal()}

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
                                                <ol style={{width: '100%'}}>
                                                    <div id="createIngredients" className="form-control">
                                                        {this.state.ingredients.filter(i => i != " ").map(
                                                            ingredient =>
                                                                <div onClick={this.editIngredient} key={ingredient}
                                                                     className="onHover">
                                                                    <li>{ingredient}</li>
                                                                </div>
                                                        )}
                                                        <div id="ingNotBtn" onClick={this.showAddIngredientModal}>Add
                                                        </div>
                                                    </div>
                                                </ol>

                                            </div>
                                        </div>

                                        <div className="form-group row mb-0">
                                            <label className="col-sm-2 col-form-label"
                                                   htmlFor="inputInstructions">Instructions</label>
                                            <div className="col-sm-10">
                                                <ol style={{width: '100%'}}>
                                                    <div id="createInstructions" className="form-control">
                                                        {this.state.instructions.filter(i => i != " ").map(
                                                            instruction =>
                                                                <div onClick={this.editInstruction} key={instruction}
                                                                     className="onHover">
                                                                    <li>{instruction}</li>
                                                                </div>
                                                        )}
                                                        <div id="insNotBtn" onClick={this.showAddInstructionModal}>Add
                                                        </div>
                                                    </div>
                                                </ol>

                                            </div>
                                        </div>

                                        <br/>

                                        <div className="row pb-1">

                                            <div className="offset-2 col-4">
                                                <button
                                                    className="btn btn-lg btn-block text-uppercase btn-success"
                                                    type="submit"
                                                    id="addRecipe">SAVE
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