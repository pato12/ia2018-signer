import * as tf from '@tensorflow/tfjs';

import { getModel } from './model';

const LEARNING_RATE = 0.0001;

export async function trainModel(data, onLog) {
  const model = await getModel();
  const optimizer = tf.train.adam(LEARNING_RATE);

  model.compile({ optimizer, loss: 'categoricalCrossentropy' });

  const batchSize = Math.floor(data.xs.shape[0] * 0.4);

  await model.fit(data.xs, data.ys, {
    batchSize,
    epochs: 20,
    callbacks: {
      onBatchEnd: async (batch, logs) => {
        console.log('Loss: ' + logs.loss.toFixed(5));

        if (onLog) onLog(logs);
      }
    }
  });

  return model;
}
