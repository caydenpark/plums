-- AlterTable
ALTER TABLE "Topic" ADD COLUMN     "parent_id" INTEGER;

-- CreateTable
CREATE TABLE "Label" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "date_added" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "date_updated" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TopicLabels" (
    "topic_id" INTEGER NOT NULL,
    "label_id" INTEGER NOT NULL,

    CONSTRAINT "TopicLabels_pkey" PRIMARY KEY ("topic_id","label_id")
);

-- CreateTable
CREATE TABLE "_TopicLabels" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Label_name_key" ON "Label"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_TopicLabels_AB_unique" ON "_TopicLabels"("A", "B");

-- CreateIndex
CREATE INDEX "_TopicLabels_B_index" ON "_TopicLabels"("B");

-- CreateIndex
CREATE INDEX "Topic_parent_id_idx" ON "Topic"("parent_id");

-- AddForeignKey
ALTER TABLE "Topic" ADD CONSTRAINT "Topic_parent_id_fkey" FOREIGN KEY ("parent_id") REFERENCES "Topic"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicLabels" ADD CONSTRAINT "TopicLabels_topic_id_fkey" FOREIGN KEY ("topic_id") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TopicLabels" ADD CONSTRAINT "TopicLabels_label_id_fkey" FOREIGN KEY ("label_id") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TopicLabels" ADD CONSTRAINT "_TopicLabels_A_fkey" FOREIGN KEY ("A") REFERENCES "Label"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TopicLabels" ADD CONSTRAINT "_TopicLabels_B_fkey" FOREIGN KEY ("B") REFERENCES "Topic"("id") ON DELETE CASCADE ON UPDATE CASCADE;
