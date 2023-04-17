import React from "react";
import { logout } from "../axios/userAxios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
// import { userId, username } from "../helpers/BrowserHelper";

const Navbar = (props) => {
    const { loginStatus, loginCbHandler } = props;
    const userId = localStorage.getItem("user_id");
    const username = localStorage.getItem("username");
    const role = localStorage.getItem('role');

    const navigation = useNavigate();

    const logoutHandler = () => {
        logout(loginCbHandler);
        navigation("/users");
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark py-3">
            <div className="container-fluid">
                <Link className="navbar-brand h2 mb-0" to="/">
                    <HiOutlineOfficeBuilding
                        className="me-2 pb-1"
                        size={25}
                    ></HiOutlineOfficeBuilding>
                    OfficeInventory
                </Link>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarNav"
                >
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" to="/">
                                Home
                            </Link>
                        </li>
                        { role === 'Admin' ? <li className="nav-item">
                            <Link className="nav-link active" to="/borrows">
                                Borrows
                            </Link>
                        </li> : <></> }
                        <li className="nav-item">
                            <Link className="nav-link active" to="/items">
                                Items
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/categories">
                                Categories
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" to="/users">
                                Users
                            </Link>
                        </li>
                        {loginStatus ? (
                            <li className="dropdown">
                                <Link
                                    className="nav-link dropdown-toggle active"
                                    role="button"
                                    id="dropdownMenuLink"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    {username}
                                </Link>
                                <ul className="dropdown-menu dropdown-menu-end bg-dark">
                                    <li>
                                        <Link
                                            className="dropdown-item text-white"
                                            to={`/users/${userId}`}
                                        >
                                            Profile
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            className="dropdown-item text-white"
                                            onClick={() => logoutHandler()}
                                            to="/"
                                        >
                                            Logout
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        ) : (
                            <Link className="nav-link active" to="/users/login">
                                Login
                            </Link>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
