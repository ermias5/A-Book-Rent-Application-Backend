-- AlterTable
ALTER TABLE "User" ADD COLUMN     "PhoneNumber" TEXT,
ADD COLUMN     "location" TEXT,
ALTER COLUMN "name" DROP NOT NULL;
