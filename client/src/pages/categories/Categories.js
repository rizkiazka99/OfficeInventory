import React, { useState, useEffect } from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import EmptyRow from "../../helpers/EmptyRow";
import { getCategories, deleteCategory } from "../../axios/categoryAxios";
import Pagination from "../../components/Pagination";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const role = localStorage.getItem('role')

    useEffect(() => {
        getCategories((result) => setCategories(result));
    }, []);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts = categories.slice(firstPostIndex, lastPostIndex);

    const deleteHandler = (id) => {
        deleteCategory(id);
    };

    return (
        <>
            <section className="text-center">
                <h3 className="my-4 fw-bold">Category List</h3>
            </section>
            <section className="container">
                { role === 'Admin' ? <Link className="btn btn-dark" to={`/categories/create`}>
                    Add Category
                </Link> : <></> }
                <section className="d-flex justify-content-center">
                    <table className="table table-bordered text-center mt-2">
                        <thead>
                            <tr className="table-dark">
                                <th>No.</th>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Available Item(s)</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.length > 0 ? (
                                currentPosts.map((category, index) => {
                                    const { id, name, Items } = category;

                                    return (
                                        <tr key={id}>
                                            <td>{index + 1}</td>
                                            <td>{id}</td>
                                            <td>{name}</td>
                                            <td>{Items.length}</td>
                                            <td>
                                                { role === 'Admin' ? <Link
                                                    to={`/categories/edit/${id}`}
                                                >
                                                    <AiFillEdit className="dark-color me-2"></AiFillEdit>
                                                </Link> : <p>N/A</p>}
                                                { role === 'Admin' ? <button
                                                    className="btn p-0 mb-1"
                                                    onClick={() =>
                                                        deleteHandler(+id)
                                                    }
                                                >
                                                    <AiFillDelete className="red-color"></AiFillDelete>
                                                </button> : <></> }
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <EmptyRow
                                    name={"Categories"}
                                    col={"3"}
                                ></EmptyRow>
                            )}
                        </tbody>
                    </table>
                </section>
            </section>

            <Pagination
                totalPosts={categories.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            ></Pagination>
        </>
    );
};

export default Categories;
