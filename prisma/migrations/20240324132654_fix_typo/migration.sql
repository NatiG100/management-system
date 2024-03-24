/*
  Warnings:

  - The primary key for the `DepartmentRelation` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `chaildId` on the `DepartmentRelation` table. All the data in the column will be lost.
  - Added the required column `childId` to the `DepartmentRelation` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "DepartmentRelation" DROP CONSTRAINT "DepartmentRelation_chaildId_fkey";

-- AlterTable
ALTER TABLE "DepartmentRelation" DROP CONSTRAINT "DepartmentRelation_pkey",
DROP COLUMN "chaildId",
ADD COLUMN     "childId" TEXT NOT NULL,
ADD CONSTRAINT "DepartmentRelation_pkey" PRIMARY KEY ("parentId", "childId");

-- AddForeignKey
ALTER TABLE "DepartmentRelation" ADD CONSTRAINT "DepartmentRelation_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Department"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
