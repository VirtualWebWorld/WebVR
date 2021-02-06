import * as faceapi from 'face-api.js'

export const faceTracking = async (img: HTMLVideoElement) => {
  await faceapi.nets.tinyFaceDetector.load('/weights')
  await faceapi.nets.faceLandmark68Net.load('/weights')

  const detectionsWithLandmarks = await faceapi
    .detectAllFaces(img, new faceapi.TinyFaceDetectorOptions())
    .withFaceLandmarks()

  // console.log(detectionsWithLandmarks)
}
