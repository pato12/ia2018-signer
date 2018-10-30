import * as tf from '@tensorflow/tfjs';

let model;

export async function getModel() {
  if (model) {
    return model;
  }

  model = tf.sequential({
    layers: [
      tf.layers.flatten({ inputShape: [7, 7, 256] }),
      tf.layers.dense({
        units: 200,
        activation: 'relu',
        kernelInitializer: 'varianceScaling',
        useBias: true
      }),
      tf.layers.dense({
        units: 10,
        kernelInitializer: 'varianceScaling',
        useBias: false,
        activation: 'softmax'
      })
    ],
  });

  return model;
}
