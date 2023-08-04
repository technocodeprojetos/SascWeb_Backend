import { IReadFilesDTO } from '../../modules/cobrancas/dtos/ICreateCobrancasDTO'; 
import fs from 'fs';
import { parse } from 'csv-parse';
import { resolve } from "path";
import { prismaClient } from "../../database/prismaClient";

export default async function interpretarPlanilha(dataToRead: IReadFilesDTO, tipoPlanilha: string): Promise<string[]> {
  //PLANILHA COBRANÇAS
  const uploadFolder = resolve(__dirname, '../../', 'Upload');
  const filePath = `${uploadFolder}/${dataToRead?.filename}`
  const filesInfo: string[] = []


  // IMPORTAÇÃO DAS PLANILHAS DE COBRANÇA PLANO SAÚDE
  fs.createReadStream(filePath, {
    encoding: 'utf-8',
    highWaterMark: 2,
  })
    .pipe(
      parse({
        delimiter: ';',
      }),
    )
    .on('data', (chunk: Array<any>) => {
      const currentLine: any = {
        matricula: chunk[1],
        nome: chunk[2],
        dataCobranca: chunk[3],
        valor: chunk[4]
      }

      //Validações dos campos planilha
      let isRegisterValid = true
      //console.log('hoje_test', currentLine.valor, );

      if ((!currentLine.matricula) || (!currentLine.nome) || (!currentLine.dataCobranca) || (!parseFloat(currentLine.valor))) {
        isRegisterValid = false
      }
      if (isRegisterValid) filesInfo.push(currentLine)
    })
    .on('end', async () => {      

      for await (let info of filesInfo) {

        await prismaClient.cobranca.create({
          data: {
            matricula: info[0],
            nome: info[1],
            dataCobranca: info[2],
            valor: parseFloat(info[3])
          },
        })

      }
    });

}