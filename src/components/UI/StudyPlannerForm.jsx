import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";

// Train model based on past study data (mocked for now)
const trainModel = async (data) => {
  const inputs = data.map((d) => [d.focusLevel]); // Using focus level as input
  const labels = data.map((d) => d.duration); // Duration is the output

  const inputTensor = tf.tensor2d(inputs);
  const labelTensor = tf.tensor2d(labels, [labels.length, 1]);

  const model = tf.sequential();
  model.add(tf.layers.dense({ inputShape: [1], units: 1 })); // Simple linear regression
  model.compile({ optimizer: "sgd", loss: "meanSquaredError" });

  await model.fit(inputTensor, labelTensor, { epochs: 100 }); // Train the model
  return model;
};

// Predict study duration based on focus level
const predictDuration = (model, focusLevel) => {
  const input = tf.tensor2d([[focusLevel]]);
  const prediction = model.predict(input);
  return prediction.dataSync()[0]; // Returning predicted value
};

export default function StudyPlannerForm({ onGenerate }) {
  const [subjects, setSubjects] = useState("");
  const [hours, setHours] = useState(2);

  // Handle form submit to generate the study plan
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Mock data (replace with data from backend later)
    const mockData = [
      { subject: "Math", focusLevel: 3, duration: 1.5 },
      { subject: "English", focusLevel: 4, duration: 2 },
      { subject: "Science", focusLevel: 2, duration: 1.2 },
    ];

    const model = await trainModel(mockData); // Train the model

    const subjectList = subjects.split(",").map((s) => s.trim());
    const schedule = subjectList.map((subject) => {
      const randomFocus = Math.floor(Math.random() * 5) + 1; // Simulate a focus level between 1 and 5
      const predicted = predictDuration(model, randomFocus).toFixed(1); // Get predicted duration
      return { subject, duration: predicted };
    });

    onGenerate(schedule); // Pass the generated schedule to parent component
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
      <input
        className="w-full p-2 border rounded"
        placeholder="Subjects (comma-separated)"
        value={subjects}
        onChange={(e) => setSubjects(e.target.value)}
      />
      <input
        className="w-full p-2 border rounded"
        type="number"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded"
        type="submit">
        Generate Schedule
      </button>
    </form>
  );
}
