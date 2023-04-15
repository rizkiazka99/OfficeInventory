import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BsFillGearFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { getUserById } from "../../axios/userAxios";

const Profiles = () => {
    const [user, setUser] = useState({});

    const params = useParams();
    const { id } = params;

    useEffect(() => {
        getUserById(+id, (result) => {
            setUser({ ...result });
        });
    }, []);

    return (
        <>
            <div className="container mt-5">
                <div className="row d-flex justify-content-center">
                    <div className="col-md-7">
                        <div className="card p-3 py-4">
                            <div className="text-center">
                                <img
                                    src={
                                        user.image_name
                                            ? `data:${user.image_type};base64, ${user.image_data}`
                                            : "https://st3.depositphotos.com/6672868/13701/v/450/depositphotos_137014128-stock-illustration-user-profile-icon.jpg"
                                    }
                                    width="100"
                                    className="profile-image rounded-circle"
                                    alt="img"
                                />
                            </div>

                            <div className="text-center mt-3">
                                <span
                                    className={`${
                                        user.role === "user"
                                            ? "bg-secondary"
                                            : "main-color"
                                    } p-1 px-4 rounded text-white`}
                                >
                                    {user.role}
                                </span>
                                <h5 className="mt-2 mb-0">{user.username}</h5>
                                <span>Developer</span>
                                <div className="setting-section mt-4">
                                    <Link to={`/users/${id}/edit`}>
                                        <BsFillGearFill
                                            className="me-2 text-dark"
                                            size={20}
                                        ></BsFillGearFill>
                                    </Link>
                                    <Link to={`/users/${id}/password`}>
                                        <RiLockPasswordFill
                                            className="text-dark"
                                            size={22}
                                        ></RiLockPasswordFill>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Profiles;
