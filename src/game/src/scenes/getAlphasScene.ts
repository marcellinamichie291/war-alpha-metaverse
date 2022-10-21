import { getAlphasBalance, mintTokens } from '../blockchain/lib'
import { state } from '../state/state'

export class GetAlphasScene extends Phaser.Scene {
  private buttonMint: Phaser.GameObjects.Image | null
  private showLoading: boolean
  private showingLoading: boolean

  constructor() {
    super({
      key: 'GetAlphas',
    })
    this.buttonMint = null
    this.showLoading = false
    this.showingLoading = false
  }

  init(): void {}

  preload(): void {}

  create(): void {
    this.showLoading = false
    this.showingLoading = false

    this.add.tileSprite(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2,
      this.sys.canvas.width,
      this.sys.canvas.height,
      'background',
    )

    this.add.image(100 + 700, 25 + 30, 'header')

    this.add.image(125 + 677, 130 + 270, 'page-cell')

    this.add
      .text(168 + 167, 295 + 72, `${state.spaceCoinsBalance}`, {
        fontFamily: 'Ethnocentric',
      })
      .setFontSize(120)
      .setOrigin(0.5)

    this.add
      .text(233 + 101, 422 + 20, 'ALPHAS', {
        fontFamily: 'Ethnocentric',
      })
      .setFontSize(34)
      .setOrigin(0.5)

    let swap10Alphas = this.add.image(671 + 131, 330 + 55, 'swap-10-alphas')
    swap10Alphas.setInteractive({ cursor: 'pointer' })
    swap10Alphas.on('pointerdown', async () => {
      this.sound.add('clickSound').play()
      await mintTokens(10)
      await getAlphasBalance()
      this.scene.restart()
    })

    let swap100Alphas = this.add.image(1060 + 131, 330 + 55, 'swap-100-alphas')
    swap100Alphas.setInteractive({ cursor: 'pointer' })
    swap100Alphas.on('pointerdown', async () => {
      this.sound.add('clickSound').play()
      await mintTokens(100)
      await getAlphasBalance()
      this.scene.restart()
    })

    let buttonBack = this.add.image(90, this.sys.canvas.height - 90, 'left-arrow')
    buttonBack.setInteractive({ cursor: 'pointer' })
    // buttonBack.on('pointerover', () => buttonBack.setTexture('buttonBackHover'))
    // buttonBack.on('pointerout', () => buttonBack.setTexture('buttonBack'))
    buttonBack.on('pointerdown', () => {
      this.sound.add('clickSound').play()
      this.scene.start('Selector')
    })
  }

  update(): void {
    if (this.showLoading && !this.showingLoading) {
      this.showingLoading = true
      if (this.buttonMint) this.buttonMint.setTexture('buttonLoading')
    }

    if (!this.showLoading && this.showingLoading) {
      this.showingLoading = false
      if (this.buttonMint) this.buttonMint.setTexture('buttonMint')
    }
  }
}
