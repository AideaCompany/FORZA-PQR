import { useState } from "react";
import Header from "./index";
import axiosInstance from "../axios/axios";
import { useRouter } from "next/router";
import useData from "../providers/DataContext";

export function login() {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const router = useRouter();

  const handleChance = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const { setLoading } = useData();

  ////Get information
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(credentials);
    var data = JSON.stringify({
      email: credentials.email,
      password: credentials.password,
    });

    const response = await axiosInstance.post("/session/app/login", data);
    console.log(response.data);
    setLoading(false);
    router.push("/pqr");
  };

  return (
    <div className="container">
      <Header />
      <h1>LOGIN</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" type="email" onChange={handleChance} />
        </label>
        <label>
          Password
          <input name="password" type="password" onChange={handleChance} />
        </label>

        <input type="submit" />
      </form>
    </div>
  );
}

export default login;
