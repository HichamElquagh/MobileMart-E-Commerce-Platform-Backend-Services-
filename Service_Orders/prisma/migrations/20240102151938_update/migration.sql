-- DropForeignKey
ALTER TABLE "Orderitem" DROP CONSTRAINT "Orderitem_orderId_fkey";

-- AlterTable
ALTER TABLE "Orderitem" ALTER COLUMN "orderId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Orderitem" ADD CONSTRAINT "Orderitem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;
