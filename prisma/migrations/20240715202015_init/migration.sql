/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Topic` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `Topic` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Topic_parent_id_idx";

-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "first_name" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_first_name_key" ON "User"("first_name");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Topic_user_id_key" ON "Topic"("user_id");

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
