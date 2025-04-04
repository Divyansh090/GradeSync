import prisma from "@/lib/prisma";

interface StudentAttendanceCardProps {
  id: string;
}

const StudentAttendanceCard = async ({ id }: StudentAttendanceCardProps) => {
  const cacheBuster = Date.now();

  // Fetch student details with attendance data
  const student = await prisma.student.findUnique({
    where: { id },
    select: {
      totalClasses: true,
      takenClasses: true,
    },
  });

  if (!student) {
    return <div className="p-4 bg-white rounded-lg shadow text-center">Student not found</div>;
  }

  // Log the values to check what's being retrieved
  console.log("Student attendance data:", {
    id,
    totalClasses: student.totalClasses,
    takenClasses: student.takenClasses
  });

  // Calculate percentage safely
  const percentage =
    student.totalClasses > 0 
      ? Math.round((student.takenClasses / student.totalClasses) * 100) 
      : 0;

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <div className="text-3xl font-bold text-center">{percentage}%</div>
      <div className="text-center text-gray-500">Attendance</div>
      <div className="text-xs text-gray-400 mt-2 text-center">
        Classes attended: {student.takenClasses} / {student.totalClasses}
      </div>
    </div>
  );
};

export default StudentAttendanceCard;