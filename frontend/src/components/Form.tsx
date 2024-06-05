import React, { useState } from "react";
import api from "../api";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import { useNavigate } from "react-router-dom";
import LoadingIndicator from "./LoadingIndicator";
import '../style/Form.css'

function Form({ route, method }: { route: any; method: string }) {
    const naviagte =useNavigate()
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<any>();
  const [loading, setLoading] = useState<Boolean>(false);

  const name = method === "login" ? "Login" : "Register";
  const submitChange = async () => {
    setLoading(true);
    try {
      const res = await api.post(route, { username, password });
      console.log(res)
      if (method == "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        naviagte('/')
      }else{
        naviagte('/login')
      }

    } catch (error) {
        alert(error)
        setLoading(false)
    }
  };

  return (
    <>
      <form onSubmit={submitChange} className="form-container">
        <h1>{name}</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="User Name"
          className="form-input"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
          className="form-input"
        />
        {loading && <LoadingIndicator />}
        <button type="submit" className="form-button">{name}</button>
      </form>
    </>
  );
}

export default Form;
