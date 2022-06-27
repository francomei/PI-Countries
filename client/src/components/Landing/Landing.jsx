import React from "react";
import { Link } from "react-router-dom";
import "./landing.module.css";

export default function LandingPage(){
    return(
        <div className="landing">
            <h1>Welcome to Countries's App</h1>
            <Link to="/home">
                <button className="btn">Explora...</button>
            </Link>
        </div>
    )
}