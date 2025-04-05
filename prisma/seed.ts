import { Day, PrismaClient, UserSex } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // ADMIN
  await prisma.admin.createMany({
    data: [
      { id: "admin1", username: "admin1" },
      { id: "admin2", username: "admin2" },
    ],
    skipDuplicates: true,
  });

  // GRADES
  for (let i = 1; i <= 6; i++) {
    await prisma.grade.create({
      data: {
        id: i, // 👈 this line is important
        level: i,
      },
    });
  }

  // CLASSES
  await Promise.all(
    Array.from({ length: 6 }, (_, i) =>
      prisma.class.create({
        data: {
          name: `${i + 1}A`,
          gradeId: i + 1,
          capacity: Math.floor(Math.random() * (20 - 15 + 1)) + 15,
        },
      })
    )
  );

  // SUBJECTS
  const subjects = [
    "Mathematics",
    "Science",
    "English",
    "History",
    "Geography",
    "Physics",
    "Chemistry",
    "Biology",
    "Computer Science",
    "Art",
  ];

  await prisma.subject.createMany({
    data: subjects.map((name) => ({ name })),
    skipDuplicates: true,
  });

  // TEACHERS
  for (let i = 1; i <= 15; i++) {
    await prisma.teacher.create({
      data: {
        id: `teacher${i}`,
        username: `teacher${i}`,
        name: `TName${i}`,
        surname: `TSurname${i}`,
        email: `teacher${i}@example.com`,
        phone: `123-456-789${i}`,
        address: `Address${i}`,
        bloodType: "A+",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        subjects: { connect: [{ id: (i % 10) + 1 }] },
        classes: { connect: [{ id: (i % 6) + 1 }] },
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 30)),
      },
    });
  }

  // LESSONS
  const days = Object.values(Day);
  for (let i = 1; i <= 30; i++) {
    const hour = 8 + (i % 6); // Vary time slots
    await prisma.lesson.create({
      data: {
        name: `Lesson${i}`,
        day: days[i % days.length],
        startTime: new Date(new Date().setHours(hour, 0, 0, 0)),
        endTime: new Date(new Date().setHours(hour + 1, 0, 0, 0)),
        subjectId: (i % 10) + 1,
        classId: (i % 6) + 1,
        teacherId: `teacher${(i % 15) + 1}`,
      },
    });
  }

  // PARENTS
  await Promise.all(
    Array.from({ length: 25 }, (_, i) =>
      prisma.parent.create({
        data: {
          id: `parentId${i + 1}`,
          username: `parentId${i + 1}`,
          name: `PName ${i + 1}`,
          surname: `PSurname ${i + 1}`,
          email: `parent${i + 1}@example.com`,
          phone: `123-456-789${i + 1}`,
          address: `Address${i + 1}`,
        },
      })
    )
  );

  // STUDENTS
  for (let i = 1; i <= 50; i++) {
    await prisma.student.create({
      data: {
        id: `student${i}`,
        username: `student${i}`,
        name: `SName${i}`,
        surname: `SSurname${i}`,
        email: `student${i}@example.com`,
        phone: `987-654-321${i}`,
        address: `Address${i}`,
        bloodType: "O-",
        sex: i % 2 === 0 ? UserSex.MALE : UserSex.FEMALE,
        parentId: `parentId${((i - 1) % 25) + 1}`,
        gradeId: (i % 6) + 1,
        classId: (i % 6) + 1,
        birthday: new Date(new Date().setFullYear(new Date().getFullYear() - 10)),
      },
    });
  }

  // EXAMS
  for (let i = 1; i <= 10; i++) {
    await prisma.exam.create({
      data: {
        title: `Exam ${i}`,
        startTime: new Date(Date.now() + i * 3600000),
        endTime: new Date(Date.now() + (i + 2) * 3600000),
        lessonId: (i % 30) + 1,
      },
    });
  }

  // ASSIGNMENTS
  for (let i = 1; i <= 10; i++) {
    await prisma.assignment.create({
      data: {
        title: `Assignment ${i}`,
        startDate: new Date(),
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        lessonId: (i % 30) + 1,
      },
    });
  }

  // RESULTS
  for (let i = 1; i <= 10; i++) {
    await prisma.result.create({
      data: {
        score: Math.floor(Math.random() * 40) + 60,
        studentId: `student${i}`,
        ...(i <= 5 ? { examId: i } : { assignmentId: i - 5 }),
      },
    });
  }

  // ATTENDANCE
  for (let i = 1; i <= 10; i++) {
    await prisma.attendance.create({
      data: {
        date: new Date(),
        present: Math.random() > 0.2,
        studentId: `student${i}`,
        lessonId: (i % 30) + 1,
      },
    });
  }

  // EVENTS
  for (let i = 1; i <= 5; i++) {
    await prisma.event.create({
      data: {
        title: `Event ${i}`,
        description: `Description for Event ${i}`,
        startTime: new Date(Date.now() + i * 3600000),
        endTime: new Date(Date.now() + (i + 2) * 3600000),
        classId: (i % 6) + 1,
      },
    });
  }

  // ANNOUNCEMENTS
  for (let i = 1; i <= 5; i++) {
    await prisma.announcement.create({
      data: {
        title: `Announcement ${i}`,
        description: `Description for Announcement ${i}`,
        date: new Date(),
        classId: (i % 6) + 1,
      },
    });
  }

  console.log("✅ Seeding completed successfully.");
}

main()
  .catch(async (e) => {
    console.error("❌ Seeding failed:", e);
    await prisma.$disconnect();
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
