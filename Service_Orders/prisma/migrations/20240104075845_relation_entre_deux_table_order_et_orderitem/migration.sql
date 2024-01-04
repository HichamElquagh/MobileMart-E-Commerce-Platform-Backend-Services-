/*
  Warnings:

  - You are about to drop the column `orderId` on the `Orderitem` table. All the data in the column will be lost.
  - Added the required column `orderId` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Orderitem" DROP CONSTRAINT "Orderitem_orderId_fkey";

-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "orderId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Orderitem" DROP COLUMN "orderId";

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orderitem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
