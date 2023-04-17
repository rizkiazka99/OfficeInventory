import React, { useState } from "react";
import { editUser } from "../../axios/userAxios";
import { useNavigate, useParams } from "react-router-dom";

const EditProfile = () => {
    const [form, setForm] = useState({
        image: "",
    });

    const params = useParams();
    const { id } = params;

    const navigation = useNavigate();

    const submitHandler = () => {
        editUser(+id, form);
        navigation(`/users/${id}`);
    };

    return (
        <>
            <section className="text-center">
                <h3 className="my-4 fw-semibold">Edit Profile</h3>
            </section>
            <section className="container d-flex justify-content-center">
                <div className="w-50 mx-auto">
                    <div className="mb-3">
                        <label>Profile Image</label>
                        <input
                            onChange={(e) => {
                                setForm({
                                    image: e.target.files[0],
                                });
                            }}
                            type="file"
                            className="form-control"
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

export default EditProfile;