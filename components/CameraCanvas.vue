<template>
  <div class="camera-wrap">
    <section class="video">
      <video ref="video" />
    </section>
    <section class="video">
      <canvas ref="canvas" class="camera-c" width="400" height="200" />
    </section>
  </div>
</template>

<script>
import { faceTracking } from './js/FaceTracking'
export default {
  data() {
    return {
      canvasCtx: '',
    }
  },
  mounted() {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: {
          width: { ideal: 400 },
          height: { ideal: 200 },
        },
      })
      .then((stream) => {
        this.$refs.video.srcObject = stream
        this.$refs.video.play()
      })
    this.canvasCtx = this.$refs.canvas.getContext('2d')
    this.cameraLoop()
  },
  methods: {
    cameraLoop() {
      this.canvasCtx.drawImage(this.$refs.video, 0, 0, 400, 200)
      faceTracking(this.$refs.video)
      requestAnimationFrame(this.cameraLoop)
    },
  },
}
</script>

<style lang="stylus" scoped>
.camera-wrap
	position absolute
	// .camera-c
	// 	width 400px
	// 	height 200px
</style>
