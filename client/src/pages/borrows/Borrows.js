import React, { useState, useEffect } from "react";
import EmptyRow from "../../helpers/EmptyRow";
import { getItems } from "../../axios/itemAxios";
import { getBorrows, returnBorrow } from "../../axios/borrowAxios";
import { getUsers } from "../../axios/userAxios";
import { Link } from "react-router-dom";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import Pagination from "../../components/Pagination";
import Select from "react-select";

const Borrows = () => {
    const [borrows, setBorrows] = useState([]);
    const [newBorrows, setNewBorrows] = useState(borrows);
    const [items, setItems] = useState();
    const [users, setUsers] = useState();
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;

    let userOptions = [];

    useEffect(() => {
        getBorrows((result) => setBorrows(result));
        getItems((result) => setItems(result));
        getUsers((result) => setUsers(result));
    }, [newBorrows]);

    users?.map((user) => {
        userOptions.push({
            value: user.id,
            label: user.username,
        });

        return user;
    });

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts =
        newBorrows.length === 0
            ? borrows.slice(firstPostIndex, lastPostIndex)
            : newBorrows.slice(firstPostIndex, lastPostIndex);

    const deleteHandler = (borrow) => {
        console.log(borrow);
        returnBorrow(borrow);
    };

    return (
        <>
            <section className="text-center">
                <h3 className="my-4 fw-bold">Borrower List</h3>
            </section>
            <section className="container">
                <div className="d-flex justify-content-between">
                    <Link className="btn btn-dark" to={`/borrows/create`}>
                        Borrow Item
                    </Link>
                    <div className="btn-group ms-2">
                        <Select
                            options={userOptions}
                            isClearable={true}
                            onChange={(e) => {
                                e
                                    ? setNewBorrows(
                                          borrows.filter(
                                              (borrow) =>
                                                  +borrow.EmployeeId ===
                                                  +e.value
                                          )
                                      )
                                    : setNewBorrows(borrows);
                            }}
                        />
                    </div>
                </div>
                <section className="d-flex justify-content-center">
                    <table className="table table-bordered text-center mt-2">
                        <thead>
                            <tr className="table-dark">
                                <th>ID</th>
                                <th>Employee Name</th>
                                <th>Item Borrowed</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody className="align-middle">
                            {currentPosts.length > 0 ? (
                                currentPosts.map((borrow, index) => {
                                    const { id, EmployeeId, ItemId } = borrow;

                                    return (
                                        <tr key={id}>
                                            <td>{index + 1}</td>
                                            {users
                                                ?.filter(
                                                    (user) =>
                                                        user.id === EmployeeId
                                                )
                                                .map((filtered) => (
                                                    <td key={id}>
                                                        {filtered.username}
                                                    </td>
                                                ))}
                                            {items
                                                ?.filter(
                                                    (item) => item.id === ItemId
                                                )
                                                .map((filtered) => (
                                                    <td key={id}>
                                                        {filtered.name}
                                                    </td>
                                                ))}
                                            <td>
                                                <button
                                                    className="btn p-0 mb-1"
                                                    onClick={() =>
                                                        deleteHandler({
                                                            EmployeeId:
                                                                EmployeeId,
                                                            ItemId: ItemId,
                                                        })
                                                    }
                                                >
                                                    <AiFillDelete className="red-color"></AiFillDelete>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <EmptyRow name={"Borrows"} col={"4"}></EmptyRow>
                            )}
                        </tbody>
                    </table>
                </section>

                <Pagination
                    totalPosts={borrows.length}
                    postsPerPage={postsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                ></Pagination>
            </section>
        </>
    );
};

export default Borrows;
