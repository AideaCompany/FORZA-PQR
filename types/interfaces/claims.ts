import { IBasicTable } from "./basicTable"

export interface IClaims extends IBasicTable {
    problem: string;
    description: string
}

export enum unityTime {
    "Caja Dañada" = "Caja Dañada",
    "No llego el pedido" = "No llego el pedido",
    "No era lo que esperaba" = "No era lo que esperaba"
}