import { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useRouter } from "next/router";
import axiosInstance from "../../axios/axios";
import useData from "../../providers/DataContext";
import { IClaims } from "../../types/interfaces/claims";
import { Modal } from "antd";

export function listClaims(props: {
  record: any;
  afterDelete?: () => void;
  onDelete: (id: string) => void;
}) {
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

  const { onDelete } = props;

  const deleteModal = (item: any) => {
    Modal.confirm({
      title: `Eliminar ${item.problem as string}?`,
      okText: "Eliminar",
      onOk: () => onDelete(item.id),
      cancelText: "Cancelar",
      centered: true,
      maskClosable: true,
      okCancel: true,
    });
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
              <EditOutlined
                style={{ fontSize: "15px", color: "blue", cursor: "pointer" }}
              />
              <DeleteOutlined
                style={{ fontSize: "15px", color: "red", cursor: "pointer" }}
                onClick={deleteModal}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default listClaims;
