import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCobrancaUseCase } from "../CreateCobrancaUseCase";
import parse from "csv-parse";
import { ICreateCobrancasDTO } from "../../dtos/ICreateCobrancasDTO";
import readline from "readline"
import { Readable } from "stream"
import interpretarPlanilha from "../../../../shared/utils/interpretarPlanilha";
import { prismaClient } from "../../../../database/prismaClient";
import path from "path";
import ejs  from "ejs";




export class CreateCobrancaController {
  async handle(request: Request, response: Response) {

    const { file } = request;
    const { buffer, originalname } = file;
    const fileExtension = originalname.split('.').pop();
    console.log(fileExtension)

    const readableFile = new Readable();
    readableFile.push(buffer);
    readableFile.push(null);

    const bookFile = readline.createInterface({
      input: readableFile,
    })

    let book: ICreateCobrancasDTO[] = []

    
    for await (let line of bookFile) {
      const bookLineSplit = line.split(";")
      console.log(bookLineSplit[1]);
      
      book.push({
        matricula: bookLineSplit[1],
        nome: bookLineSplit[2],
        dataCobranca: bookLineSplit[3],
        valor: parseFloat(bookLineSplit[4])
      })
    }
    
    const createCobrancaUseCase = container.resolve(CreateCobrancaUseCase);
    
    for await (let { matricula, nome, dataCobranca, valor } of book) {
      const cobranca = await createCobrancaUseCase.execute({
        matricula,
        nome,
        dataCobranca,
        valor,
      });
      
    }
    
    //leitura do ejs
    const filePath = path.join(__dirname, "../../../../",  "./shared/utils/printPDF.ejs")

    try {
      const leitura = await ejs.renderFile(filePath, { book }, (err, html) => {
        if(err) {
          return response.send('Erro na leitura do arquivo')
      }
  
      // enviar para o navegador
      return response.status(201).send(html)
      });
    } catch (err) {
      return response.send('Erro na leitura do arquivo');
    }
    
  }
}
