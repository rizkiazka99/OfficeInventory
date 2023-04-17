import React from "react";
import img from "../../assets/empty_list.png";

const EmptyList = (props) => {
    const { message } = props;

    return (
        <div className="d-flex flex-column mt-3">
            <div className="d-flex justify-content-center mt-2">
                <img src={img} className="img-fluid" width={300} height={200} alt="404" />
            </div>
            <div className="d-flex justify-content-center mt-3">
                <h5>{message}</h5>
            </div>
        </div>
    );
};

export default EmptyList;
