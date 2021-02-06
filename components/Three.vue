<template>
  <section class="artwork">
    <canvas ref="canvas" class="canvas" />
  </section>
</template>

<script>
import ThreeMain from './js/ThreeMain.ts'

export default {
  name: 'Three',
  mounted() {
    this.threeMain = new ThreeMain({
      $canvas: this.$refs.canvas,
    })
  },
}
</script>

<style lang="stylus" scoped>
.canvas
  position absolute
  top 0
  left 0
</style>
