import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUserById, editUser } from "../../axios/userAxios";

const EditUser = () => {
    const [form, setForm] = useState({
        role: "",
    });

    const params = useParams();
    const { id } = params;

    const getUser = () => {
        getUserById(+id, (result) => {
            setForm({
                role: result.role,
            });
        });
    };

    useEffect(() => {
        getUser();
    }, []);

    const navigation = useNavigate();

    const submitHandler = () => {
        editUser(+id, form);
        navigation("/users");
    };

    return (
        <>
            <section className="text-center">
                <h3 className="my-4 fw-semibold">Edit Role</h3>
            </section>
            <section className="container d-flex justify-content-center">
                <div className="w-50 mx-auto">
                    <div className="mb-3">
                        <label>Role</label>
                        <input
                            value={form.role}
                            onChange={(e) => {
                                setForm({ role: e.target.value });
                            }}
                            type="text"
                            className="form-control"
                            placeholder="Insert Username"
                            required
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => submitHandler()}
                            className="btn btn-dark"
                        >
                            Update
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default EditUser;
