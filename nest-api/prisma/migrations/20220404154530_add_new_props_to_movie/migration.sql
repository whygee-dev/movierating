/*
  Warnings:

  - Added the required column `posterPath` to the `Movie` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Movie` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Movie" ADD COLUMN     "posterPath" TEXT NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL;
