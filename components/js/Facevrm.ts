import * as THREE from 'three'
import * as tf from '@tensorflow/tfjs'
import { VRM, VRMSchema } from '@pixiv/three-vrm'

export default class Facevrm {
  currentVRM: VRM
  clock: THREE.Clock
  constructor(vrm: VRM) {
    this.clock = new THREE.Clock()
    this.clock.start()

    this.currentVRM = vrm
  }

  headPoseEstimation(an: any) {
    const faces = an.silhouette
    const rightEye = an.rightEyeLower1[8]
    const leftEye = an.leftEyeLower1[8]
    const rotate: any = tf.tidy(() => {
      const fecePoints = tf.tensor(faces)
      const eye1 = tf.tensor1d(rightEye)
      const eye2 = tf.tensor1d(leftEye)
      const scales = fecePoints.div(tf.norm(eye1.sub(eye2))).mul(0.06)
      const centered = scales.sub(scales.mean(0))

      const c00 = centered.slice(0, 1).as1D()
      const c09 = centered.slice(9, 1).as1D()
      const c18 = centered.slice(18, 1).as1D()
      const c27 = centered.slice(27, 1).as1D()

      const rotate0 = c18.sub(c00).div(tf.norm(c18.sub(c00)))
      const rotate1 = c09.sub(c27).div(tf.norm(c09.sub(c27)))

      return tf.concat([rotate0, rotate1]).arraySync()
    })
    const m00 = rotate[0]
    const m01 = rotate[1]
    const m02 = rotate[2]

    const m10 = rotate[3]
    const m11 = rotate[4]
    const m12 = rotate[5]

    const m20 = m01 * m12 - m02 * m11
    const m21 = m02 * m10 - m00 * m12
    const m22 = m00 * m11 - m01 * m10
    let yaw, pitch, roll
    const sy = Math.sqrt(m00 * m00 + m10 * m10)
    const singular = sy < 10 ** -6

    if (!singular) {
      yaw = Math.atan2(m21, m22)
      pitch = Math.atan2(-m20, sy)
      roll = Math.atan2(m10, m00)
    } else {
      yaw = Math.atan2(-m12, m11)
      pitch = Math.atan2(-m20, sy)
      roll = 0
    }

    const head = this.currentVRM.humanoid!.getBoneNode(
      VRMSchema.HumanoidBoneName.Head
    )
    head!.rotation.set(yaw + Math.PI, pitch, -(roll - Math.PI / 2), 'XYZ')
  }

  faceMove(an: any) {
    this.lipMove(an)
    this.rightEyeMove(an)
    this.leftEyeMove(an)
  }

  lipMove(an: any) {
    const aLip = this.euclideanDist(an.lipsUpperInner[6], an.lipsLowerInner[6])
    const bLip = this.euclideanDist(an.lipsLowerInner[0], an.lipsLowerInner[10])
    const lipWidth = aLip / (2 * bLip)
    let lipRatio = this.numComplement(lipWidth, 0.08, 0.18) // Mouth opening width
    lipRatio = lipRatio < 0 ? 0 : lipRatio > 1 ? 1 : lipRatio

    this.currentVRM.blendShapeProxy!.setValue(
      VRMSchema.BlendShapePresetName.A,
      lipRatio
    )
  }

  rightEyeMove(an: any) {
    const aEyeR = this.euclideanDist(an.rightEyeUpper0[3], an.rightEyeLower0[4])
    const bEyeR = this.euclideanDist(an.rightEyeLower0[0], an.rightEyeLower0[8])
    const rEyeWidth = aEyeR / (2 * bEyeR)
    let rEyeRatio = 1 - this.numComplement(rEyeWidth, 0.08, 0.12) // Eye opening width
    rEyeRatio = rEyeRatio < 0 ? 0 : rEyeRatio > 1 ? 1 : rEyeRatio
    this.currentVRM.blendShapeProxy!.setValue(
      VRMSchema.BlendShapePresetName.BlinkR,
      rEyeRatio
    )
  }

  leftEyeMove(an: any) {
    const aEyeL = this.euclideanDist(an.leftEyeUpper0[3], an.leftEyeLower0[4])
    const bEyeL = this.euclideanDist(an.leftEyeLower0[0], an.leftEyeLower0[8])
    const lEyeWidth = aEyeL / (2 * bEyeL)
    let lEyeRatio = 1 - this.numComplement(lEyeWidth, 0.08, 0.12) // Eye opening width
    lEyeRatio = lEyeRatio < 0 ? 0 : lEyeRatio > 1 ? 1 : lEyeRatio
    this.currentVRM.blendShapeProxy!.setValue(
      VRMSchema.BlendShapePresetName.BlinkL,
      lEyeRatio
    )
  }

  numComplement(num: number, min: number, max: number) {
    return (num - min) / (max - min)
  }

  euclideanDist(point1: [number, number], point2: [number, number]) {
    const [x1, y1] = point1
    const [x2, y2] = point2
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2))
  }

  animate(prediction: any) {
    const an = prediction.annotations
    this.headPoseEstimation(an)
    this.faceMove(an)
    this.currentVRM.update(this.clock.getDelta())
  }
}
