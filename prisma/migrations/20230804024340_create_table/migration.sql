/*
  Warnings:

  - You are about to alter the column `valor` on the `cobrancas` table. The data in that column could be lost. The data in that column will be cast from `DoublePrecision` to `Decimal(65,30)`.

*/
-- AlterTable
ALTER TABLE "cobrancas" ALTER COLUMN "valor" SET DATA TYPE DECIMAL(65,30);
