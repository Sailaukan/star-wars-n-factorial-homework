import React from "react";
import classes from "./card.module.css"

const Card = (props) =>{
    return(
            <div className={classes.card}>
                <div className={classes.planetName}>{props.name}</div>
                <p>Climate: {props.text1}</p>
                <p>Terrain: {props.text2}</p>
                <p>Population: {props.text3}</p>
                {/* <p>Url: {props.url}</p> */}
            </div>
    )
}

export default Card;