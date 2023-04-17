import React, { useState, useEffect } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/js/bootstrap.js";
import { Navbar, MainContent, LoginContent } from "./components";

function App() {
    const [loginStatus, setLoginStatus] = useState(false);

    const loginCbHandler = (result) => {
        setLoginStatus(result);
    };

    useEffect(() => {
        if (localStorage.getItem("access_token")) {
            setLoginStatus(true);
        } else {
            setLoginStatus(false);
        }
    }, [loginStatus]);

    return (
        <>
            {loginStatus ? (
                <>
                    <Navbar
                        loginStatus={loginStatus}
                        loginCbHandler={loginCbHandler}
                    ></Navbar>
                    <MainContent></MainContent>
                </>
            ) : (
                <LoginContent loginCbHandler={loginCbHandler}></LoginContent>
            )}
        </>
    );
}

export default App;
