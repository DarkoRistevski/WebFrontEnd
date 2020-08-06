import React from "react";
import {Link} from 'react-router-dom'
import Parallax1Image from "../../../images/recipe1.jpg";
import ListRecipes from "../../ListRecipes/ListRecipes";

const Parallax = (props) => {

    return (

        <div className="parallax2" style={{backgroundImage: `url(${props.image})`}}>
            <div className="caption3">
                <Link to={"/recipes"}>
                    <span className="btn btn-info p-4 w-25" style={{opacity: '0.8'}}>EXPLORE 1M+ RECIPES</span>
                </Link>
            </div>
        </div>

    )

};

export default Parallax;