import { Spin } from "antd";
import React, { useContext, useEffect, useState } from "react";
//import { listPrivilegeFn, listSectionsFn } from '../services/sesssion.service'

//import { Privilege, Sections } from '../types/types'
type DataContext = {
  //privilege: Privilege[]
  //section: Sections[]
  getData: () => Promise<void>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

const DataContext = React.createContext<DataContext>({} as DataContext);

export const DataProvider = (props: { children: JSX.Element }) => {
  //props
  const { children } = props;

  //states
  //const [privilege, setPrivilege] = useState<Privilege[]>([])
  //const [section, setSection] = useState<Sections[]>([])
  const [loading, setLoading] = useState(false);

  //effect
  useEffect(() => {
    getData();
  }, []);

  //functions
  const getData = async () => {
    //setLoading(true);
    //var privilege: Privilege[] = await listPrivilegeFn()
    //const sections: Sections[] = await listSectionsFn()
    //setPrivilege(privilege)
    //setSection(sections)
    //setLoading(false);
  };
  return (
    <DataContext.Provider
      value={{ setLoading, /*privilege, section,*/ getData }}
    >
      <Spin spinning={loading}>{children}</Spin>
    </DataContext.Provider>
  );
};

export default function useData() {
  return useContext(DataContext);
}
