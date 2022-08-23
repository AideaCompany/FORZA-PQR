import { IBasicTable } from "./basicTable"

export interface IClaims extends IBasicTable {
    problem: string
    description: string
}
