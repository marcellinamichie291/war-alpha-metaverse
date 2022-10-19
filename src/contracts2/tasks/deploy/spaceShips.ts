import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type { SpaceShips } from "../../types/contracts/SpaceShips";
import type { SpaceShips__factory } from "../../types/factories/contracts/SpaceShips__factory";

task("deploy:SpaceShips")
  // .addParam("greeting", "Say hello, be nice")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const spaceShipsFactory: SpaceShips__factory = <SpaceShips__factory>await ethers.getContractFactory("SpaceShips");
    const spaceShips: SpaceShips = <SpaceShips>await spaceShipsFactory.connect(signers[0]).deploy();
    await spaceShips.deployed();
    console.log("SpaceShips deployed to: ", spaceShips.address);
  });
