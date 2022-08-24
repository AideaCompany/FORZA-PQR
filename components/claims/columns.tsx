import React from "react";
import { ColumnType } from "antd/lib/table";
import ColumnFactory from "../columnFactory";
import { unityTime } from "../../types/interfaces/claims";

const columns = (props: {
  beforeShowUpdate?: (param: any) => void;
  after: () => void;
}): ColumnType<any>[] => {
  const { after } = props;

  const operations = (record: any) => <></>;

  return ColumnFactory({
    columns: [
      {
        name: "problem",
        search: true,
        title: "Problema",
        //@ts-ignore
        customRender: (value: unityTime) => unityTime[value],
      },
      {
        name: "Description",
        search: true,
        title: "Descripción",
      },
    ],
    operations: operations,
    nonShowOperation: false,
  });
};

export default columns;
