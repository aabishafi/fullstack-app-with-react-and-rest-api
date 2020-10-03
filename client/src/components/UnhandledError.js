import React from "react";
import { Link } from "react-router-dom";

// Lets users know that requested page can not be accessed.
const UnhandledError = () => {
    return (
        <div className="container">
            <h1>Error</h1>
            <h3>Sorry! An unexpected error has occured.</h3>
            <Link to={`/`}>
                <div className="">Return to home page</div>
            </Link>
        </div>
    );
};

export default UnhandledError;