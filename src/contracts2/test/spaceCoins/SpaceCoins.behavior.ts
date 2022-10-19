import { expect } from "chai";

export function shouldBehaveLikeSpaceCoins(): void {
  it("deployer should be owner", async function () {
    const owner = await this.spaceCoins.owner()
    expect(this.signers.admin.address).to.equal(owner);
  });
}
