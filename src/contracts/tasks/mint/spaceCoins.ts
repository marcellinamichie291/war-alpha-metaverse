import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type { SpaceCoins } from "../../types/contracts/SpaceCoins";
import type { SpaceCoins__factory } from "../../types/factories/contracts/SpaceCoins__factory";

task("mint:SpaceCoins")
  .addParam("address", "")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const spaceCoinsFactory: SpaceCoins__factory = <SpaceCoins__factory>await ethers.getContractFactory("SpaceCoins");
    const spaceCoins: SpaceCoins = <SpaceCoins>(
      await spaceCoinsFactory.connect(signers[0]).attach(taskArguments.address)
    );

    const mint1 = await spaceCoins
      .connect(signers[0])
      .mint(signers[0].address, 1000);
    await mint1.wait();

    console.log('DONE')
  });
