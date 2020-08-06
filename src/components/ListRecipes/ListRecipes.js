import React, {Component} from "react";
import recipesService from '../../repository/recipesRepository';
import CardRecipe from "../Welcome/Recipes/CardRecipe";
import image from '../../images/default.png'
import logo from '../../images/logo3.png'
import Backdrop from "../UI/Backdrop/Backdrop";
import Modal from "../UI/Modal/Modal";
import Recipe from "../Recipes/Recipe/Recipe";
import Footer from "../Footer/Footer";
import ReactPaginate from 'react-paginate';
import './ListRecipes.css';
import {Link} from "react-router-dom";
import Cookie from 'js-cookie';
import Spinner from "react-bootstrap/Spinner";
import Create from "../CreateRecipe/Create";
import Edit from "../EditRecipe/Edit";
import {withRouter} from "react-router-dom";
import DeleteRecipe from "../DeleteRecipe/DeleteRecipe";

class ListRecipes extends Component {

    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            showModal: false,
            recipe: null,
            page: 0,
            totalPages: 0,
            term: "",
            showEditModal: false,
            recipeEdit: null,
            showDeleteModal: false,
            deleteRecipeId: null,
            deleteRecipeTitle: null
        }

    }

    componentDidMount() {
        this.loadRecipes();

    }

    loadRecipes = (page = 0) => {
        let token = Cookie.get("token");

        recipesService.fetchRecipesPaged(page, 9, token).then((data) => {

            this.setState({
                recipes: data.data.content,
                page: data.data.page,
                totalPages: data.data.totalPages,
                term: ""
            })

        })

    };

    searchRecipe = (e) => {
        e.preventDefault();

        if (e.target.searchTerm.value == "") {
            this.loadRecipes();
            return;
        }

        this.setState({
            term: e.target.searchTerm.value
        }, () => this.searchRecipe2());

    };

    searchRecipe2 = (page = 0) => {
        var term = this.state.term;
        recipesService.getRecipesByTerm(term, page, 9).then((data) => {
            this.setState({
                recipes: data.data.content,
                page: data.data.page,
                totalPages: data.data.totalPages
            })

        })

    };

    redirectIfEmpty = () => {
        if (this.state.recipes.length == 0) {
            this.loadRecipes(this.state.page);
        }
    };

    // deleteRecipe = (recipeId) => {
    //
    //     var confirm = window.confirm("Are you sure you want to delete this recipe?");
    //
    //     if (confirm == true) {
    //         let token = Cookie.get("token");
    //         recipesService.deleteRecipe(recipeId, token).then((response) => {
    //             var page;
    //             if (this.state.recipes.length == 1) {
    //                 page = this.state.page - 1;
    //             } else {
    //                 page = this.state.page;
    //             }
    //             if (this.state.term != "") {
    //                 this.searchRecipe2(page);
    //             } else {
    //                 this.loadRecipes(page)
    //             }
    //         })
    //
    //     }
    //
    // };

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

    deleteRecipe = (recipeId, title) => {

        // var confirm = window.confirm("Are you sure you want to delete this recipe?");
        this.showDeleteModal(recipeId, title);

        // if (confirm == true) {
        //     let token = Cookie.get("token");
        //     recipesService.deleteRecipe(recipeId, token).then((response) => {
        //         var page;
        //         if (this.state.recipes.length == 1) {
        //             page = this.state.page - 1;
        //         } else {
        //             page = this.state.page;
        //         }
        //         if (this.state.term != "") {
        //             this.searchRecipe2(page);
        //         } else {
        //             this.loadRecipes(page)
        //         }
        //     })
        //
        // }

    };

    finallyDeleteRecipe = () => {
        let token = Cookie.get("token");
        recipesService.deleteRecipe(this.state.deleteRecipeId, token).then((response) => {
            var page;
            if (this.state.recipes.length == 1) {
                page = this.state.page - 1;
            } else {
                page = this.state.page;
            }
            if (this.state.term != "") {
                this.searchRecipe2(page);
            } else {
                this.loadRecipes(page)
            }
            this.hideDeleteModal();
        })
    };

    checkAuthentication = () => {
        return Cookie.get("token") != null;
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

    handlePageClick = (e) => {
        if (this.state.term == "") {
            this.loadRecipes(e.selected);
        } else {
            this.searchRecipe2(e.selected);
        }

    };

    logOutHandler = () => {
        Cookie.remove("token");
        this.props.logOutHandler();
    };

    showModalAndBackdrop = () => {

        return (
            <div>
                <Backdrop show={this.state.showModal} hide={this.hideModalHandler}/>

                <Modal recipe={this.state.recipe} show={this.state.showModal} hide={this.hideModalHandler}>

                    <Recipe recipe={this.state.recipe}/>

                </Modal>
            </div>
        )

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

                    <Edit recipe={this.state.recipeEdit} updateRecipes={this.updateEditedRecipe}
                          hide={this.hideEditModalHandler}/>

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

    showSearchBar = () => {
        return (
            <div id="header">
                <div className="w-100">

                    <Link to={"/home"}>
                        <img src={logo}/>
                    </Link>

                    <form onSubmit={this.searchRecipe} id="searchForm">

                        <input id="search"
                               className="form-control"
                               type="text"
                               placeholder={"Search Recipe by Title or Ingredient"}
                               name="searchTerm"/>
                        <input className="btn btn-secondary" type="submit" value="Search"/>
                    </form>

                    {!this.checkAuthentication() ?
                        <Link to={"/login"}>
                            <button id="logInButton" className="btn btn-outline-secondary">Log in</button>
                        </Link>
                        : <Link to={"/home"}>
                            <button id="logOutButton" onClick={this.logOutHandler} className="btn btn-danger">Log out
                            </button>
                        </Link>}

                </div>
            </div>
        )
    };

    showRecipes = () => {
        return (
            <div className="container minHeight" style={{marginTop: '20px'}}>

                <div className="row">

                    {this.state.recipes.map(
                        recipe =>
                            <div key={recipe.id} className="col-sm-6 col-lg-4 col" style={{marginBottom: '20%'}}>
                                <CardRecipe click={this.showModalHandler}
                                            clickEdit={this.showEditModalHandler}
                                            deleteRecipe={this.deleteRecipe}
                                            image={recipe.image == null ? image : "http://localhost:8080/recipes/image/" + recipe.id}
                                            recipe={recipe}/>
                            </div>
                    )}

                </div>

            </div>
        )
    };

    showFloatingButton = () => {
        return (
            <div>
                {this.checkAuthentication() ?
                    <Link to={"/create"}>
                        <div className="floatingButton bg-secondary text-white">
                            <i className="fa fa-plus"></i>
                        </div>
                    </Link> : null}
            </div>
        )
    };

    paginate = () => {
        if (this.state.totalPages !== 0) {
            return (
                <ReactPaginate previousLabel={<span className="fa fa-angle-double-left"/>}
                               nextLabel={<span className="fa fa-angle-double-right"/>}
                               breakLabel={<span className="gap">...</span>}
                               breakClassName={"break-me"}
                               pageCount={this.state.totalPages}
                               marginPagesDisplayed={1}
                               pageRangeDisplayed={3}
                               pageClassName={"page-item"}
                               pageLinkClassName={"page-link"}
                               previousClassName={"page-item"}
                               nextClassName={"page-item"}
                               previousLinkClassName={"page-link"}
                               nextLinkClassName={"page-link"}
                               forcePage={this.state.page}
                               onPageChange={this.handlePageClick}
                               containerClassName={"pagination justify-content-center"}
                               activeClassName={"active"}/>
            )
        }
    };


    render() {

        if (this.state.recipes.length > 0) {
            return (
                <div id="king">

                    {this.showSearchBar()}
                    {this.showModalAndBackdrop()}
                    {this.showEditModalAndBackdrop()}
                    {this.showRecipes()}
                    {this.showFloatingButton()}
                    {this.paginate()}
                    {this.showDeleteModalAndBackdrop()}

                    <Footer/>

                </div>
            )
        } else {

            this.redirectIfEmpty();

            return (
                <div style={{width: "100%", height: "100%"}}>
                    {this.showSearchBar()}
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

export default withRouter(ListRecipes);