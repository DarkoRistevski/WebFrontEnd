import React, {Component} from "react";
import WelcomeParallax from "./Parallax/WelcomeParallax";
import Recipes from "./Recipes/Recipes";
import Parallax from "./Parallax/Parallax";
import Parallax1Image from "../../images/recipe1.jpg"
import Parallax2Image from "../../images/recipe2.jpeg"
import Parallax3Image from "../../images/recipe3.jpeg"
import Footer from "../Footer/Footer";
import './Welcome.css'
import $ from "jquery";
import recipeService from '../../repository/recipesRepository'
import Modal from '../../components/UI/Modal/Modal'
import Recipe from "../Recipes/Recipe/Recipe";
import Backdrop from "../UI/Backdrop/Backdrop";
import Cookie from 'js-cookie'
import Spinner from 'react-bootstrap/Spinner'
import Edit from "../EditRecipe/Edit";
import DeleteRecipe from "../DeleteRecipe/DeleteRecipe";

class Welcome extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            showModal: false,
            recipe: null,
            page: 0,
            showEditModal: false,
            recipeEdit: null,
            showDeleteModal: false,
            deleteRecipeId: null,
            deleteRecipeTitle: null
        }

    }

    componentDidMount() {
        var page = Math.floor(Math.random() * 10);

        this.loadWelcomeRecipes(page);
        this.disappearOnScroll();

    }


    loadWelcomeRecipes = (page) => {
        let token = Cookie.get("token");
        console.log(token);

        recipeService.fetchRecipesPaged(page, 12, token).then((data) => {

            this.setState({
                recipes: data.data.content,
                page: page
            })

        })

    };

    deleteRecipe = (recipeId, title) => {

        // var confirm = window.confirm("Are you sure you want to delete this recipe?");

        this.showDeleteModal(recipeId, title);

        // if (confirm == true) {
        //     let token = Cookie.get("token");
        //     recipeService.deleteRecipe(recipeId, token).then((response) => {
        //         this.loadWelcomeRecipes(this.state.page);
        //     })
        //
        // }

    };

    finallyDeleteRecipe = () => {
        let token = Cookie.get("token");
        recipeService.deleteRecipe(this.state.deleteRecipeId, token).then((response) => {
            this.loadWelcomeRecipes(this.state.page);
            this.hideDeleteModal();
        })
    };

    disappearOnScroll = () => {

        $(window).bind('scroll', function () {
            if ($(window).scrollTop() > 50) {
                $('.dis').hide();
            } else {
                $('.dis').show();
            }

        });

    };

    showModalHandler = (details) => {
        this.setState({
            showModal: true,
            recipe: details
        })
    };

    hideModalHandler = () => {
        this.setState({
            showModal: false,
            recipe: null
        })
    };

    showEditModalHandler = (details) => {
        this.setState({
            showEditModal: true,
            recipeEdit: details
        })
    };

    hideEditModalHandler = () => {
        this.setState({
            showEditModal: false,
            recipeEdit: null
        })
    };

    showDeleteModal = (recipeId, title) => {
        this.setState({
            showDeleteModal: true,
            deleteRecipeId: recipeId,
            deleteRecipeTitle: title
        })
    };

    hideDeleteModal = () => {
        this.setState({
            showDeleteModal: false,
            deleteRecipeId: null,
            deleteRecipeTitle: null
        })
    };

    updateEditedRecipe = (recipe) => {

        this.setState((prevState) => {
            const newRecipes = prevState.recipes.map((item) => {
                if (item.id === recipe.id) {
                    return recipe;
                }
                return item;
            });
            return {"recipes": newRecipes}
        });

        this.hideEditModalHandler();

    };

    showEditModalAndBackdrop = () => {

        return (
            <div>
                <Backdrop show={this.state.showEditModal} hide={this.hideEditModalHandler}/>

                <Modal showModal={false} recipe={this.state.recipeEdit} show={this.state.showEditModal}>

                    <Edit recipe={this.state.recipeEdit} updateRecipes={this.updateEditedRecipe} hide={this.hideEditModalHandler}/>

                </Modal>
            </div>
        )

    };

    showDeleteModalAndBackdrop = () => {
        return (
            <div>
                <Backdrop show={this.state.showDeleteModal} hide={this.hideDeleteModal}/>

                <Modal recipe={null} deleteRecipe={true} show={this.state.showDeleteModal}>

                    <DeleteRecipe title={this.state.deleteRecipeTitle} hide={this.hideDeleteModal} delete={this.finallyDeleteRecipe}/>

                </Modal>
            </div>
        )
    };

    render() {

        if (this.state.recipes.length > 0) {

            return (

                <div className="Welcome">

                    <Backdrop show={this.state.showModal} hide={this.hideModalHandler}/>

                    <Modal recipe={this.state.recipe} show={this.state.showModal} hide={this.hideModalHandler}>

                        <Recipe recipe={this.state.recipe}/>

                    </Modal>

                    {this.showEditModalAndBackdrop()}
                    {this.showDeleteModalAndBackdrop()}

                    <WelcomeParallax/>

                    <Recipes clickEdit={this.showEditModalHandler} deleteRecipe={this.deleteRecipe} click={this.showModalHandler}
                             recipe1={this.state.recipes[0]} recipe2={this.state.recipes[1]}
                             recipe3={this.state.recipes[2]}/>
                    <Parallax image={Parallax1Image}/>

                    <Recipes clickEdit={this.showEditModalHandler} deleteRecipe={this.deleteRecipe} click={this.showModalHandler}
                             recipe1={this.state.recipes[3]} recipe2={this.state.recipes[4]}
                             recipe3={this.state.recipes[5]}/>
                    <Parallax image={Parallax2Image}/>

                    <Recipes clickEdit={this.showEditModalHandler} deleteRecipe={this.deleteRecipe} click={this.showModalHandler}
                             recipe1={this.state.recipes[6]} recipe2={this.state.recipes[7]}
                             recipe3={this.state.recipes[8]}/>
                    <Parallax image={Parallax3Image}/>

                    <Recipes clickEdit={this.showEditModalHandler} deleteRecipe={this.deleteRecipe} click={this.showModalHandler}
                             recipe1={this.state.recipes[9]} recipe2={this.state.recipes[10]}
                             recipe3={this.state.recipes[11]}/>

                    <Footer/>

                </div>

            );

        } else {
            return (
                <div style={{width: "100%", height: "100%"}}>
                    <div id="spinner">
                        <Spinner animation="border"
                                 role="status"
                                 variant="secondary"
                                 style={{width: '70px', height: '70px'}}/>
                    </div>
                </div>
            )
        }

    }

}

export default Welcome;