import { Cobranca } from "@prisma/client";
import { prismaClient } from "../../../../database/prismaClient";
import { AppError } from "../../../../errors/AppError";
import { ICreateCobrancasDTO } from "../../dtos/ICreateCobrancasDTO";
import { ICobrancasRepository } from "../ICobrancasRepository";

class CobrancaRepository implements ICobrancasRepository{


    async create({ nome, matricula, dataCobranca, valor }: ICreateCobrancasDTO): Promise<Cobranca> {
        const cobrancas = await prismaClient.cobranca.create({
            data: {
                nome, 
                matricula, 
                dataCobranca, 
                valor
            }
        })
        return cobrancas;
    }
}

export { CobrancaRepository }