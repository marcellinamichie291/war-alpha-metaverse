import { getShips, buyShip, sellShip } from '../blockchain/lib'
import { state } from '../state/state'

export class GetShipsScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'GetShips',
    })
  }

  init(): void {}

  preload(): void {}

  create(): void {
    this.add.tileSprite(
      this.sys.canvas.width / 2,
      this.sys.canvas.height / 2,
      this.sys.canvas.width,
      this.sys.canvas.height,
      'background',
    )

    this.add.image(100 + 700, 25 + 30, 'header')
    const allShips = [...state.ownedShips, ...state.onSaleShips]

    for (let i = 0; i < 8; i++) {
      let ship = allShips[i]

      if (ship && ship.shipCode) {
        const shipCell = this.add.image(0, 0, 'ship-cell')
        const partCabin = this.add.image(0, 0, `partCabin${ship.shipCode[0]}`)
        partCabin.rotation = -Math.PI / 2
        const partEngine = this.add.image(0, 0, `partEngine${ship.shipCode[1]}`)
        partEngine.rotation = -Math.PI / 2
        const partWing = this.add.image(0, 0, `partWing${ship.shipCode[2]}`)
        partWing.rotation = -Math.PI / 2
        const partWeapon = this.add.image(0, 0, `partWeapon${ship.shipCode[3]}`)
        partWeapon.rotation = -Math.PI / 2

        const text = this.add
          .text(0, 130, ship.owned ? 'OWNED' : `${ship.price} ALPHAS`, {
            fontFamily: 'Electrolize',
            align: 'center',
            wordWrap: { width: 257, useAdvancedWrap: true },
          })
          .setFontSize(14)
          .setOrigin(0.5)

        let buttonBuy: any = new Phaser.GameObjects.Text(this, 0, 0, '', {})
        if (!ship.owned) buttonBuy = this.add.image(0, 167, 'button-buy-ship')
        buttonBuy.setInteractive({ cursor: 'pointer' })
        buttonBuy.on('pointerdown', async () => {
          this.sound.add('clickSound').play()
          await buyShip(ship)
          await getShips()
          this.scene.restart()
        })

        let buttonSelect: any = new Phaser.GameObjects.Text(this, 0, 0, '', {})
        if (ship.owned) buttonSelect = this.add.image(-70, 167, 'button-select-ship')
        buttonSelect.setInteractive({ cursor: 'pointer' })
        buttonSelect.on('pointerdown', async () => {
          this.sound.add('clickSound').play()
          state.currentShip = ship
          this.scene.start('Selector')
        })

        let buttonSell: any = new Phaser.GameObjects.Text(this, 0, 0, '', {})
        if (ship.owned) buttonSell = this.add.image(70, 167, 'button-sell-ship')
        buttonSell.setInteractive({ cursor: 'pointer' })
        buttonSell.on('pointerdown', async () => {
          this.sound.add('clickSound').play()
          const price = parseInt(prompt('Please enter your price', '1') || '1')
          await sellShip(ship, price)
          await getShips()
        })

        let container = this.add.container(
          this.sys.canvas.width / 2 - 450 + (i % 4) * 300,
          this.sys.canvas.height / 2 - 150 + (i < 4 ? 0 : 350),
          [shipCell, text, partWeapon, partWing, partEngine, partCabin, buttonBuy, buttonSelect, buttonSell],
        )

        container.setSize(257, 306)
      }
    }

    const buttonBack = this.add.image(90, this.sys.canvas.height - 90, 'left-arrow')
    buttonBack.setInteractive({ cursor: 'pointer' })
    // buttonBack.on('pointerover', () => buttonBack.setTexture('buttonBackHover'))
    // buttonBack.on('pointerout', () => buttonBack.setTexture('buttonBack'))
    buttonBack.on('pointerdown', () => {
      this.sound.add('clickSound').play()
      this.scene.start('Selector')
    })
  }

  update(): void {}
}
