// import { task } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import { TaskArguments } from "hardhat/types";

import { SpaceAdventures__factory } from "../../src/types/factories/contracts/SpaceAdventures__factory";
import { SpaceAdventures } from "../../src/types/contracts/SpaceAdventures";

task("deploy:SpaceAdventures")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const spaceAdventuresFactory: SpaceAdventures__factory = <SpaceAdventures__factory>await ethers.getContractFactory("SpaceAdventures");
    const spaceAdventures: SpaceAdventures = <SpaceAdventures>await spaceAdventuresFactory.deploy();//, { from: signers[0].address });
    await spaceAdventures.deployed();
    console.log("SpaceAdventures deployed to: ", spaceAdventures.address);
  });
