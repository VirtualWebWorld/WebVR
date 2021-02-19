import * as FLD from '@tensorflow-models/face-landmarks-detection'
import { VRM } from '@pixiv/three-vrm'
import Facevrm from './Facevrm'

export default class Facepoint {
  model: any
  fv: Facevrm
  constructor(vrm: VRM) {
    this.fv = new Facevrm(vrm)
  }

  async setup() {
    this.model = await FLD.load(FLD.SupportedPackages.mediapipeFacemesh, {
      maxFaces: 1,
    })
  }

  async animate(video: HTMLVideoElement) {
    const predictions = await this.model.estimateFaces({
      input: video,
    })

    if (predictions.length > 0) {
      predictions.forEach((prediction: any) => {
        this.fv.animate(prediction)
      })
    }
  }
}
