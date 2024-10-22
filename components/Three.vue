<template>
  <canvas ref="canvas" class="canvas" />
</template>

<script lang="ts">
import { Component, Ref, Watch, Vue } from 'nuxt-property-decorator'
import ThreeMain from './js/ThreeMain'
import Facepoint from './js/Facepoint'
import VAvatar from './js/VAvatar'

@Component({})
export default class Three extends Vue {
  @Ref() canvas!: HTMLCanvasElement

  /** data() */
  videoElement!: HTMLVideoElement
  threeMain!: ThreeMain
  facepoint!: Facepoint
  va!: VAvatar
  loadFlag: boolean = false

  /** computed() */
  get video() {
    return this.$store.getters.video
  }

  /** watch() */
  @Watch('video')
  videoStart(element: HTMLVideoElement) {
    this.videoElement = element
    this.loop()
    this.$store.commit('loadCount')
  }

  /** mounted() */
  async mounted() {
    this.threeMain = new ThreeMain(this.canvas)

    this.va = new VAvatar(this.threeMain.scene)
    await this.va.loadAvater()
    this.$store.commit('loadCount')

    this.facepoint = new Facepoint(this.va.vrm)
    await this.facepoint.setup()
    this.$store.commit('loadCount')

    this.loadFlag = true
  }

  /** methods() */
  loop() {
    if (this.loadFlag) {
      this.threeMain.animate()
      this.facepoint.animate(this.videoElement)
    }
    requestAnimationFrame(this.loop)
  }
}
</script>

<style lang="stylus" scoped>
.canvas
  position absolute
  top 0
  left 0
  z-index -1
</style>
