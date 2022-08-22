import { useEffect, useState } from "react";
import { Button, Confirm } from "semantic-ui-react";
import { useRouter } from "next/router";
import axiosInstance from "./config/axios";

export function listClaims() {
  const [claims, setClaims] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await axiosInstance.get("/claims");
    setClaims(response.data);
  };

  const handleDelete = async (id: string) => {
    console.log(id);

    const res = await axiosInstance.post(`/claims/${id}`);
    console.log(res);

    getData();
  };

  const [openConfirm, setOpenConfirm] = useState(false);

  const router = useRouter();

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
              <button onClick={() => setOpenConfirm(true)}>BORRAR</button>
            </div>
          );
        })}
      </div>
      <Confirm
        header="Delete a Claim"
        content={`Are you sure want to delete a claim ${router.query.id} ?`}
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() =>
          typeof router.query.id === "string" && handleDelete(router.query.id)
        }
      />
    </div>
  );
}

export default listClaims;
