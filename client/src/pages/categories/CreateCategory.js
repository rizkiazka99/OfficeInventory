import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addCategory } from "../../axios/categoryAxios";

const CreateCategory = () => {
    const [form, setForm] = useState({
        name: "",
    });

    const navigation = useNavigate();

    const submitHandler = () => {
        addCategory(form);
        navigation("/categories");
    };

    return (
        <>
            <section className="text-center">
                <h3 className="my-4 fw-semibold">Add Category</h3>
            </section>
            <section className="container d-flex justify-content-center">
                <div className="w-50 mx-auto">
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            onChange={(e) => {
                                setForm({ ...form, name: e.target.value });
                            }}
                            type="text"
                            className="form-control"
                            placeholder="Insert Name"
                            required
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => submitHandler()}
                            className="btn btn-dark"
                        >
                            Add
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CreateCategory;
