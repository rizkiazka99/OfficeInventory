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

    const roles = [
        'Front End Developer',
        'Mobile App Developer',
        'Back End Developer',
        'Full Stack Developer',
        'UI/UX Engineer',
        'QA Engineer'
    ];

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
                        <div className="form-outline flex-fill mb-0">
                            <label className="form-label">
                                Role
                            </label>
                            <select
                                onChange={(e) => {
                                    setForm({
                                        ...form,
                                        role: e.target.value
                                    });
                                }}
                                class="form-select"
                                aria-label="Default select example">
                                <option value={form.role} selected>{form.role}</option>
                                {
                                    roles.map((role) => {
                                        return (
                                            role !== form.role ? <option
                                                value={role}>
                                                {role}
                                            </option> : <></>
                                        )
                                    })
                                }
                            </select>
                        </div>
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
