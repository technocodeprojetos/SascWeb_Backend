import { Cobranca } from "@prisma/client";
import { ICreateCobrancasDTO } from "../dtos/ICreateCobrancasDTO"

interface ICobrancasRepository {
    create({ nome, matricula, dataCobranca, valor }: ICreateCobrancasDTO): Promise<Cobranca>
}

export { ICobrancasRepository }