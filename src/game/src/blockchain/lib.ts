import { ethers } from 'ethers'
import { ShipToken } from '../state/stateTypes'
import { contracts, state } from '../state/state'
const SpaceShipsAbi = require('./abi/SpaceShips.json')
const SpaceCoinsAbi = require('./abi/SpaceCoins.json')

declare var window: any
let provider: ethers.providers.Web3Provider
let signer: ethers.providers.JsonRpcSigner
let address: string
let spaceShipsContractWithSigner: ethers.Contract
let spaceCoinsContractWithSigner: ethers.Contract

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
  spaceShipsContractWithSigner = spaceShipsContract.connect(signer)

  const spaceCoinsContract = new ethers.Contract(state.contracts.spaceCoinsContract, SpaceCoinsAbi, provider)
  spaceCoinsContractWithSigner = spaceCoinsContract.connect(signer)
}

export const getShips = async () => {
  const shipId1 = await spaceShipsContractWithSigner.tokenOfOwnerByIndex(address, 1)
  const shipId2 = await spaceShipsContractWithSigner.tokenOfOwnerByIndex(address, 2)
  const shipId3 = await spaceShipsContractWithSigner.tokenOfOwnerByIndex(address, 3)
  const shipId4 = await spaceShipsContractWithSigner.tokenOfOwnerByIndex(address, 4)

  const shipCode1 = await spaceShipsContractWithSigner._tokenToShipCode(shipId1)
  const shipCode2 = await spaceShipsContractWithSigner._tokenToShipCode(shipId2)
  const shipCode3 = await spaceShipsContractWithSigner._tokenToShipCode(shipId3)
  const shipCode4 = await spaceShipsContractWithSigner._tokenToShipCode(shipId4)

  state.ownedShips = [
    {
      tokenId: shipId1,
      shipCode: shipCode1,
    },
    {
      tokenId: shipId2,
      shipCode: shipCode2,
    },
    {
      tokenId: shipId3,
      shipCode: shipCode3,
    },
    {
      tokenId: shipId4,
      shipCode: shipCode4,
    },
  ]
  console.log(state.ownedShips)
}

export const mintShip = async () => {
  const tx = await spaceShipsContractWithSigner.mintShip(address)
  const receipt = await tx.wait()
  console.log(receipt)
}

export const upgradeShip = async (ship: ShipToken) => {
  const tx = await spaceShipsContractWithSigner.upgradeShip(ship.tokenId, ship.shipCode)
  const confirmation = await provider.getTransactionReceipt(tx.hash)
  console.log(confirmation)
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
