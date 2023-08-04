interface IReadFilesDTO {
    filename: string
    fieldname?: string
}


interface ICreateCobrancasDTO {
    matricula: string;
    nome: string;
    dataCobranca: string;
    valor: number;
}



export { ICreateCobrancasDTO, IReadFilesDTO }