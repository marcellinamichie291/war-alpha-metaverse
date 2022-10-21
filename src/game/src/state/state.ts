import { Contracts, State } from './stateTypes'
import adventure1 from '../dsl/dsl.json' assert { type: 'json' }

export const contracts: Contracts = {
  5: {
    //goerli
    spaceShipsContract: '0xaa71521B33f97CF7466519025BC6d60F55B9dD44',
    spaceCoinsContract: '0x43a4394Aa97Dd5962653886aeD985247d79706cb',
    spaceAdventuresContract: '0x3cC726914296882fB70Bca05017758a611b62A27',
  },
  80001: {
    //polygon-mumbai
    spaceShipsContract: '0x731717aF633444a034a6C2436f716B0Caf3C57D6',
    spaceCoinsContract: '0xe1E4E959A260C20DC6252C2C999a253b7F39de18',
    spaceAdventuresContract: '0xF96D06D186BcAd378157CFdCd1D072f187c11b91',
  },
  53: {
    //coinex-testnet
    spaceShipsContract: '0x959907E42f3520Ae9CaA75349941B592d3C6EBE0',
    spaceCoinsContract: '0x2401873a29C0f7fEF76Bd18Fb26C5e62CD07A47c',
    spaceAdventuresContract: '0x935e00E8Ad0e8BBDfDFE1D7f742b7A2C56765421',
  },
  1001: {
    //klaytn-testnet
    spaceShipsContract: '0x959907E42f3520Ae9CaA75349941B592d3C6EBE0',
    spaceCoinsContract: '0x2401873a29C0f7fEF76Bd18Fb26C5e62CD07A47c',
    spaceAdventuresContract: '0x935e00E8Ad0e8BBDfDFE1D7f742b7A2C56765421',
  },
}

export let state: State = {
  paused: false,
  playerMaxHealth: 30,
  playerStartingHealth: 30,
  playerHealth: 0,
  playerThrust: 0,
  playerWeaponPower: 0,
  enemyHealth: 0,
  enemyThrust: 0,
  enemyWeaponPower: 0,
  contracts: {
    spaceShipsContract: undefined,
    spaceCoinsContract: undefined,
  },
  ownedShips: [],
  onSaleShips: [],
  currentShip: null,
  ownedAdventures: [],
  currentAdventure: adventure1,
  currentLevelIndex: 0,
  levelHistory: [],
  spaceCoinsBalance: 0,
  inventory: [],
  shopInventory: [
    'itemCabin0',
    'itemCabin1',
    'itemCabin2',
    'itemCabin3',
    'itemWeapon0',
    'itemWeapon1',
    'itemWeapon2',
    'itemWeapon3',
    'itemWing0',
    'itemWing1',
    'itemWing2',
    'itemWing3',
    'itemEngine0',
    'itemEngine1',
    'itemEngine2',
    'itemEngine3',
  ],
  shipSize: 60,
  itemSize: 50,
}
