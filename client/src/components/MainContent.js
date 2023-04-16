import React from "react";
import { Routes, Route } from "react-router-dom";
import {
    Home,
    Borrows,
    CreateBorrow,
    CreateItem,
    EditItem,
    Items,
    Categories,
    CreateCategory,
    EditCategory,
    Users,
    EditUser,
    Profiles,
    EditProfile,
    ChangePassword,
    NotFound,
} from "../pages";

const MainContent = () => {
    return (
        <div className="container">
            <Routes>
                <Route path="" element={<Home></Home>}></Route>
                <Route path="items/" element={<Items></Items>}></Route>
                <Route
                    path="items/create"
                    element={<CreateItem></CreateItem>}
                ></Route>
                <Route path="items/edit">
                    <Route path=":id" element={<EditItem></EditItem>}></Route>
                </Route>
                <Route
                    path="categories"
                    element={<Categories></Categories>}
                ></Route>
                <Route
                    path="categories/create"
                    element={<CreateCategory></CreateCategory>}
                ></Route>
                <Route path="categories/edit">
                    <Route
                        path=":id"
                        element={<EditCategory></EditCategory>}
                    ></Route>
                </Route>
                <Route path="users/" element={<Users></Users>}></Route>
                <Route path="users/edit">
                    <Route path=":id" element={<EditUser></EditUser>}></Route>
                </Route>
                <Route path="users/">
                    <Route path=":id" element={<Profiles></Profiles>}></Route>
                    <Route
                        path=":id/edit"
                        element={<EditProfile></EditProfile>}
                    ></Route>
                    <Route
                        path=":id/password"
                        element={<ChangePassword></ChangePassword>}
                    ></Route>
                </Route>
                <Route path="borrows/" element={<Borrows></Borrows>}></Route>
                <Route
                    path="borrows/create"
                    element={<CreateBorrow></CreateBorrow>}
                ></Route>
                <Route path="*" element={<NotFound></NotFound>} />
            </Routes>
        </div>
    );
};

export default MainContent;
