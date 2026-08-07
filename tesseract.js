import { createWorker } from 'tesseract.js';

export async function imageToText(imageFile) {
  const worker = await createWorker('eng');
  const { data: { text } } = await worker.recognize(imageFile);
  await worker.terminate();
  return text;
}