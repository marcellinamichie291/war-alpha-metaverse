import { getShips, mintShip } from '../blockchain/lib'
import { state } from '../state/state'
import adventure1 from '../dsl/dsl.json' assert { type: 'json' }

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

    const buttonSellAdventure = this.add.image(695 + 105, 111 + 16, 'button-sell-adventure')
    buttonSellAdventure.setInteractive({ cursor: 'pointer' })
    buttonSellAdventure.on('pointerdown', () => {
      this.sound.add('clickSound').play()
      window.alert('Coming soon!')
    })

    // ---------- Adventures ---------- //
    state.ownedAdventures = [
      adventure1,
      {
        name: 'Beyond',
        description: 'Your misson: Go beyond the observable universe.',
        price: 10,
        external_url: 'https://waralpha.io/adventures/the-last-ship',
        image: 'https://waralpha.io/adventures/the-last-ship/image.png',
        attributes: [],
        levels: [],
      },
      {
        name: 'Event Horizon',
        description:
          'You are the crew of the Event Horizon, a research ship at the edge of the galaxy. Everything was fine until now as your dreams and nightmares start becoming reality...',
        price: 25,
        external_url: 'https://waralpha.io/adventures/the-last-ship',
        image: 'https://waralpha.io/adventures/the-last-ship/image.png',
        attributes: [],
        levels: [],
      },
    ]

    state.ownedAdventures.forEach((adventure, i) => {
      const adventureCell = this.add.image(0, 0, 'adventure-cell')

      const adventureName = this.add
        .text(-425, 0, `${adventure.name}`, {
          fontFamily: 'Ethnocentric',
          align: 'left',
          wordWrap: { width: 370, useAdvancedWrap: true },
        })
        .setFontSize(34)
        .setOrigin(0.5)

      const adventureDescription = this.add
        .text(0, 0, `${adventure.description}`, {
          fontFamily: 'Electrolize',
          align: 'left',
          wordWrap: { width: 370, useAdvancedWrap: true },
        })
        .setFontSize(14)
        .setOrigin(0.5)

      const adventureRatings = this.add.image(324, 0, 'ratings')

      let adventureOwned = new Phaser.GameObjects.Text(this, 0, 0, '', {})
      if (i === 0)
        adventureOwned = this.add
          .text(547, 0, 'OWNED', {
            fontFamily: 'Ethnocentric',
            align: 'left',
            wordWrap: { width: 170, useAdvancedWrap: true },
          })
          .setFontSize(34)
          .setOrigin(0.5)

      let adventurePrice = new Phaser.GameObjects.Text(this, 0, 0, '', {})
      if (i !== 0)
        adventurePrice = this.add
          .text(547, -20, `${adventure.price} ALPHAS`, {
            fontFamily: 'Electrolize',
            align: 'left',
            wordWrap: { width: 370, useAdvancedWrap: true },
          })
          .setFontSize(16)
          .setOrigin(0.5)

      let adventureBuyButton: any = new Phaser.GameObjects.Text(this, 0, 0, '', {})
      if (i !== 0) adventureBuyButton = this.add.image(547, 20, 'button-buy-adventure')
      adventureBuyButton.setInteractive({ cursor: 'pointer' })
      adventureBuyButton.on('pointerdown', () => {
        this.sound.add('clickSound').play()
        window.alert('Coming soon!')
      })

      const adventureContainer = this.add.container(122 + 678, 177 + 52 + i * 120, [
        adventureCell,
        adventureName,
        adventureDescription,
        adventureRatings,
        adventureOwned,
        adventurePrice,
        adventureBuyButton,
      ])
      adventureContainer.setSize(adventureCell.width, adventureCell.height)
      adventureContainer.setInteractive({ cursor: 'pointer' })
      adventureContainer.on('pointerdown', () => {
        this.sound.add('clickSound').play()
        this.scene.start('Selector')
      })
    })

    const buttonBack = this.add.image(90, this.sys.canvas.height - 90, 'left-arrow')
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
