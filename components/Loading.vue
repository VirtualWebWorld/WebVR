<template>
  <div :class="[{ complites: isLoad }, 'loading-wrap']">
    <div class="loading-text">
      <div class="text">Now Loading</div>
      <div class="text-d">.</div>
      <div class="text-d">.</div>
      <div class="text-d">.</div>
    </div>
    <div class="loading-bar">
      <div ref="lbf" class="loading-bar-front"></div>
      <div class="loading-bar-back"></div>
    </div>
    <div class="loading-fra">
      <div id="numer" class="loading-numer">{{ loadDone }}</div>
      /
      <div class="loading-denom">{{ loadNum }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Watch, Vue } from 'nuxt-property-decorator'

@Component({})
export default class Loading extends Vue {
  @Ref() lbf!: HTMLDivElement

  /** data() */
  loadNum: number = 4
  loadDone: number = 0
  isLoad: boolean = false

  /** computed() */
  get load() {
    return this.$store.getters.load
  }

  /** watch() */
  @Watch('load')
  loadWatch(num: number) {
    this.loadDone++
    const par = (num / this.loadNum) * 100
    this.lbf.style.clipPath = 'inset(0 0 0 ' + par + '%)'
    if (num === this.loadNum) {
      this.loadComplites()
    }
  }

  /** methods() */
  loadComplites() {
    this.isLoad = true
  }
}
</script>

<style lang="stylus">
lbw = 200px
lbh = 10px

.complites
  animation fadeback 3s linear 10s both

@keyframes fadeback
  from
    opacity 1
  to
    opacity 0


.loading-wrap
	width 100%
	height 100%
	background black
	display flex
	flex-direction column
	align-items center
	justify-content center
	gap 1ch

.loading-text
	color white
	& > div
		display inline-block

for i in 1..3
	.text-d:nth-of-type({i+1})
		animation load-anime 3s linear (i - 1)s infinite

@keyframes load-anime
	0%
		opacity 0
	50%
		opacity 1
	100%
		opacity 0

.loading-bar
	position relative
	.loading-bar-front
		position absolute
		width lbw
		height lbh
		background white
		border-radius lbh
		clip-path inset(0 0 0 0)
	.loading-bar-back
		width lbw
		height lbh
		background linear-gradient(to right,red,orange,yellow,green,aqua,blue,purple,red)
		border-radius lbh
		animation bg-anime 3s linear infinite

@keyframes bg-anime
	from
		background-position 0px 0px
	to
		background-position (lbw) 0px


.loading-fra
	color white
	& > div
		display inline-block
</style>
