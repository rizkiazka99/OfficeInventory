import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../helpers/AxiosHelper";
import { access_token } from "../helpers/BrowserHelper";

const URL = `${API_URL}/items`;

const getItems = async (cb) => {
    try {
        let items = await axios({
            method: "GET",
            url: `${URL}`,
        });

        cb(items.data.data);
    } catch (error) {
        if (error.response.status !== 500) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Server Error`,
            });
        }
    }
};

const getItemById = async (id, cb) => {
    try {
        let result = await axios({
            method: "GET",
            url: `${URL}/getById/${id}`,
            headers: {
                access_token,
            },
        });

        cb(result.data.data);
    } catch (error) {
        if (error.response.status !== 500) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Server Error`,
            });
        }
    }
};

const addItem = async (item) => {
    try {
        await axios({
            method: "POST",
            url: `${URL}/add`,
            data: item,
            headers: {
                "Content-Type": "multipart/form-data",
                access_token,
            },
        }).then(Swal.fire("Add Item", "Item has been added", "success"));
    } catch (error) {
        if (error.response.status !== 500) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Server Error`,
            });
        }
    }
};

const editItem = async (id, item) => {
    try {
        await axios({
            method: "PUT",
            url: `${URL}/update/${id}`,
            data: item,
            headers: { "Content-Type": "multipart/form-data", access_token },
        }).then(Swal.fire("Edit item ", "Item has been updated", "success"));
    } catch (error) {
        if (error.response.status !== 500) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Server Error`,
            });
        }
    }
};

const deleteItem = async (id) => {
    try {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios({
                    method: "DELETE",
                    url: `${URL}/delete/${id}`,
                    headers: {
                        access_token,
                    },
                });

                Swal.fire("Deleted!", "Item has been deleted.", "success").then(
                    (result) => {
                        if (result.isConfirmed) window.location.reload();
                    }
                );
            }
        });
    } catch (error) {
        if (error.response.status !== 500) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `${error.response.data.message}`,
            });
        } else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: `Server Error`,
            });
        }
    }
};

export { getItems, getItemById, addItem, editItem, deleteItem };
