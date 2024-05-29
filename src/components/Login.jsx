import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authSuccess, setAuthSuccess] = useState(false);

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = () => {
    const url = "http://localhost:3000/api/auth/login";
    const data = {
      username: username,
      password: password,
    };
    axios
      .post(url, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem(username, response.data.token);
        setAuthSuccess(true);
      })
      .catch((error) => {
        console.error("ERROR", error);
        setAuthSuccess(false);
      });
  };
  return (
    <>
      {authSuccess == false ? (
        <div className="flex items-center justify-center h-screen flex-col">
          <div className="">
            <label className="m-8">Username</label>
            <input
              className="border-2 w-64 h-10 rounded p-2 justify-center m-4"
              name="username"
              onChange={handleUsername}
            />
          </div>
          <div>
            <label className="m-8">Password</label>
            <input
              className="border-2 w-64 h-10 rounded p-2 justify-center m-4"
              name="password"
              onChange={handlePassword}
            />
          </div>
          <div>
            <button
              className="w-64 h-10 rounded bg-blue-600 text-white m-4 ml-36"
              onClick={handleLogin}
            >
              Login
            </button>
            <div className="m-4 sm:ml-24 ml-16">
              New here?{" "}
              <a className="text-blue-600" href="/">
                Signup
              </a>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Navigate to="/task-management" state={{ username }} />
        </div>
      )}
    </>
  );
};

export default Login;
