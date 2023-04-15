import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt, FaKey } from "react-icons/fa";
import logo from "../../assets/hi-logo.png";
import { login } from "../../axios/userAxios";

const Login = (props) => {
    const { loginCbHandler, isLoginHandler } = props;

    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const navigation = useNavigate();

    const submitHandler = () => {
        login(form, loginCbHandler);
        navigation("/");
    };

    const registerHandler = () => {
        isLoginHandler(false);
        navigation("/");
    };

    return (
        <>
            <section className="section-login mx-auto">
                <div className="container">
                    <div className="row d-flex justify-content-center align-items-center w-75 mx-auto">
                        <div className=" col-xs-12 col-lg-8">
                            <div className="text-center">
                                <img
                                    src={logo}
                                    className="custom-image"
                                    alt="#"
                                />
                            </div>
                            <div
                                className="card text-black pt-2"
                                style={{ borderRadius: "25px" }}
                            >
                                <div className="card-body">
                                    <div className="row justify-content-center">
                                        <div className="col-lg-10 col-md">
                                            <p className="text-center text-uppercase main-text h3 fw-bold mb-4 mt-2">
                                                Sign In
                                            </p>

                                            <div className="mx-1 mx-md-4">
                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <FaUserAlt
                                                        className="me-3 fa-fw mt-4"
                                                        size={20}
                                                    ></FaUserAlt>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label">
                                                            E-mail
                                                        </label>
                                                        <input
                                                            onChange={(e) => {
                                                                setForm({
                                                                    ...form,
                                                                    email: e
                                                                        .target
                                                                        .value,
                                                                });
                                                            }}
                                                            type="email"
                                                            className="form-control"
                                                            minLength="4"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="d-flex flex-row align-items-center mb-4">
                                                    <FaKey
                                                        className="me-3 fa-fw mt-4"
                                                        size={20}
                                                    ></FaKey>
                                                    <div className="form-outline flex-fill mb-0">
                                                        <label className="form-label">
                                                            Password
                                                        </label>
                                                        <input
                                                            onChange={(e) => {
                                                                setForm({
                                                                    ...form,
                                                                    password:
                                                                        e.target
                                                                            .value,
                                                                });
                                                            }}
                                                            type="password"
                                                            className="form-control"
                                                            minLength="6"
                                                            required
                                                        />
                                                    </div>
                                                </div>

                                                <div className="d-flex justify-content-center pt-2 mb-2">
                                                    <input
                                                        onClick={() =>
                                                            submitHandler()
                                                        }
                                                        className="btn text-white main-color btn-lg"
                                                        type="submit"
                                                        value="Login"
                                                    />
                                                </div>

                                                <div className="d-flex justify-content-center mt-2">
                                                    <p>
                                                        Don't have an account?
                                                        <Link
                                                            onClick={() =>
                                                                registerHandler()
                                                            }
                                                            className="fw-semibold text-decoration-none"
                                                        >
                                                            <span className="sign-link">
                                                                {" "}
                                                                Sign Up
                                                            </span>
                                                        </Link>
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Login;
