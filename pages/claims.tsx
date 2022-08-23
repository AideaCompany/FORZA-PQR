import { Layout, message } from "antd";
import { useEffect, useState } from "react";
import { IClaims } from "../types/interfaces/claims";
import ListClaims from "../components/claims/listClaims";
import FormClaims from "../components/claims/formclaims";
import useData from "../providers/DataContext";

const Claims = () => {
  return (
    <Layout>
      <h2>RECLAMOS</h2>
      <FormClaims />
      <ListClaims />
    </Layout>
  );
};

export default Claims;
