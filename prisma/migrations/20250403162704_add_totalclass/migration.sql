/*
  Warnings:

  - Added the required column `takenClasses` to the `Student` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalClasses` to the `Student` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Student" ADD COLUMN     "takenClasses" INTEGER NOT NULL,
ADD COLUMN     "totalClasses" INTEGER NOT NULL;

-- CreateIndex
CREATE INDEX "Attendance_studentId_lessonId_date_idx" ON "Attendance"("studentId", "lessonId", "date");
