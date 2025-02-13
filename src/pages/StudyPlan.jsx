import React from "react";

function StudyPlan() {
  const semesters = [
    {
      name: "1-semestr",
      subjects: [
        { name: "Oliy matematika", credits: 6, hours: 180, type: "Majburiy" },
        {
          name: "Dasturlash asoslari",
          credits: 5,
          hours: 150,
          type: "Majburiy",
        },
        { name: "Fizika", credits: 4, hours: 120, type: "Majburiy" },
      ],
    },
    {
      name: "2-semestr",
      subjects: [
        {
          name: "Ma'lumotlar tuzilmasi",
          credits: 5,
          hours: 150,
          type: "Majburiy",
        },
        { name: "Web dasturlash", credits: 6, hours: 180, type: "Majburiy" },
        { name: "Database", credits: 4, hours: 120, type: "Majburiy" },
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">O'quv reja</h2>

      {semesters.map((semester, index) => (
        <div key={index} className="bg-white rounded-lg shadow">
          <div className="p-4 border-b bg-gray-50">
            <h3 className="text-lg font-semibold text-gray-800">
              {semester.name}
            </h3>
          </div>
          <div className="p-4">
            <table className="w-full">
              <thead>
                <tr className="text-left">
                  <th className="pb-3 text-gray-600">Fan nomi</th>
                  <th className="pb-3 text-gray-600">Kreditlar</th>
                  <th className="pb-3 text-gray-600">Soatlar</th>
                  <th className="pb-3 text-gray-600">Turi</th>
                </tr>
              </thead>
              <tbody>
                {semester.subjects.map((subject, subIndex) => (
                  <tr key={subIndex} className="border-t">
                    <td className="py-3">{subject.name}</td>
                    <td className="py-3">{subject.credits}</td>
                    <td className="py-3">{subject.hours}</td>
                    <td className="py-3">{subject.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between text-sm">
              <span>
                Jami kreditlar:{" "}
                {semester.subjects.reduce((acc, curr) => acc + curr.credits, 0)}
              </span>
              <span>
                Jami soatlar:{" "}
                {semester.subjects.reduce((acc, curr) => acc + curr.hours, 0)}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StudyPlan;
