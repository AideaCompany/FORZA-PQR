import { useState } from "react";
import axiosInstance from "../../axios/axios";
import { useRouter } from "next/router";
import useData from "../../providers/DataContext";
import { IClaims } from "../../types/interfaces/claims";

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

  const { setLoading } = useData();

  ////Get information
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(credentials);
    var data = JSON.stringify({
      problem: credentials.problem,
      description: credentials.description,
    });
    setLoading(true);
    try {
      await axiosInstance.post("/claims", data);
    } catch (error) {}
    setLoading(false);
  };

  return (
    <div className="container">
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
      </div>
    </div>
  );
}

export default claims;
