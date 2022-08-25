import { useState } from "react";
import axiosInstance from "../../axios/axios";
import { useRouter } from "next/router";
import useData from "../../providers/DataContext";
import { Button, Card, Form, Input, message, Select, Switch } from "antd";
import { IClaims, unityTime } from "../../types/interfaces/claims";
import UploadPhoto from "../uploadPhoto";

export function claims() {
  const { setLoading } = useData();
  const { Option } = Select;

  const onFinish = async (data: IClaims) => {
    setLoading(true);
    try {
      await axiosInstance.post("/claims", data);
      message.success("Creado con éxito");
    } catch (error) {
      message.error("Ocurrió un error, intenta mas tarde");
    }
    setLoading(false);
    console.log(data);
  };
  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };

  return (
    <div className="container_create_sales">
      <Form
        autoComplete="off"
        onFinish={onFinish}
        initialValues={{ remember: true }}
      >
        <div className="container_form_item">
          <Form.Item
            label="¿Que problema tuviste con tu paquete?"
            name="problem"
            rules={[
              { required: true, message: "Por favor ingresa el problema" },
            ]}
          >
            <Select
              defaultValue="Seleccione el problema"
              style={{ width: 200 }}
            >
              {Object.keys(unityTime).map((e) => (
                <Select.Option key={e} value={e}>
                  <>
                    {
                      //@ts-ignore
                      unityTime[e]
                    }
                  </>
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Agregue una breve descripción"
            name="description"
            rules={[
              { required: true, message: "Por favor ingrese la descripción" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="¿Desea agregar evidencia fotográfica?"
            name="photos"
          >
            <Switch defaultChecked onChange={onChange} />
            <UploadPhoto name="img1" required={true} />
            <UploadPhoto name="img2" required={false} />
            <UploadPhoto name="img3" required={false} />
          </Form.Item>
          <Form.Item></Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Crear
            </Button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}

export default claims;
