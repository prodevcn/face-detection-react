import React from"react";import Tilty from"react-tilty";import brain from"./brain.png";import"./Logo.css";

function Logo() {
    return (<div className="ma4 mt0 mb0"> <Tilty className="br2 shadow-2 Tilty" max={55} style={{height: 100, width:100}}> <img style={{paddingTop: '10px'}} src={brain}alt="brain"/> </Tilty> </div>);
}
  
export default Logo;