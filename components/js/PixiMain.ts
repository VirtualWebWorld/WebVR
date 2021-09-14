import * as PIXI from 'pixi.js'

export default class PixiMain {
  width: number
  height: number
  stage: PIXI.Container
  renderer: PIXI.AbstractRenderer
  textArr: string[]
  taNum: number
  textObj: PIXI.Text
  constructor(element: HTMLDivElement) {
    this.width = window.innerWidth
    this.height = window.innerHeight
    this.stage = new PIXI.Container()
    this.renderer = PIXI.autoDetectRenderer({
      width: this.width,
      height: this.height,
      resolution: 1,
      antialias: true,
      backgroundAlpha: 1,
    })
    element.appendChild(this.renderer.view)

    this.textObj = this.subtitles()
    this.textArr = ['', 'ここにテキスト']
    this.taNum = 0
    document.body.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        this.addText(
          this.textObj,
          this.textArr[this.taNum % this.textArr.length],
        )
        this.taNum++
      }
    })
  }

  addText(obj: PIXI.Text, text: string) {
    obj.text = text
  }

  subtitles() {
    const style = new PIXI.TextStyle({
      align: 'center',
      breakWords: true,
      dropShadowColor: 'red',
      fill: 'white',
      fontSize: 70,
      lineJoin: 'bevel',
      strokeThickness: 8,
      whiteSpace: 'normal',
    })

    const textObj = new PIXI.Text('', style)
    textObj.anchor.set(0.5)
    textObj.x = this.width / 2
    textObj.y = this.height - 100
    this.stage.addChild(textObj)
    return textObj
  }

  animate() {
    this.renderer.render(this.stage)
  }
}
