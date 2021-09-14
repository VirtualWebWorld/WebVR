const camera = async (
  element: HTMLVideoElement,
  width: number,
  height: number,
) => {
  const video: HTMLVideoElement = await setupCamera(element, width, height)
  video.play()
  return video
}

const setupCamera = async (
  element: HTMLVideoElement,
  width: number,
  height: number,
): Promise<HTMLVideoElement> => {
  const stream = await navigator.mediaDevices.getUserMedia({
    audio: false,
    video: {
      facingMode: 'user',
      width,
      height,
    },
  })
  element.srcObject = stream
  return new Promise((resolve) => {
    element.onloadedmetadata = () => {
      resolve(element)
    }
  })
}

export default camera
