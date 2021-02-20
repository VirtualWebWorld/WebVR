<template>
  <div ref="pixi" class="pixi" />
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'nuxt-property-decorator'
import PixiMain from './js/PixiMain'

@Component({})
export default class Pixi extends Vue {
  @Ref() pixi!: HTMLDivElement
  pixiMain!: PixiMain

  /** mounted() */
  mounted() {
    this.pixiMain = new PixiMain(this.pixi)
    this.loop()
  }

  /** methods() */
  loop() {
    this.pixiMain.animate()
    requestAnimationFrame(this.loop)
  }
}
</script>

<style lang="stylus" scoped>
.pixi
  position absolute
  top 0
  left 0
  z-index -1
</style>
