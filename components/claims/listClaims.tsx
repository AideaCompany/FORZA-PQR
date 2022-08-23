import { useEffect, useState } from "react";
import { Confirm } from "semantic-ui-react";
import { useRouter } from "next/router";
import axiosInstance from "../../axios/axios";
import useData from "../../providers/DataContext";
import { IClaims } from "../../types/interfaces/claims";
import { Tooltip } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

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
    setOpenConfirm(false);
    getData();
  };

  const [openConfirm, setOpenConfirm] = useState(false);
  const [claimToDelete, setclaimToDelete] = useState<IClaims>();

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
              <Tooltip placement="top" title="Eliminar">
                <a>
                  <DeleteOutlined
                    style={{
                      paddingLeft: "5px",
                      fontSize: "18px",
                      color: "red",
                    }}
                    onClick={() => (
                      setclaimToDelete(claim), setOpenConfirm(true)
                    )}
                  />
                </a>
              </Tooltip>
            </div>
          );
        })}
      </div>
      <Confirm
        header="Delete a Claim"
        content={`Are you sure want to delete a claim ${claimToDelete?.id} ?`}
        open={openConfirm}
        onCancel={() => setOpenConfirm(false)}
        onConfirm={() => handleDelete(claimToDelete?.id)}
      />
    </div>
  );
}

export default listClaims;
