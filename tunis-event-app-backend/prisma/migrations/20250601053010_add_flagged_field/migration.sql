-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "reported" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "rating" SET DEFAULT 0;
