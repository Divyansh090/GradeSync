"use client";

interface Result {
  id: number;
  score: number;
  exam: {
    id: number;
    title: string;
    lesson: {
      name: string;
      subject: {
        name: string;
      };
    };
  } | null;
  assignment: {
    id: number;
    title: string;
    lesson: {
      name: string;
      subject: {
        name: string;
      };
    };
  } | null;
}

interface GradesTableProps {
  results: Result[];
}

export function GradesTable({ results }: GradesTableProps) {
  // Group results by subject
  const resultsBySubject = results.reduce((acc: Record<string, any[]>, result) => {
    const subject = result.exam?.lesson.subject.name || result.assignment?.lesson.subject.name || 'Unknown';
    
    if (!acc[subject]) {
      acc[subject] = [];
    }
    
    acc[subject].push(result);
    return acc;
  }, {});
  
  // Calculate average score for each subject
  const subjectAverages = Object.keys(resultsBySubject).map(subject => {
    const grades = resultsBySubject[subject];
    const total = grades.reduce((sum, grade) => sum + grade.score, 0);
    const average = total / grades.length;
    
    return {
      subject,
      average,
      count: grades.length,
    };
  });
  
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {subjectAverages.map((subjectData, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow border border-gray-100">
            <div className="text-gray-500 mb-1">{subjectData.subject}</div>
            <div className="text-2xl font-bold">
              {subjectData.average.toFixed(1)}%
              <span className="text-sm text-gray-400 ml-1">({subjectData.count} assessments)</span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {results.map((result) => (
              <tr key={result.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {result.exam?.lesson.subject.name || result.assignment?.lesson.subject.name || 'Unknown'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.exam ? 'Exam' : 'Assignment'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {result.exam?.title || result.assignment?.title || 'Unknown'}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      result.score >= 70 
                        ? 'bg-green-100 text-green-800' 
                        : result.score >= 50 
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {result.score}%
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
