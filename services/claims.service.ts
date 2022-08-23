import axiosInstance from "../axios/axios";
import { IClaims } from "../types/interfaces/claims";
import { convertTotable } from "../utils/tableUtilities";


export const listFrequencies = async (): Promise<IClaims[]> => {
    const { data } = await axiosInstance.get<IClaims[]>('/claims')
    return convertTotable(data)
}