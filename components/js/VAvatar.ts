import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM, VRMSchema } from '@pixiv/three-vrm'

export default class VAvatar {
  loader: GLTFLoader
  scene: THREE.Scene
  vrm!: VRM
  constructor(scene: THREE.Scene) {
    this.scene = scene
    this.loader = new GLTFLoader()
  }

  async loadAvater() {
    const gltf = await this.loadVRM()
    await VRM.from(gltf).then((vrm) => {
      this.scene.add(vrm.scene)
      vrm.scene.rotation.y = Math.PI
      vrm.humanoid!.setPose({
        [VRMSchema.HumanoidBoneName.LeftUpperArm]: {
          rotation: [0, 0, 0.5, 1],
        },
        [VRMSchema.HumanoidBoneName.RightUpperArm]: {
          rotation: [0, 0, -0.5, 1],
        },
      })
      this.vrm = vrm
    })
  }

  loadVRM(): Promise<any> {
    return new Promise((resolve) => {
      this.loader.load(
        'template.vrm', // VRM model file name
        (gltf) => {
          resolve(gltf)
        },
        (progress) =>
          console.log(
            'Loading model...',
            100.0 * (progress.loaded / progress.total),
            '%'
          ),
        (error) => console.error(error)
      )
    })
  }
}
