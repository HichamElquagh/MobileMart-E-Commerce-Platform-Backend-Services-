-- CreateEnum
CREATE TYPE "Status" AS ENUM ('TRAITEE', 'EN_COURS_DE_TRAITEMENT', 'EXPEDIEE');

-- CreateTable
CREATE TABLE "Produit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "prix" INTEGER NOT NULL,

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commande" (
    "id" SERIAL NOT NULL,
    "quantite" INTEGER NOT NULL,
    "status" "Status" NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Commande" ADD CONSTRAINT "Commande_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
