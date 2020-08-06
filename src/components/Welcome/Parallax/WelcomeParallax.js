import React from "react";

const WelcomeParallax = (props) => {

    return (

        <div className="parallax">

            <div className="caption">
                <span className="welcome">EXPLORE 1M+ RECIPES</span>
            </div>

            <div className="caption2">
                <span className="fa fa-chevron-down dis text-secondary"
                      style={{backgroundColor: 'transparent', fontSize: '25px', color: '#f7f7f7', paddingRight: '3px'}}> </span>
                <span className="fa fa-chevron-down dis text-secondary"
                      style={{backgroundColor: 'transparent', fontSize: '25px', color: '#f7f7f7', paddingRight: '3px'}}> </span>
                <span className="fa fa-chevron-down dis text-secondary"
                      style={{backgroundColor: 'transparent', fontSize: '25px', color: '#f7f7f7'}}> </span>
            </div>

        </div>

    )

};

export default WelcomeParallax;