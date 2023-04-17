import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../helpers/AxiosHelper";
import { access_token } from "../helpers/BrowserHelper";

const URL = `${API_URL}/employees`;

const getUsers = async (cb) => {
    try {
        let users = await axios({
            method: "GET",
            url: URL,
        });

        cb(users.data.data);
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

const getUserById = async (id, cb) => {
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

const detail = async (id, cb) => {
    try {
        let result = await axios({
            method: 'GET',
            url: `${URL}/detail/${id}`,
            headers: {
                access_token
            }
        });

        cb(result.data.data);
    } catch(error) {
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
}

const editUser = async (id, user) => {
    try {
        let result = await axios({
            method: "PUT",
            url: `${URL}/update/${id}`,
            data: user,
            headers: {
                "Content-Type": "multipart/form-data",
                access_token,
            },
        });
        console.log(result);

        Swal.fire("Edit User ", "User has been updated", "success");
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

const deleteUser = async (id) => {
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
                const userId = localStorage.getItem('user_id');
                let result = await axios({
                    method: 'DELETE',
                    url: `${URL}/delete/${id}`,
                    headers: {
                        access_token
                    }
                });
                
                console.log(result)
                Swal.fire("Delete User", "User has been deleted", "Success")
                if (id !== userId) {
                    window.location.reload();
                }
            }
        });
    } catch(error) {
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
}

const login = async (user, cbHandler) => {
    try {
        let result = await axios({
            method: "POST",
            url: `${URL}/login`,
            data: user,
        });

        const access_token = result.data.access_token;
        const userId = result.data.user_data.id;
        const username = result.data.user_data.username;
        const role = result.data.user_data.role;

        localStorage.setItem("access_token", access_token);
        localStorage.setItem("user_id", userId);
        localStorage.setItem("username", username);
        localStorage.setItem("role", role);

        cbHandler(true);

        Swal.fire("Login", "Login Success", "success");
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

const register = async (user, cbHandler) => {
    if (user.password === user.confirmPassword) {
        try {
            await axios({
                method: "POST",
                url: `${URL}/register`,
                data: user,
            });

            Swal.fire("Register", "Register Success", "success").then(
                async (result) => {
                    if (result.isConfirmed) {
                        cbHandler(true);
                        window.location.reload();
                    }
                }
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
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Incorrect Confirm Password",
        });
    }
};

const registerAdmin = async (user, cbHandler) => {
    if (user.password === user.confirmPassword) {
        try {
            await axios({
                method: "POST",
                url: `${URL}/register`,
                data: user,
            });

            Swal.fire("Register", "Register Success", "success");
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
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Incorrect Confirm Password",
        });
    }
};

const logout = async (cbHandler) => {
    localStorage.clear();
    cbHandler(false);

    Swal.fire("Logout", "Logout Success", "success");
};

export { getUsers, getUserById, detail, login, register, registerAdmin, logout, editUser, deleteUser };
