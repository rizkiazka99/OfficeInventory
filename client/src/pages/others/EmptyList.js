import React from "react";
import img from "../../assets/not_found.jpg";

const EmptyList = (props) => {
    const { message } = props;

    return (
        <div className="d-flex flex-column mt-3">
            <div className="d-flex justify-content-center mt-2">
                <img src={img} className="img-fluid" width={500} height={300} alt="404" />
            </div>
            <div className="d-flex justify-content-center mt-2">
                <h5>{message}</h5>
            </div>
        </div>
    );
};

export default EmptyList;
