import React from "react";
import img from "../../assets/not_found.jpg";

const NotFound = () => {
    return (
        <div className="col d-flex align-items-center justify-content-center mt-5">
            <img src={img} className="img-thumbnail w-75" alt="404" />
        </div>
    );
};

export default NotFound;
