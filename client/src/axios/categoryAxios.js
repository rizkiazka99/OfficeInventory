import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../helpers/AxiosHelper";
import { access_token } from "../helpers/BrowserHelper";

const URL = `${API_URL}/categories`;

const getCategories = async (cb) => {
    try {
        const result = await axios({
            method: "GET",
            url: URL,
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

const getCategoryById = async (id, cb) => {
    try {
        const result = await axios({
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

const addCategory = async (category) => {
    try {
        await axios({
            method: "POST",
            url: `${URL}/add`,
            data: category,
            headers: {
                access_token,
            },
        });

        Swal.fire("Add Category", "Category has been added.", "success");
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

const editCategory = async (id, category) => {
    try {
        await axios({
            method: "PUT",
            url: `${URL}/update/${id}`,
            data: category,
            headers: {
                access_token,
            },
        }).then(
            Swal.fire("Edit Category ", "Category has been updated", "success")
        );
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

const deleteCategory = async (id) => {
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

                Swal.fire(
                    "Deleted!",
                    "Category has been deleted.",
                    "success"
                ).then(async (result) => {
                    if (result.isConfirmed) window.location.reload();
                });
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

export {
    getCategories,
    getCategoryById,
    addCategory,
    editCategory,
    deleteCategory,
};
