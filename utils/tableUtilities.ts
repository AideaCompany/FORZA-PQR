
export const traductorTemporality = (value: any) => {

}



export const convertTotable = <T>(value: any[]): T[] => {
    return value.map(e => ({ ...e, key: e.id })).reverse()
}