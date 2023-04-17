import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getCategoryById, editCategory } from "../../axios/categoryAxios";

const EditCategory = () => {
    const [form, setForm] = useState({
        name: "",
    });

    const navigation = useNavigate();
    const params = useParams();
    const { id } = params;

    const getBrand = () => {
        getCategoryById(+id, (result) => {
            setForm({
                name: result.name,
            });
        });
    };

    useEffect(() => {
        getBrand();
    }, []);

    const submitHandler = () => {
        editCategory(+id, form);
        navigation("/categories");
    };

    return (
        <>
            <section className="text-center">
                <h3 className="my-4 fw-semibold">Edit Category</h3>
            </section>
            <section className="container d-flex justify-content-center">
                <div className="w-50 mx-auto">
                    <div className="mb-3">
                        <label>Name</label>
                        <input
                            value={form.name}
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

export default EditCategory;
