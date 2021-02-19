import * as THREE from 'three'
import Stats from 'three/examples/jsm/libs/stats.module'
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

export default class ThreeMain {
  canvas: HTMLCanvasElement
  height: number
  width: number
  renderer: THREE.WebGLRenderer
  scene: THREE.Scene
  camera: THREE.PerspectiveCamera
  stats: Stats
  axesHelper: THREE.AxesHelper
  gridHelper: THREE.GridHelper
  // controls: OrbitControls
  light: THREE.PointLight
  lightHelper: THREE.PointLightHelper
  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.width = window.innerWidth
    this.height = window.innerHeight

    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
    })
    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      0.1,
      10000
    )
    // eslint-disable-next-line unicorn/number-literal-case
    this.light = new THREE.PointLight(0xffffff, 2, 50, 1)
    this.scene.add(this.light)

    this.lightHelper = new THREE.PointLightHelper(this.light)
    this.scene.add(this.lightHelper)
    this.stats = Stats()
    this.axesHelper = new THREE.AxesHelper(10000)
    this.scene.add(this.axesHelper)
    this.gridHelper = new THREE.GridHelper(1000, 1000)
    this.scene.add(this.gridHelper)
    // this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    // this.controls.update()

    this.initialSetting()
  }

  initialSetting() {
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.setSize(this.width, this.height)

    this.camera.position.set(0, 1.2, 0.5)

    this.stats.showPanel(0)
    this.stats.domElement.style.position = 'absolute'
    this.stats.domElement.style.top = '0px'
    document.body.append(this.stats.domElement)

    this.light.position.set(0, 20, 0)
    this.light.lookAt(new THREE.Vector3(0, 0, 0))
  }

  animate() {
    this.stats.update()
    // this.controls.update()
    this.renderer.render(this.scene, this.camera)
  }
}
