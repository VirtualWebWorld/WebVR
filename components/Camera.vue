<template>
  <div class="camera-wrap">
    <section class="video">
      <video ref="video" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'nuxt-property-decorator'
import camera from './js/camera'

@Component({})
export default class Camera extends Vue {
  @Ref() video!: HTMLVideoElement

  /** data() */
  cameraWidth: number = window.innerWidth
  cameraHeight: number = window.innerHeight

  /** mounted() */
  async mounted() {
    const stream: HTMLVideoElement = await camera(
      this.video,
      this.cameraWidth,
      this.cameraHeight
    )
    this.$store.commit('setVideo', stream)
  }
}
</script>

<style lang="stylus" scoped>
.camera-wrap
  position absolute
  display none
</style>
