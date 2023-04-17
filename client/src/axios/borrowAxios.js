import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../helpers/AxiosHelper";
import { access_token } from "../helpers/BrowserHelper";

const URL = `${API_URL}/employeesItems`;

const getBorrows = async (cb) => {
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

const addBorrow = async (borrow) => {
    try {
        await axios({
            method: "POST",
            url: `${URL}/borrowItem`,
            data: borrow,
            headers: {
                access_token,
            },
        });

        Swal.fire("Borrow", "Borrow Success", "success").then((result) => {
            if (result.isConfirmed) {
                window.location.reload();
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

const returnBorrow = async (borrow) => {
    try {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, return it!",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await axios({
                    method: "DELETE",
                    url: `${URL}/returnItem`,
                    data: borrow,
                    headers: {
                        access_token,
                    },
                });

                Swal.fire(
                    "Returned!",
                    "Item has been returned.",
                    "success"
                ).then((result) => {
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

export { getBorrows, addBorrow, returnBorrow };
