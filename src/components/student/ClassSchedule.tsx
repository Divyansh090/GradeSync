"use client";

interface LessonSchedule {
  id: number;
  name: string;
  day: string;
  startTime: Date;
  endTime: Date;
  subject: {
    name: string;
  };
  teacher: {
    name: string;
    surname: string;
  };
}

interface ClassScheduleProps {
  schedule: LessonSchedule[];
}

export function ClassSchedule({ schedule }: ClassScheduleProps) {
  const days = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
  
  // Group schedule by day
  const scheduleByDay = days.map(day => {
    const dayLessons = schedule.filter(lesson => lesson.day === day);
    return {
      day,
      lessons: dayLessons.sort((a, b) => 
        new Date(a.startTime).getTime() - new Date(b.startTime).getTime()
      )
    };
  });

  function formatTime(date: Date) {
    return new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  return (
    <div className="space-y-4">
      {scheduleByDay.map(({ day, lessons }) => (
        <div key={day} className="bg-white rounded-lg shadow overflow-hidden">
          <div className="bg-gray-50 px-4 py-2 border-b">
            <h3 className="font-medium">{day.charAt(0) + day.slice(1).toLowerCase()}</h3>
          </div>
          {lessons.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {lessons.map(lesson => (
                <div key={lesson.id} className="px-4 py-3 flex justify-between items-center">
                  <div>
                    <div className="font-medium">{lesson.subject.name}</div>
                    <div className="text-sm text-gray-500">
                      {lesson.teacher.name} {lesson.teacher.surname}
                    </div>
                  </div>
                  <div className="text-sm text-gray-500">
                    {formatTime(lesson.startTime)} - {formatTime(lesson.endTime)}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="px-4 py-3 text-gray-500 text-sm">No lessons scheduled</div>
          )}
        </div>
      ))}
    </div>
  );
}