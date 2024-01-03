/*
  Warnings:

  - You are about to drop the column `quantity` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Orderitem` table. All the data in the column will be lost.
  - Added the required column `status` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Orderitem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "quantity",
ADD COLUMN     "status" "Status" NOT NULL;

-- AlterTable
ALTER TABLE "Orderitem" DROP COLUMN "status",
ADD COLUMN     "quantity" INTEGER NOT NULL;
