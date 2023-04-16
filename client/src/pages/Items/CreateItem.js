import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { addItem } from "../../axios/itemAxios";
import { getCategories } from "../../axios/categoryAxios";

const CreateItem = () => {
    const [form, setForm] = useState({
        name: "",
        stock: 0,
        CategoryId: "",
        image: null,
    });

    let [categories, setCategories] = useState();
    let categoryOptions = [];
    const navigation = useNavigate();

    useEffect(() => {
        getCategories((result) => setCategories(result));
    }, []);

    categories?.map((category) => {
        categoryOptions.push({
            value: category.id,
            label: category.name,
        });

        return category;
    });

    const submitHandler = () => {
        addItem(form);
        navigation("/");
    };

    return (
        <>
            <section className="text-center">
                <h3 className="my-4 fw-semibold">Add Item</h3>
            </section>
            <section className="container d-flex justify-content-center">
                <div className="w-50 mx-auto" encType="multipart/form-data">
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
                    <div className="mb-3">
                        <label>Stock</label>
                        <input
                            onChange={(e) => {
                                setForm({ ...form, stock: +e.target.value });
                            }}
                            type="number"
                            className="form-control"
                            placeholder="Insert Stock"
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Category</label>
                        <Select
                            options={categoryOptions}
                            onChange={(e) => {
                                setForm({ ...form, CategoryId: +e.value });
                            }}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Upload Image</label>
                        <input
                            onChange={(e) => {
                                setForm({
                                    ...form,
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
                            Add
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CreateItem;
