-- DropForeignKey
ALTER TABLE "DepartmentRelation" DROP CONSTRAINT "DepartmentRelation_childId_fkey";

-- DropForeignKey
ALTER TABLE "DepartmentRelation" DROP CONSTRAINT "DepartmentRelation_parentId_fkey";

-- AddForeignKey
ALTER TABLE "DepartmentRelation" ADD CONSTRAINT "DepartmentRelation_childId_fkey" FOREIGN KEY ("childId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DepartmentRelation" ADD CONSTRAINT "DepartmentRelation_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "Department"("id") ON DELETE CASCADE ON UPDATE CASCADE;
