import { loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { ethers } from "hardhat";

import type { Signers } from "../types";
import { shouldBehaveLikeSpaceShips } from "./SpaceShips.behavior";
import { deploySpaceShipsFixture } from "./SpaceShips.fixture";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];

    this.loadFixture = loadFixture;
  });

  describe("SpaceShips", function () {
    beforeEach(async function () {
      const { spaceShips } = await this.loadFixture(deploySpaceShipsFixture);
      this.spaceShips = spaceShips;
    });

    shouldBehaveLikeSpaceShips();
  });
});
