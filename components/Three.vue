<template>
  <section class="artwork">
    <canvas ref="canvas" class="canvas" />
  </section>
</template>

<script lang="ts">
import { Component, Watch, Vue } from 'nuxt-property-decorator'
import ThreeMain from './js/ThreeMain'
import Facepoint from './js/Facepoint'
import VAvatar from './js/VAvatar'

@Component({})
export default class Three extends Vue {
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
  public videoStart(element: HTMLVideoElement) {
    this.videoElement = element
    this.loop()
    console.log('loop start')
  }

  /** mounted() */
  async mounted() {
    this.threeMain = new ThreeMain({
      $canvas: this.$refs.canvas,
    })
    this.va = new VAvatar(this.threeMain.scene)
    await this.va.loadAvater()
    this.facepoint = new Facepoint(this.va.vrm)
    await this.facepoint.setup()
    this.loadFlag = true
    console.log('loadFlag true')
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
</style>
