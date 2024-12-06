/*
  Warnings:

  - Added the required column `colorScheme` to the `Tag` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Tag" ADD COLUMN     "colorScheme" TEXT NOT NULL;
