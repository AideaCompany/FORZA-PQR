import { useState } from "react";
import List from "./listClaims";
import Header from "./index";
import axiosInstance from "./config/axios";
import { useRouter } from "next/router";

export function claims() {
  const [credentials, setCredentials] = useState({
    problem: "",
    description: "",
  });

  const router = useRouter();

  const handleChance = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  ////Get information
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    var data = JSON.stringify({
      problem: credentials.problem,
      description: credentials.description,
    });

    const response = await axiosInstance.post("/claims", data);
    console.log(response.data);

    router.push("/listClaims");
  };

  return (
    <div className="container">
      <Header />
      <h1>RECLAMOS</h1>
      <div className="df">
        <form onSubmit={handleSubmit}>
          <label>¿Qué problema tuviste con tu paquete?</label>
          <select name="problem" onChange={handleChance}>
            <option>Seleccione una opción</option>
            <option>Caja dañada</option>
            <option>No llego el pedido</option>
            <option>No era lo que esperaba</option>
          </select>
          <label>
            Descripción
            <textarea
              name="description"
              onChange={handleChance}
              placeholder="Descripción"
            />
          </label>

          <input type="submit" />
        </form>
        <List></List>
      </div>
    </div>
  );
}

export default claims;
