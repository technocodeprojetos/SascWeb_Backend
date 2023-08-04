import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../errors/AppError";
import { ICreateCobrancasDTO, IReadFilesDTO } from "../dtos/ICreateCobrancasDTO";
import { ICobrancasRepository } from "../repositories/ICobrancasRepository"
import { uploadfile } from "../../../configs/upload";
import fs from 'fs';



@injectable()
class CreateCobrancaUseCase{
    constructor(
        @inject("CobrancaRepository") 
        private cobrancasRepository: ICobrancasRepository
    ){}

    async execute({ nome, matricula, dataCobranca, valor }: ICreateCobrancasDTO){
        const cobranca = await this.cobrancasRepository.create({
            nome, 
            matricula, 
            dataCobranca, 
            valor
        });

        return cobranca;
    }


}

export { CreateCobrancaUseCase }