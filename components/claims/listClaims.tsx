import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import axiosInstance from "../../axios/axios";
import useData from "../../providers/DataContext";
import { IClaims } from "../../types/interfaces/claims";

export function listClaims() {
  const [claims, setClaims] = useState([]);
  const { setLoading } = useData();
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    setLoading(true);
    const response = await axiosInstance.get("/claims");
    setClaims(response.data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    console.log(id);

    const res = await axiosInstance.post(`/claims/${id}`);
    console.log(res);

    getData();
  };

  return (
    <div className="container">
      <h1>LISTA RECLAMOS</h1>
      <div className="claims-container">
        {claims.map((claim) => {
          return (
            <div className="df aic">
              <label>Problema</label>
              <span>{claim.problem}</span>
              <label>Descripción</label>
              <span>{claim.description}</span>
              <EditOutlined />
              <DeleteOutlined />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default listClaims;
