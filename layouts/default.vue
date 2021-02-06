<template>
  <div>
    <!-- <Three /> -->
    <CameraCanvas />
    <!-- <nuxt /> -->
  </div>
</template>

<script>
import Three from '~/components/Three'
import CameraCanvas from '~/components/CameraCanvas'
export default {
  components: {
    Three,
    CameraCanvas,
  },
}
</script>

<style lang="stylus">
html, body, #__nuxt, #__layout, #__layout > div
  overflow hidden
  height 100%

body
  margin 0
  overflow hidden
  font-family vdl-logojrblack, sans-serif
</style>