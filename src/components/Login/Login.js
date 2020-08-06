import React, {Component} from "react";
import "./Login.css"
import {Link} from "react-router-dom";
import logo from '../../images/logo3.png'
import recipeService from '../../repository/recipesRepository'
import Cookie from 'js-cookie'
// import Redirect from "react-router/modules/Redirect";
import { Redirect, useHistory } from "react-router-dom";

const Login = (props) => {

    const history = useHistory();

    const logInHandler = (e) => {
        e.preventDefault();


        let username = e.target.username.value;
        let password = e.target.password.value;



        recipeService.logIn(username, password).then( (response) => {

            Cookie.set("token", response.data.jwt);
            props.tokenHandler(response.data.jwt);

            history.push("/recipes");

        }).catch(error => {
            document.getElementById("errorMessage").style.display = "block";
        })

    };

        return (
            <div className="logIn">
                <div className="container">
                    <div className="row">
                        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto ok">
                            <div className="card card-signin my-5">
                                <div className="card-body">
                                    <div>
                                        <img src={logo} width="50px" height="50px" alt="" className="logoImage"/>
                                        <i className="h3 pt-2 studentText"><i
                                            className="helperText text-primary">1M</i>Recipes</i>
                                    </div>
                                    <hr>
                                    </hr>
                                    <form className="form-signin mt-4" onSubmit={logInHandler}>
                                        <div className="form-label-group">
                                            <input type="text" id="inputUsername" className="form-control"
                                                   placeholder="Username" name="username" autoFocus/>
                                            <label htmlFor="inputUsername">Username</label>
                                        </div>

                                        <div className="form-label-group">
                                            <input type="password" id="inputPassword" className="form-control"
                                                   placeholder="Password" name="password"/>
                                            <label htmlFor="inputPassword">Password</label>
                                        </div>

                                        <br/>

                                        <div id="errorMessage">Invalid Username or Password</div>

                                        <button className="btn btn-lg btn-block text-uppercase btn-outline-primary"
                                                type="submit"
                                                id="loginButton">log in
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );

};

export default Login;