import React, {Component} from 'react';
import logo from '../../logo.svg';
import './App.css';
import logo3 from '../../images/logo3.png'
import recipe1 from '../../images/recipe1.jpg'
import recipe3 from '../../images/recipe3.jpeg'
import recipe4 from '../../images/recipe4.jpeg'
import $ from 'jquery'
import Welcome from "../Welcome/Welcome";
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import ListRecipes from "../ListRecipes/ListRecipes";
import Login from "../Login/Login";
import Cookie from 'js-cookie';
import Create from "../CreateRecipe/Create";

class App extends Component {

    constructor() {
        super();

        this.state = {
            token: null
        }

    }

    componentDidMount() {
        this.setState({
            token: Cookie.get("token")
        })
    }

    tokenHandler = (jwt) => {
        this.setState({
            token: jwt
        })
    };

    tokenHandlerLogout = () => {
        this.setState({
            token:null
        })
    };

    render() {

        return (

            <Router>

                <Switch>

                    <Route path={"/home"}>
                        <Welcome/>
                    </Route>

                    <Route path={"/recipes"}>
                        <ListRecipes logOutHandler={this.tokenHandlerLogout}/>
                    </Route>

                    {this.state.token == null ?
                        <Route path={"/login"}>
                            <Login tokenHandler={this.tokenHandler}/>
                        </Route>
                        :
                        <Route path={"/login"}>
                            <Welcome/>
                        </Route>
                    }

                    {Cookie.get("token") == null ?
                        <Route path={"/create"}>
                            <Welcome />
                        </Route>
                        :
                        <Route path={"/create"}>
                            <Create />
                        </Route>
                    }

                    <Redirect to="/home"/>

                </Switch>
            </Router>
        );

    }
}

export default App;
