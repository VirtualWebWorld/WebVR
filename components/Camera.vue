<template>
  <div class="camera-wrap">
    <section class="video">
      <video ref="video" />
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'nuxt-property-decorator'
import camera from './js/camera'

@Component({})
export default class Camera extends Vue {
  $refs!: {
    video: HTMLVideoElement
  }

  /** mounted() */
  async mounted() {
    const cameraWidth = window.innerWidth
    const cameraHeight = window.innerHeight
    const stream: HTMLVideoElement = await camera(
      this.$refs.video,
      cameraWidth,
      cameraHeight
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
