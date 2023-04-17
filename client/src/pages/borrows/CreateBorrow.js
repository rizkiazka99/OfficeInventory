import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useNavigate } from "react-router-dom";
import { getItems } from "../../axios/itemAxios";
import { getUsers } from "../../axios/userAxios";
import { addBorrow } from "../../axios/borrowAxios";

const CreateBorrow = () => {
    const [form, setForm] = useState({
        EmployeeId: 0,
        ItemId: 0,
    });

    let [items, setItems] = useState();
    let [users, setUsers] = useState();
    let itemOptions = [];
    let userOptions = [];
    const navigation = useNavigate();

    useEffect(() => {
        getItems((result) => setItems(result));
        getUsers((result) => setUsers(result));
    }, []);

    items?.map((item) => {
        itemOptions.push({
            value: item.id,
            label: item.name,
        });

        return item;
    });

    users?.map((user) => {
        userOptions.push({
            value: user.id,
            label: user.username,
        });

        return user;
    });

    const submitHandler = () => {
        console.log(form);
        addBorrow(form);
        navigation("/borrows");
    };

    return (
        <>
            <section className="text-center">
                <h3 className="my-4 fw-semibold">Borrow Item</h3>
            </section>
            <section className="container d-flex justify-content-center">
                <div className="w-50 mx-auto" encType="multipart/form-data">
                    <div className="mb-3">
                        <label>Employee</label>
                        <Select
                            options={userOptions}
                            onChange={(e) => {
                                setForm({ ...form, EmployeeId: +e.value });
                            }}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label>Item</label>
                        <Select
                            options={itemOptions}
                            onChange={(e) => {
                                setForm({ ...form, ItemId: +e.value });
                            }}
                            required
                        />
                    </div>
                    <div className="mt-4 text-center">
                        <button
                            onClick={() => submitHandler()}
                            className="btn btn-dark"
                        >
                            Borrow
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default CreateBorrow;
