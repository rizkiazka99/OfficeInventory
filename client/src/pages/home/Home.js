import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getItems, deleteItem } from "../../axios/itemAxios";
import Pagination from "../../components/Pagination";
import { addBorrow, returnBorrow } from "../../axios/borrowAxios";

const HomePage = () => {
    const userId = localStorage.getItem("user_id");
    const role = localStorage.getItem("role")

    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 3;
    const [borrow, setBorrow] = useState({
        EmployeeId: 0,
        ItemId: 0
    });
    const [returnItem, setReturnItem] = useState({
        EmployeeId: 0,
        ItemId: 0
    });


    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = items.slice(firstPostIndex, lastPostIndex);

    useEffect(() => {
        getItems((result) => setItems(result));
    }, []);

    const deleteHandler = (id) => {
        deleteItem(id);
    };

    const borrowHandler = (borrow) => {
        addBorrow(borrow);
    }

    const returnHandler = (returnItem) => {
        returnBorrow(returnItem);
    }

    return (
        <>
            <section className="text-center mt-4">
                <h2 className="fw-semibold">Inventories</h2>
            </section>
            <section className="note-list">
                <div className="row justify-content-center">
                    {currentPosts.map((item) => {
                        const {
                            id,
                            name,
                            stock,
                            image_name,
                            image_type,
                            image_data,
                            Category,
                        } = item;

                        return(
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
                                                                setBorrow({
                                                                    ...borrow,
                                                                    EmployeeId: userId,
                                                                    ItemId: id
                                                                });

                                                                console.log(userId);
                                                                console.log(id);
                                                                console.log(borrow);
                                                                borrowHandler(borrow);
                                                            }}
                                                            className="dropdown-item"
                                                        >
                                                            Borrow
                                                        </button>
                                                    </li>
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
                                                    { role === 'Admin' ? <li>
                                                            <Link
                                                                className="dropdown-item"
                                                                to={`/items/edit/${id}`}
                                                            >
                                                                Edit
                                                            </Link>
                                                        </li> : <></>
                                                    }
                                                    { role === 'Admin' ? <li>
                                                            <button
                                                                onClick={() =>
                                                                    deleteHandler(+id)
                                                                }
                                                                className="dropdown-item red-color"
                                                            >
                                                                Delete
                                                            </button>
                                                        </li> : <></>
                                                    }
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
                    })}
                </div>
            </section>

            <Pagination
                totalPosts={items.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            ></Pagination>
        </>
    );
};

export default HomePage;
