import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

import type { SpaceShips } from "../../types/contracts/SpaceShips";
import type { SpaceShips__factory } from "../../types/factories/contracts/SpaceShips__factory";

export async function deploySpaceShipsFixture(): Promise<{ spaceShips: SpaceShips }> {
  const signers: SignerWithAddress[] = await ethers.getSigners();
  const admin: SignerWithAddress = signers[0];
  const spaceShipsFactory: SpaceShips__factory = <SpaceShips__factory>await ethers.getContractFactory("SpaceShips", {
    signer: admin,
  });
  const spaceShips: SpaceShips = <SpaceShips>await spaceShipsFactory.connect(admin).deploy();
  await spaceShips.deployed();
  return { spaceShips };
}
