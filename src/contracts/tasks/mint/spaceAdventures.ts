import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type { SpaceAdventures } from "../../types/contracts/SpaceAdventures";
import type { SpaceAdventures__factory } from "../../types/factories/contracts/SpaceAdventures__factory";

task("mint:SpaceAdventures")
  .addParam("address", "")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const spaceAdventuresFactory: SpaceAdventures__factory = <SpaceAdventures__factory>(
      await ethers.getContractFactory("SpaceAdventures")
    );
    const spaceAdventures: SpaceAdventures = <SpaceAdventures>(
      await spaceAdventuresFactory.connect(signers[0]).attach(taskArguments.address)
    );

    for (let i = 0; i < 10; i++) {
      const mint1 = await spaceAdventures
        .connect(signers[0])
        .mintCollectable(
          signers[0].address,
          "ipfs://QmUChT1murKKD5zCWFcpJmzhww35DKWyPU5EJJsdiPpeHQ",
          "The Last Ship",
          1,
          true,
        );
      await mint1.wait();
    }

    const adventuresOnSale = await spaceAdventures.connect(signers[0]).getAllOnSale();
    console.log(adventuresOnSale);

    console.log("DONE");
  });
