import React from "react";
import { Link } from "react-router-dom";
import Style from "./landing.module.css";

export default function LandingPage(){
    return(
        <div>
            <h1 className={Style.landing}>Welcome to Countries's App</h1>
            <Link to="/home">
                <button className={Style.btn}>Explora...</button>
            </Link>
        </div>
    )
}