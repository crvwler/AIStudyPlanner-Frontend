import React, { useState } from "react";
import StudyPlannerForm from "../components/UI/StudyPlannerForm";

export default function StudyPlannerPage() {
  const [plan, setPlan] = useState([]);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">Custom Study Planner</h1>
      <StudyPlannerForm onGenerate={setPlan} />
      {plan.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-2">Your Schedule</h2>
          <ul className="list-disc list-inside">
            {plan.map((item, i) => (
              <li key={i}>
                {item.subject.trim()}: {item.duration} hr/day
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
