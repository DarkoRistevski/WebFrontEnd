import React from "react";
import image from '../../../images/recipe3.jpeg'
import './Recipe.css'

const Recipe = (props) => {

    return (
        <div className="pb-4 pl-4 pr-4">


            <div className="row">
                <div className="col-12">
                    <h5 className="text-center underlined mt-2">INGREDIENTS</h5>
                </div>


                <ol style={{width: '100%'}}>
                    <div id="ingredients" className="form-control">
                        {props.recipe.ingredients.map(
                            ingredient =>
                                <div key={ingredient}>
                                    <li>{ingredient}</li>
                                </div>
                        )}
                    </div>
                </ol>
            </div>

            <div className="row mb-1\">
                <div className="col-12">
                    <h5 className="text-center underlined">INSTRUCTIONS</h5>

                    <ol style={{width: '103%'}}>
                        <div id="instructions" className="form-control">
                            {props.recipe.instructions.map(
                                instruction =>
                                    <div key={instruction}>
                                        <li>{instruction}</li>
                                    </div>
                            )}
                        </div>
                    </ol>

                </div>
            </div>


        </div>
    )

};

export default Recipe;