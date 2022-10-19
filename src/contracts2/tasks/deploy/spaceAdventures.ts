import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type { SpaceAdventures } from "../../types/contracts/SpaceAdventures";
import type { SpaceAdventures__factory } from "../../types/factories/contracts/SpaceAdventures__factory";

task("deploy:SpaceAdventures")
  // .addParam("greeting", "Say hello, be nice")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const spaceAdventuresFactory: SpaceAdventures__factory = <SpaceAdventures__factory>await ethers.getContractFactory("SpaceAdventures");
    const spaceAdventures: SpaceAdventures = <SpaceAdventures>await spaceAdventuresFactory.connect(signers[0]).deploy();
    await spaceAdventures.deployed();
    console.log("SpaceAdventures deployed to: ", spaceAdventures.address);
  });
