import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { task } from "hardhat/config";
import type { TaskArguments } from "hardhat/types";

import type { SpaceShips } from "../../types/contracts/SpaceShips";
import type { SpaceShips__factory } from "../../types/factories/contracts/SpaceShips__factory";

task("mint:SpaceShips")
  .addParam("address", "")
  .setAction(async function (taskArguments: TaskArguments, { ethers }) {
    const signers: SignerWithAddress[] = await ethers.getSigners();
    const spaceShipsFactory: SpaceShips__factory = <SpaceShips__factory>await ethers.getContractFactory("SpaceShips");
    const spaceShips: SpaceShips = <SpaceShips>(
      await spaceShipsFactory.connect(signers[0]).attach(taskArguments.address)
    );

    const mint1 = await spaceShips
      .connect(signers[0])
      .mintCollectable(signers[0].address, "https://waralpha.io/assets/ships/0000.json", "Genesis Ship", 2, true);
    await mint1.wait();

    const mint2 = await spaceShips
      .connect(signers[0])
      .mintCollectable(signers[0].address, "https://waralpha.io/assets/ships/1021.json", "Genesis Ship", 150, true);
    await mint2.wait();

    const mint3 = await spaceShips
      .connect(signers[0])
      .mintCollectable(signers[0].address, "https://waralpha.io/assets/ships/2233.json", "Genesis Ship", 2000, true);
    await mint3.wait();

    const mint4 = await spaceShips
      .connect(signers[0])
      .mintCollectable(signers[0].address, "https://waralpha.io/assets/ships/3312.json", "Genesis Ship", 300000, true);
    await mint4.wait();

    const mint5 = await spaceShips
      .connect(signers[0])
      .mintCollectable(signers[0].address, "https://waralpha.io/assets/ships/0102.json", "Genesis Ship", 10, true);
    await mint5.wait();

    const mint6 = await spaceShips
      .connect(signers[0])
      .mintCollectable(signers[0].address, "https://waralpha.io/assets/ships/3333.json", "Genesis Ship", 10, true);
    await mint6.wait();

    const shipsOnSale = await spaceShips.connect(signers[0]).getAllOnSale();
    console.log(shipsOnSale);

    console.log('DONE')
  });
