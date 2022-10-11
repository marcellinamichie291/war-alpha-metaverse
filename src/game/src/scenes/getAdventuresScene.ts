import { getShips, mintShip } from '../blockchain/lib'
import { state } from '../state/state'

export class GetAdventuresScene extends Phaser.Scene {
  private buttonMint: Phaser.GameObjects.Image | null
  private showLoading: boolean
  private showingLoading: boolean

  constructor() {
    super({
      key: 'GetAdventures',
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

    let buttonSellAdventure = this.add.image(695 + 105, 111 + 16, 'button-sell-adventure')
    buttonSellAdventure.setInteractive({ cursor: 'pointer' })
    buttonSellAdventure.on('pointerdown', () => {
      this.sound.add('clickSound').play()
      window.alert('Comming soon!')
    })


    // ---------- Adventures ---------- //
    const adventureCell = this.add.image(122 + 678, 177 + 52, 'adventure-cell')

    const adventureName = this.add
      .text(199 + 176, 209 + 20, `${state.currentAdventure?.name}`, {
        fontFamily: 'Ethnocentric',
        align: 'left',
        wordWrap: { width: 370, useAdvancedWrap: true },
      })
      .setFontSize(34)
      .setOrigin(0.5)

    const adventureDescription = this.add
      .text(623 + 176, 182 + 50, `${state.currentAdventure?.description}`, {
        fontFamily: 'Electrolize',
        align: 'left',
        wordWrap: { width: 370, useAdvancedWrap: true },
      })
      .setFontSize(14)
      .setOrigin(0.5)

    const adventureRatings = this.add.image(1064 + 60, 217 + 12, 'ratings')

    const adventureOwned = this.add
      .text(1262 + 85, 209 + 20, 'OWNED', {
        fontFamily: 'Ethnocentric',
        align: 'left',
        wordWrap: { width: 170, useAdvancedWrap: true },
      })
      .setFontSize(34)
      .setOrigin(0.5)

    let adventureContainer = this.add.container(0, 0, [
      adventureCell,
      adventureName,
      adventureDescription,
      adventureRatings,
      adventureOwned,
    ])
    adventureContainer.setSize(adventureCell.width, adventureCell.height)
    adventureContainer.setInteractive({ cursor: 'pointer' })
    adventureContainer.on('pointerdown', () => {
      this.sound.add('clickSound').play()
      this.scene.start('Selector')
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
