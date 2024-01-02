/*
  Warnings:

  - You are about to drop the `Commande` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_produitId_fkey";

-- DropForeignKey
ALTER TABLE "Commande" DROP CONSTRAINT "Commande_userId_fkey";

-- DropTable
DROP TABLE "Commande";

-- CreateTable
CREATE TABLE "Orderitem" (
    "id" SERIAL NOT NULL,
    "status" "Status" NOT NULL,
    "userId" INTEGER NOT NULL,
    "produitId" INTEGER NOT NULL,
    "orderId" INTEGER NOT NULL,

    CONSTRAINT "Orderitem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Orderitem" ADD CONSTRAINT "Orderitem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orderitem" ADD CONSTRAINT "Orderitem_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orderitem" ADD CONSTRAINT "Orderitem_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
