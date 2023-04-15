import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Select from "react-select";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import EmptyRow from "../../helpers/EmptyRow";
import { getUsers } from "../../axios/userAxios";
import Pagination from "../../components/Pagination";

const Users = () => {
    const [users, setUsers] = useState([]);
    const [newUsers, setNewUsers] = useState(users);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;
    const roleOptions = [
        { value: "1", label: "Admin" },
        { value: "2", label: "User" },
    ];

    useEffect(() => {
        getUsers((result) => setUsers(result));
    }, [newUsers]);

    const lastPostIndex = currentPage * postsPerPage;
    const firstPostIndex = lastPostIndex - postsPerPage;
    const currentPosts =
        newUsers.length === 0
            ? users.slice(firstPostIndex, lastPostIndex)
            : newUsers.slice(firstPostIndex, lastPostIndex);

    return (
        <>
            <section className="text-center">
                <h3 className="my-4 fw-bold">User List</h3>
            </section>
            <section className="container">
                <div className="btn-group">
                    <Select
                        options={roleOptions}
                        isClearable={true}
                        onChange={(e) => {
                            e
                                ? setNewUsers(
                                      users.filter(
                                          (item) =>
                                              item.role.toLowerCase() ===
                                              e.label.toLowerCase()
                                      )
                                  )
                                : setNewUsers(users);
                        }}
                    />
                </div>
                <section className="d-flex justify-content-center">
                    <table className="table table-bordered text-center mt-2">
                        <thead>
                            <tr className="table-dark">
                                <th>ID</th>
                                <th>Username</th>
                                <th>E-mail</th>
                                <th>Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currentPosts.length > 0 ? (
                                currentPosts.map((user, index) => {
                                    const { id, username, email, role } = user;

                                    return (
                                        <tr key={id}>
                                            <td>{index + 1}</td>
                                            <td>{username}</td>
                                            <td>{email}</td>
                                            <td>{role}</td>
                                            <td>
                                                <Link to={`/users/edit/${id}`}>
                                                    <AiFillEdit className="dark-color me-2"></AiFillEdit>
                                                </Link>
                                                <button
                                                    className="btn p-0 mb-1"
                                                    // onClick={() =>
                                                    //     deleteHandler(+id)
                                                    // }
                                                >
                                                    <AiFillDelete className="red-color"></AiFillDelete>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <EmptyRow name={"Users"} col={"5"}></EmptyRow>
                            )}
                        </tbody>
                    </table>
                </section>
            </section>

            <Pagination
                totalPosts={users.length}
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
            ></Pagination>
        </>
    );
};

export default Users;
