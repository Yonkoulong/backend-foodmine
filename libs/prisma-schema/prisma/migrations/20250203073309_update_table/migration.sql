/*
  Warnings:

  - You are about to drop the column `code` on the `table` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[url]` on the table `table` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `status` to the `table` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `table` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "table_code_key";

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "status" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "table" DROP COLUMN "code",
ADD COLUMN     "status" BOOLEAN NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "table_url_key" ON "table"("url");
