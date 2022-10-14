import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";
import { artifacts, ethers, waffle } from "hardhat";
import type { Artifact } from "hardhat/types";
import { expect } from "chai";

import type { SpaceShips } from "../../src/types/contracts/SpaceShips";
import { Signers } from "../types";

describe("Unit tests", function () {
  before(async function () {
    this.signers = {} as Signers;

    const signers: SignerWithAddress[] = await ethers.getSigners();
    this.signers.admin = signers[0];
    this.signers.alice = signers[1];
    this.signers.bob = signers[2];

  });

  describe("SpaceShips", function () {
    beforeEach(async function () {
      const spaceshipsArtifact: Artifact = await artifacts.readArtifact("SpaceShips");
      this.spaceships = <SpaceShips>await waffle.deployContract(this.signers.admin, spaceshipsArtifact, []);
    });

    it("should behave like spaceships", async function () {
      // Mint new ships
      await this.spaceships.connect(this.signers.admin).mintShip(this.signers.admin.address);
      await this.spaceships.connect(this.signers.admin).mintShip(this.signers.admin.address);
      await this.spaceships.connect(this.signers.admin).mintShip(this.signers.admin.address);
      await this.spaceships.connect(this.signers.alice).mintShip(this.signers.alice.address);
      await this.spaceships.connect(this.signers.bob).mintShip(this.signers.bob.address);
  
      // Get balances
      const adminBalance = await this.spaceships.balanceOf(this.signers.admin.address);
      expect(adminBalance).to.equal(3);
      const aliceBalance = await this.spaceships.balanceOf(this.signers.alice.address);
      expect(aliceBalance).to.equal(1);
      const bobBalance = await this.spaceships.balanceOf(this.signers.bob.address);
      expect(bobBalance).to.equal(1);
  
      // Get tokenIds
      const adminToken1 = await this.spaceships.tokenOfOwnerByIndex(this.signers.admin.address, 1);
      expect(adminToken1).to.equal(1);
      const adminToken2 = await this.spaceships.tokenOfOwnerByIndex(this.signers.admin.address, 2);
      expect(adminToken2).to.equal(2);
      const adminToken3 = await this.spaceships.tokenOfOwnerByIndex(this.signers.admin.address, 3);
      expect(adminToken3).to.equal(3);
      const adminToken4 = await this.spaceships.tokenOfOwnerByIndex(this.signers.admin.address, 4);
      expect(adminToken4).to.equal(0);
      const aliceToken1 = await this.spaceships.tokenOfOwnerByIndex(this.signers.alice.address, 1);
      expect(aliceToken1).to.equal(4);
      const bobToken1 = await this.spaceships.tokenOfOwnerByIndex(this.signers.bob.address, 1);
      expect(bobToken1).to.equal(5);
  
      // Get ship codes
      const shipCode1 = await this.spaceships._tokenToShipCode(1);
      expect(shipCode1).to.equal("0000");
  
      // Upgrade ship
      await this.spaceships.connect(this.signers.admin).upgradeShip(1, "0123");
      const upgradedShipCode1 = await this.spaceships._tokenToShipCode(1);
      expect(upgradedShipCode1).to.equal("0123");
    });
  });
});
