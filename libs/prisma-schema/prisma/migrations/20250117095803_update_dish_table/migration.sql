/*
  Warnings:

  - You are about to drop the column `orderId` on the `dish` table. All the data in the column will be lost.
  - Added the required column `dishes` to the `order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "dish" DROP CONSTRAINT "dish_orderId_fkey";

-- AlterTable
ALTER TABLE "dish" DROP COLUMN "orderId";

-- AlterTable
ALTER TABLE "order" ADD COLUMN     "dishes" JSONB NOT NULL;
