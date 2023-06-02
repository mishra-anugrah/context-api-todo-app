import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { signIn } from "../actions/AuthActions";
import axios from "axios";
import { Navigate } from "react-router-dom";

export const Login = () => {
  const { state, dispatch } = useContext(AuthContext);
  const { isAuth } = state;
  const [email, setEmail] = useState("eve.holt@reqres.in");
  const [password, setPassword] = useState("cityslicka");

  const handleLogin = (event: any) => {
    event.preventDefault();
    axios
      .post("https://reqres.in/api/login", { email, password })
      .then((response) => {
        dispatch(signIn(response.data.token));
      })
      .catch((error) =>
        console.error(
          "Error authenticating user. Please try again later",
          error
        )
      );
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return !isAuth ? (
    <div>
      Login
      <form onSubmit={handleLogin}>
        <label htmlFor="email">email : </label>
        <input
          type="text"
          name="email"
          placeholder="email"
          value={email}
          onChange={handleEmailChange}
        />
        <br />
        <label htmlFor="password">Password : </label>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  ) : (
    <Navigate to="/todo" />
  );
};
