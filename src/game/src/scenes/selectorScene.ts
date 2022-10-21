import { state } from '../state/state'

export class SelectorScene extends Phaser.Scene {
  private buttonMint: Phaser.GameObjects.Image | null
  private showLoading: boolean
  private showingLoading: boolean

  constructor() {
    super({
      key: 'Selector',
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

    this.add.image(125 + 210, 130 + 270, 'menu-cell')
    this.add.image(593 + 210, 130 + 270, 'menu-cell')
    const rightCell = this.add.image(1060 + 210, 130 + 270, 'menu-cell')
    rightCell.flipX = true

    // ---------- Alphas ---------- //
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

    let buttonAlphas = this.add.image(233 + 102, 607 + 16, 'button-alphas')
    buttonAlphas.setInteractive({ cursor: 'pointer' })
    buttonAlphas.on('pointerdown', () => {
      this.sound.add('clickSound').play()
      this.scene.start('GetAlphas')
    })

    // ---------- Ships ---------- //
    this.add
      .text(687 + 101, 152 + 20,  state.currentShip?.shipCode ? `SHIP ${state.currentShip?.shipCode}` : 'NO SHIP', {
        fontFamily: 'Ethnocentric',
      })
      .setFontSize(34)
      .setOrigin(0.5)

    if(!state.currentShip?.shipCode) this.add.image(this.sys.canvas.width / 2, this.sys.canvas.height / 2, 'no-ship')

    const ship = state.currentShip
    if (ship && ship.shipCode) {
      const partCabin = this.add.image(0, 0, `partCabin${ship.shipCode[0]}`)
      const partEngine = this.add.image(0, 0, `partEngine${ship.shipCode[1]}`)
      const partWing = this.add.image(0, 0, `partWing${ship.shipCode[2]}`)
      const partWeapon = this.add.image(0, 0, `partWeapon${ship.shipCode[3]}`)
      let container = this.add.container(this.sys.canvas.width / 2, this.sys.canvas.height / 2, [
        partWeapon,
        partWing,
        partEngine,
        partCabin,
      ])
      container.rotation = -Math.PI / 2
      container.scale = 1.5
    }

    let buttonShips = this.add.image(701 + 102, 607 + 16, 'button-ships')
    buttonShips.setInteractive({ cursor: 'pointer' })
    buttonShips.on('pointerdown', () => {
      this.sound.add('clickSound').play()
      this.scene.start('GetShips')
    })

    // ---------- Adventures ---------- //
    this.add.image(1210 + 60, 237 + 12, 'ratings')

    this.add
    .text(1100 + 169, 270 + 60, `${state.currentAdventure?.name}`, {
      fontFamily: 'Ethnocentric',
      align: 'center',
      wordWrap: { width: 370, useAdvancedWrap: true }
    })
    .setFontSize(50)
    .setOrigin(0.5)

    this.add
    .text(1100 + 169, 400 + 60, `${state.currentAdventure?.description}`, {
      fontFamily: 'Electrolize',
      align: 'center',
      wordWrap: { width: 370, useAdvancedWrap: true }
    })
    .setFontSize(14)
    .setOrigin(0.5)

    let buttonAdventures = this.add.image(1168 + 102, 607 + 16, 'button-adventures')
    buttonAdventures.setInteractive({ cursor: 'pointer' })
    buttonAdventures.on('pointerdown', () => {
      this.sound.add('clickSound').play()
      this.scene.start('GetAdventures')
    })

    let buttonBack = this.add.image(90, this.sys.canvas.height - 90, 'left-arrow')
    buttonBack.setInteractive({ cursor: 'pointer' })
    // buttonBack.on('pointerover', () => buttonBack.setTexture('buttonBackHover'))
    // buttonBack.on('pointerout', () => buttonBack.setTexture('buttonBack'))
    buttonBack.on('pointerdown', () => {
      this.sound.add('clickSound').play()
      this.scene.start('ConnectWallet')
    })

    let buttonNext = this.add.image(this.sys.canvas.width - 90, this.sys.canvas.height - 90, 'right-arrow')
    buttonNext.setInteractive({ cursor: 'pointer' })
    // buttonNext.on('pointerover', () => buttonNext.setTexture('buttonNextHover'))
    // buttonNext.on('pointerout', () => buttonNext.setTexture('buttonNext'))
    buttonNext.on('pointerdown', () => {
      this.sound.add('clickSound').play()
      this.scene.start('Game')
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
