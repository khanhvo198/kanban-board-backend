/*
  Warnings:

  - Added the required column `taskId` to the `Comment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fileName` to the `File` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "taskId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "File" ADD COLUMN     "fileName" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "Task"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
