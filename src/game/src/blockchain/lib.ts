import { ethers } from 'ethers'
import { ShipToken } from '../state/stateTypes'
import { contracts, state } from '../state/state'
const SpaceShipsAbi = require('./abi/SpaceShips.json')
const SpaceCoinsAbi = require('./abi/SpaceCoins.json')
import type { SpaceShips } from './types/contracts/SpaceShips'
import type { SpaceAdventures } from './types/contracts/SpaceAdventures'
import type { SpaceCoins } from './types/contracts/SpaceCoins'
import type { SpaceShips__factory } from './types/factories/contracts/SpaceShips__factory'

declare var window: any
let provider: ethers.providers.Web3Provider
let signer: ethers.providers.JsonRpcSigner
let address: string
let spaceShipsContractWithSigner: SpaceShips
let spaceCoinsContractWithSigner: SpaceCoins

export const connectWallet = async () => {
  provider = new ethers.providers.Web3Provider(window.ethereum)
  const { chainId } = await provider.getNetwork()
  console.log(chainId)

  state.contracts = contracts[chainId]
  if (!state.contracts || !state.contracts.spaceShipsContract || !state.contracts.spaceCoinsContract)
    throw new Error('Wrong Network. Please connect Metamask to the correct testnet.')

  await provider.send('eth_requestAccounts', [])

  signer = provider.getSigner()
  address = await signer.getAddress()

  const spaceShipsContract = new ethers.Contract(state.contracts.spaceShipsContract, SpaceShipsAbi, provider)
  spaceShipsContractWithSigner = <SpaceShips>spaceShipsContract.connect(signer)

  const spaceCoinsContract = new ethers.Contract(state.contracts.spaceCoinsContract, SpaceCoinsAbi, provider)
  spaceCoinsContractWithSigner = <SpaceCoins>spaceCoinsContract.connect(signer)
}

export const getShips = async () => {
  const ownedShipsIds = await spaceShipsContractWithSigner.getTokensOwnedByMe()
  ownedShipsIds.forEach(async (ownedShipsId) => {
    const shipMeta = await spaceShipsContractWithSigner.tokenMeta(ownedShipsId)
    state.ownedShips.push({
      tokenId: shipMeta[0].toNumber(),
      shipCode: shipMeta[3].replace('https://waralpha.io/assets/ships/', '').replace('.json', ''),
      price: shipMeta[1].toNumber(),
      owned: true,
    })
  })
  console.log(state.ownedShips)

  const onSaleShipsIds = await spaceShipsContractWithSigner.getAllOnSale()
  onSaleShipsIds.forEach(async (onSaleShip) => {
    state.onSaleShips.push({
      tokenId: onSaleShip[0].toNumber(),
      shipCode: onSaleShip[3].replace('https://waralpha.io/assets/ships/', '').replace('.json', ''),
      price: onSaleShip[1].toNumber(),
      owned: false,
    })
  })
  console.log(state.onSaleShips)
}

export const buyShip = async (shipToken: ShipToken) => {
  const receipt = await spaceShipsContractWithSigner.purchaseToken(shipToken.tokenId, {
    value: shipToken.price,
  })
  const tx = await receipt.wait()
  console.log(tx)
}

export const sellShip = async (shipToken: ShipToken, price: number) => {
  const receipt = await spaceShipsContractWithSigner.setTokenSale(shipToken.tokenId, true, price)
  const tx = await receipt.wait()
  console.log(tx)
}

export const upgradeShip = async (shipToken: ShipToken) => {
  const receipt = await spaceShipsContractWithSigner.updateTokenUri(
    shipToken.tokenId,
    `https://waralpha.io/assets/ships/${shipToken.shipCode}.json`,
  )
  const tx = await receipt.wait()
  console.log(tx)
}

export const getAlphasBalance = async () => {
  const spaceCoinsBalance = await spaceCoinsContractWithSigner.balanceOf(address)
  state.spaceCoinsBalance = spaceCoinsBalance.toNumber()
  console.log(spaceCoinsBalance.toNumber(), 'SpaceCoins')
}

export const mintTokens = async (amount: number) => {
  const tx = await spaceCoinsContractWithSigner.mint(address, amount)
  const receipt = await tx.wait()
  console.log(receipt)
}

export const burnTokens = async () => {
  const tx = await spaceCoinsContractWithSigner.burn(1000)
  const receipt = await tx.wait()
  console.log(receipt)
}
