require('dotenv').config()
import { PreloaderScene } from './scenes/preloaderScene'
import { ConnectWalletScene } from './scenes/connectWalletScene'
import { GameOverScene } from './scenes/gameOverScene'
import { GameScene } from './scenes/game/gameScene'
import { InventoryScene } from './scenes/inventoryScene'
import { ShopScene } from './scenes/shopScene'
import { SelectorScene } from './scenes/selectorScene'
import { MapScene } from './scenes/mapScene'
import { DialogScene } from './scenes/dialogScene'
import { GetAlphasScene } from './scenes/getAlphasScene'
import { GetShipsScene } from './scenes/getShipsScene'
import { GetAdventuresScene } from './scenes/getAdventuresScene'

export const GameConfig: Phaser.Types.Core.GameConfig = {
  title: 'WarAlpha',
  url: 'https://waralpha.io',
  version: '3.0',
  width: 1600,
  height: 800,
  type: Phaser.AUTO,
  parent: 'game',
  scene: [
    PreloaderScene,
    ConnectWalletScene,
    SelectorScene,
    GameScene,
    InventoryScene,
    ShopScene,
    GameOverScene,
    MapScene,
    DialogScene,
    GetAlphasScene,
    GetShipsScene,
    GetAdventuresScene,
  ],
  input: {
    keyboard: true,
    mouse: true,
    touch: false,
    gamepad: false,
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
  backgroundColor: '#010022',
  render: { pixelArt: false, antialias: true },
}
