import { getModel } from './model';
import { getMobilenet } from './mobilenet';

export async function getPrediction(image) {
  const mobilenet = await getMobilenet();
  const model = await getModel();

  const activation = mobilenet.predict(image);
  const output = model.predict(activation);

  const prediction = output.as1D().argMax().dataSync()[0];
  const result = new Array(...output.as1D().dataSync()).map((acc, p) => ({ acc: Math.round(acc * 10000) / 10000, person: p + 1 }))

  return {
    result,
    prediction: prediction + 1,
  };
}
