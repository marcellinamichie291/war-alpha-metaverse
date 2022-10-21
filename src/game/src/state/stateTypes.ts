export type ShipToken = {
  tokenId: number
  shipCode: string
  price: number
}

export type AdventureToken = {
  name: string
  description: string
  price: number
  external_url: string
  image: string
  attributes?: any[]
  levels: Level[]
}

export type Effect = {
  addToPlayerHealth?: number
  addToEnemyHealth?: number
  addToPlayerThrust?: number
  addToEnemyThrust?: number
  addToPlayerWeaponPower?: number
  addToEnemyWeaponPower?: number
}

export type Response = {
  response: string
  story?: Story
}

export type Story = {
  statement?: string
  effect?: Effect
  responses?: Response[]
}

export type Level = {
  id: number
  starX: number
  starY: number
  background: string
  enemyShipCode: string
  enemySpeed: number
  enemyRateOfFire: number
  enemyHealth: number
  story?: Story
}

export type State = {
  paused: boolean
  playerMaxHealth: number
  playerStartingHealth: number
  playerHealth: number
  playerThrust: number
  playerWeaponPower: number
  enemyHealth: number
  enemyThrust: number
  enemyWeaponPower: number
  contracts: {
    spaceShipsContract?: string
    spaceCoinsContract?: string
  }
  ownedShips: ShipToken[]
  onSaleShips: ShipToken[]
  currentShip: ShipToken | null
  ownedAdventures: AdventureToken[]
  currentAdventure: AdventureToken | null
  currentLevelIndex: number
  levelHistory: number[]
  spaceCoinsBalance: number
  inventory: string[]
  shopInventory: string[]
  shipSize: number
  itemSize: number
}

export type Contracts = {
  [networkId: number]: {
    spaceShipsContract: string
    spaceCoinsContract: string
    spaceAdventuresContract: string
  }
}
