/*
  Warnings:

  - Added the required column `title` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "profile" ADD COLUMN     "title" TEXT NOT NULL;
