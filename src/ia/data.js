import * as tf from '@tensorflow/tfjs';

import { getMobilenet } from './mobilenet';

export class DataController {
  constructor(numClasses) {
    this.numClasses = numClasses;
    this.xs = null;
    this.ys = null;
  }

  async addExample(canvas, label) {
    const mobilenet = await getMobilenet();

    const image = tf.fromPixels(canvas);
    const batchetImage = loadAndProcessImage(image);
    const example = mobilenet.predict(batchetImage);

    const y = tf.tidy(() => tf.oneHot(tf.tensor1d([label - 1]).toInt(), this.numClasses));

    if (this.xs == null) {
      this.xs = tf.keep(example);
      this.ys = tf.keep(y);
    } else {
      const oldX = this.xs;
      this.xs = tf.keep(oldX.concat(example, 0));

      const oldY = this.ys;
      this.ys = tf.keep(oldY.concat(y, 0));

      oldX.dispose();
      oldY.dispose();
      y.dispose();
    }
  }
}

export function loadAndProcessImage(image) {
  const croppedImage = cropImage(image);
  const resizedImage = resizeImage(croppedImage);
  const batchedImage = batchImage(resizedImage);
  return batchedImage;
}

function batchImage(image) {
  const batchedImage = image.expandDims(0);
  return batchedImage.toFloat().div(tf.scalar(127)).sub(tf.scalar(1));
}

function resizeImage(image) {
  return tf.image.resizeBilinear(image, [224, 224]);
}

function cropImage(img) {
  const size = Math.min(img.shape[0], img.shape[1]);
  const centerHeight = img.shape[0] / 2;
  const beginHeight = centerHeight - (size / 2);
  const centerWidth = img.shape[1] / 2;
  const beginWidth = centerWidth - (size / 2);
  return img.slice([beginHeight, beginWidth, 0], [size, size, 3]);
}
