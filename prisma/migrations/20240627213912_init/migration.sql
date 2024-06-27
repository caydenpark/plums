/*
  Warnings:

  - Added the required column `type` to the `Attachment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Attachment" ADD COLUMN     "type" "FileType" NOT NULL;

-- CreateIndex
CREATE INDEX "Attachment_topic_id_idx" ON "Attachment"("topic_id");

-- CreateIndex
CREATE INDEX "Image_topic_id_idx" ON "Image"("topic_id");

-- CreateIndex
CREATE INDEX "Link_topic_id_idx" ON "Link"("topic_id");

-- CreateIndex
CREATE INDEX "Note_topic_id_idx" ON "Note"("topic_id");
