import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editUser } from "../../axios/userAxios";

const ChangePassword = () => {
    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });

    const params = useParams();
    const { id } = params;

    const navigation = useNavigate();

    const submitHandler = () => {
        if (!(form.password && form.confirmPassword)) {
            return;
        } else {
            editUser(+id, form);
            navigation(`/users/${id}`);
        }
    };

    return (
        <>
            <section className="text-center">
                <h3 className="my-4 fw-semibold">Change Password</h3>
            </section>
            <section className="container d-flex justify-content-center">
                <div className="w-50 mx-auto">
                    <div className="mb-3">
                        <label>Password</label>
                        <input
                            onChange={(e) => {
                                setForm({ ...form, password: e.target.value });
                            }}
                            type="password"
                            className="form-control"
                            placeholder="Insert Password"
                            required
                        />
                    </div>{" "}
                    <div className="mb-3">
                        <label>Confirm Password</label>
                        <input
                            onChange={(e) => {
                                setForm({
                                    ...form,
                                    confirmPassword: e.target.value,
                                });
                            }}
                            type="password"
                            className="form-control"
                            placeholder="Insert Confirm Password"
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

export default ChangePassword;
