import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { getItems, deleteItem } from "../../axios/itemAxios";
import { getCategories } from "../../axios/categoryAxios";
import EmptyRow from "../../helpers/EmptyRow";
import Pagination from "../../components/Pagination";

const Items = () => {
    const [items, setItems] = useState([]);
    const [newItems, setNewItems] = useState(items);
    const [categories, setCategories] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    let categoryOptions = [];

    useEffect(() => {
        getItems((result) => setItems(result));
        getCategories((result) => setCategories(result));
    }, [newItems]);

    categories?.map((category) => {
        categoryOptions.push({
            value: category.id,
            label: category.name,
        });

        return category;
    });

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts =
        newItems.length === 0
            ? items.slice(firstPostIndex, lastPostIndex)
            : newItems.slice(firstPostIndex, lastPostIndex);

    const deleteHandler = (id) => {
        deleteItem(id);
    };

    return (
        <>
            <section className="text-center">
                <h3 className="my-4 fw-bold">Item List</h3>
            </section>
            <section className="container">
                <div className="d-flex justify-content-between">
                    <Link className="btn btn-dark" to={`/items/create`}>
                        Add Item
                    </Link>
                    <div className="btn-group ms-2">
                        <Select
                            options={categoryOptions}
                            isClearable={true}
                            onChange={(e) => {
                                e
                                    ? setNewItems(
                                          items.filter(
                                              (item) =>
                                                  item.Category.name === e.label
                                          )
                                      )
                                    : setNewItems(items);
                            }}
                        />
                    </div>
                </div>
                <section className="d-flex justify-content-center">
                    <table className="table table-bordered text-center mt-2">
                        <thead>
                            <tr className="table-dark">
                                <th>ID</th>
                                <th>Name</th>
                                <th>Stock</th>
                                <th>Category</th>
                                <th>Image</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {currentPosts.length > 0 ? (
                                currentPosts.map((item, index) => {
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
                                        <tr key={id}>
                                            <td>{index + 1}</td>
                                            <td>{name}</td>
                                            <td>{stock}</td>
                                            <td>{Category.name}</td>
                                            <td>
                                                {image_name ? (
                                                    <img
                                                        className="card-img img-thumbnail rounded w-25"
                                                        src={`data:${image_type};base64, ${image_data}`}
                                                        alt="img"
                                                    />
                                                ) : (
                                                    "No Image"
                                                )}
                                            </td>
                                            <td>
                                                <Link to={`/items/edit/${id}`}>
                                                    <AiFillEdit className="dark-color me-2"></AiFillEdit>
                                                </Link>
                                                <button
                                                    className="btn p-0 mb-1"
                                                    onClick={() =>
                                                        deleteHandler(+id)
                                                    }
                                                >
                                                    <AiFillDelete className="red-color"></AiFillDelete>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <EmptyRow name={"Items"} col={"6"}></EmptyRow>
                            )}
                        </tbody>
                    </table>
                </section>

                <Pagination
                    totalPosts={items.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                ></Pagination>
            </section>
        </>
    );
};

export default Items;
