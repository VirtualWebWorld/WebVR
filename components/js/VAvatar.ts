import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM } from '@pixiv/three-vrm'

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
      this.vrm = vrm
    })
    console.log('load complites')
  }

  loadVRM(): Promise<any> {
    return new Promise((resolve) => {
      this.loader.load(
        'akatsuki1910.vrm',
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
