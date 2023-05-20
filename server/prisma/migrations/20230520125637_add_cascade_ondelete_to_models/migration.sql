/*
  Warnings:

  - You are about to drop the column `imagePath` on the `users` table. All the data in the column will be lost.
  - Added the required column `image_path` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_owner_id_fkey";

-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_pin_id_fkey";

-- DropForeignKey
ALTER TABLE "pins" DROP CONSTRAINT "pins_owner_id_fkey";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "imagePath",
ADD COLUMN     "image_path" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "pins" ADD CONSTRAINT "pins_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_pin_id_fkey" FOREIGN KEY ("pin_id") REFERENCES "pins"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_owner_id_fkey" FOREIGN KEY ("owner_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
