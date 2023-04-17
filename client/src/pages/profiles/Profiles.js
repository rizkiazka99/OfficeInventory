import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BsFillGearFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import { detail, getUserById } from "../../axios/userAxios";
import { addBorrow, returnBorrow } from "../../axios/borrowAxios";
import EmptyList from "../others/EmptyList";

const Profiles = () => {
    const [user, setUser] = useState({});
    const [borrowedItems, setBorrowedItems] = useState([]);
    const [returnItem, setReturnItem] = useState({
        EmployeeId: 0,
        ItemId: 0
    });
    const message = 'You haven\'t borrowed any items yet';

    const params = useParams();
    const { id } = params;
    const userId = localStorage.getItem('user_id')

    useEffect(() => {
        getUserById(+id, (result) => {
            setUser({ ...result });
        });
        detail(+id, (result) => setBorrowedItems(result.borrowed_items))
    }, []);

    const returnHandler = (returnItem) => {
        returnBorrow(returnItem);
    }

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
                                { user.role === 'Admin' ? <span>Admin</span> 
                                    : <span>Developer</span>}
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

            <div className="container-fluid">
                <hr></hr>
                <h1>Borrowed Items</h1>
                <section className="note-list">
                    <div className="row justify-content-left">
                        {console.log(`Borrowed Items Length: ${borrowedItems.length}`)}
                        { borrowedItems.length !== 0 ? borrowedItems.map((item) => {
                            const {
                                id,
                                name,
                                stock,
                                image_name,
                                image_type,
                                image_data,
                                Category,
                            } = item;

                            return (
                                <div
                                    className="col-sm-12 col-md-8 col-lg-6"
                                    style={{ width: "25rem" }}
                                    key={id}
                                >
                                    <div className="card-product card mb-4 mx-2 my-4">
                                        <div className="card-body px-3">
                                            <div className="product-section d-flex justify-content-between fw-semibold mb-1">
                                                <div>
                                                    <h6 className="fw-semibold">
                                                        {name}
                                                    </h6>
                                                </div>
                                                <div className="btn-group">
                                                    <button
                                                        type="button"
                                                        className="btn btn-warning mb-1 dropdown-toggle dropdown-toggle-split rounded py-0 "
                                                        data-bs-toggle="dropdown"
                                                        aria-expanded="false"
                                                    >
                                                        <span className="visually-hidden">
                                                            Toggle Dropdown
                                                        </span>
                                                    </button>
                                                    <ul className="dropdown-menu">
                                                        <li>
                                                            <button
                                                                onClick={() => {
                                                                    setReturnItem({
                                                                        ...returnItem,
                                                                        EmployeeId: userId,
                                                                        ItemId: id
                                                                    });
                                                                    console.log(userId);
                                                                    console.log(id);
                                                                    console.log(returnItem)
                                                                    returnHandler(returnItem);
                                                                }}
                                                                className="dropdown-item"
                                                            >
                                                                Return
                                                            </button>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </div>
                                            <img
                                                className="card-img img-fluid border-secondary rounded"
                                                src={
                                                    image_name
                                                        ? `data:${image_type};base64, ${image_data}`
                                                        : `https://i2.wp.com/www.kinerja.org/wp-content/uploads/2019/07/no-image-2.jpg?fit=%2C&ssl=1`
                                                }
                                                alt="img"
                                            />
                                            <div className="card-text mt-2">
                                                <p>Category: {Category.name}</p>
                                            </div>
                                            <div className="card-text mt-2">
                                                <p>Stock: {stock}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        }) : <EmptyList message={message}></EmptyList>}
                    </div>
                </section>                      
            </div>
        </>
    );
};

export default Profiles;