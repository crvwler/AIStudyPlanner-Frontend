import * as tf from "@tensorflow/tfjs";

const trainingData = tf.tensor2d([
  [5, 70, 10, 3],
  [3, 85, 5, 2],
  [4, 60, 8, 4],
  [2, 90, 3, 1],
  [1, 95, 2, 1],
]);

const targetData = tf.tensor2d([[2.5], [1.5], [3], [1], [0.5]]);

const normalizeInputs = (inputs) => {
  return [
    Math.min(5, Math.max(1, inputs[0])) / 5, // Normalize difficulty to 0-1
    inputs[1] / 100, // Normalize performance to 0-1
    Math.min(10, inputs[2]) / 10, // Normalize available time to 0-10
    Math.min(5, Math.max(1, inputs[3])) / 5, // Normalize priority to 0-1
  ];
};

let model;

export const createAndTrainModel = async () => {
  model = tf.sequential();

  model.add(tf.layers.dense({ inputShape: [4], units: 8, activation: "relu" }));
  model.add(tf.layers.dense({ units: 4, activation: "relu" }));
  model.add(tf.layers.dense({ units: 1 }));

  model.compile({ optimizer: "adam", loss: "meanSquaredError" });

  await model.fit(trainingData, targetData, {
    epochs: 100,
    shuffle: true,
    callbacks: {
      onEpochEnd: (epoch, logs) =>
        console.log(`Epoch ${epoch}: Loss = ${logs.loss.toFixed(4)}`),
    },
  });
};

// Predict study hours
export const predictStudyHours = async (input) => {
  if (!model) {
    await createAndTrainModel();
  }
  const normalizedInputs = normalizeInputs(input);
  const inputTensor = tf.tensor2d([normalizedInputs]);
  const prediction = model.predict(inputTensor);
  const value = await prediction.data();
  return value[0].toFixed(2);
};
