import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { VRM } from '@pixiv/three-vrm'

export default class VAvatar {
  vrmupdate: any
  loader: GLTFLoader
  scene: THREE.Scene
  constructor(scene: THREE.Scene) {
    this.scene = scene
    this.vrmupdate = ''
    this.loader = new GLTFLoader()

    this.loadAvater()
  }

  loadAvater() {
    this.loader.load(
      'akatsuki1910.vrm',

      (gltf) => {
        VRM.from(gltf).then((vrm) => {
          this.scene.add(vrm.scene)
          vrm.scene.rotation.y = Math.PI
          this.vrmupdate = vrm
        })
      }
    )
  }
}
