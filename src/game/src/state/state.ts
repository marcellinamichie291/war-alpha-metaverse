import { Contracts, State } from './stateTypes'

export const contracts: Contracts = {
  80001: {
    //polygon-mumbai
    spaceShipsContract: '0xC95D885A85A3fc66F6c2c9511E8769e9CbC70363',
    spaceCoinsContract: '0x393fDB069940aF8E7AFd04ab9D61A0E2Bb474d03',
    spaceAdventuresContract: '',
  },
  53: {
    //coinex-testnet
    spaceShipsContract: '0xaa71521B33f97CF7466519025BC6d60F55B9dD44',
    spaceCoinsContract: '0x43a4394Aa97Dd5962653886aeD985247d79706cb',
    spaceAdventuresContract: '0x3cC726914296882fB70Bca05017758a611b62A27',
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
  currentShip: {
    tokenId: 0,
    shipCode: '0000',
  },
  ownedAdventures: [],
  currentAdventure: {
    name: 'The Last Ship',
    description: 'After staying in cryostasis for 300 years, you awake in a new galaxy. A ship is hailing you, asking for identification. This adenture will take you to the end of the galaxy in 17 levels of increasing difficulty.',
    external_url: '',
    image: '',
    attributes: [],
    levels: [],
  },
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
