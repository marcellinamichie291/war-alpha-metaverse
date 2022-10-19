import { BN, constants, expectEvent, expectRevert } from "@openzeppelin/test-helpers";
import { expect } from "chai";

export function shouldBehaveLikeSpaceAdventures(): void {
  it("should mint a token and emmit a Transfer event", async function () {
    const priceWei = 2;
    const tokenUri = "ipfs://QmTy8w65yBXgyfG2ZBg5TrfB2hPjrDQH3RCQFJGkARStJb";
    const tokenName = "Test Token"

    const mintTo = this.signers.admin.address;
    const receipt = await this.spaceAdventures
      .connect(this.signers.admin)
      .mintCollectable(mintTo, tokenUri, tokenName, priceWei, false);
    console.log(receipt);

    const tx = await receipt.wait();
    console.log(tx);

    expect(tx?.events?.[0].event).to.equal("Transfer");
    // expectEvent(tx, "Transfer", {
    //   from: constants.ZERO_ADDRESS,
    //   to: mintTo,
    //   tokenId,
    // });
  });

  it("should revert for transfering to zero address", async function () {
    const from = this.signers.admin.address;
    const to = constants.ZERO_ADDRESS;
    const tokenId = 0

    const receipt = await this.spaceAdventures.connect(this.signers.admin).transferFrom(from, to, tokenId);
    console.log(receipt);

    await expectRevert(receipt, "ERC721: transfer to the zero address");
  });

  // it("should match token meta", async function () {
  //   const priceWei = new BN(1.5);
  //   const tokenId = new BN(1);

  //   const { id, price, name, uri, sale } = await this.spaceadventures.connect(this.signers.admin).tokenMeta(tokenId);

  //   expect(id).to.equal(tokenId);
  //   expect(price).to.equal(priceWei);
  //   expect(name).to.equal("Token 1");
  //   expect(uri).to.equal("1");
  //   expect(sale).to.equal(true);
  // });

  // it("should transfer token successfully, match new owner and emit a Transfer event", async function () {
  //   const from = this.signers.admin;
  //   const to = this.signers.alice;

  //   const tokenId = new BN(1);

  //   const receipt = await this.spaceadventures.connect(this.signers.admin).transferFrom(from, to, tokenId, { from });

  //   const owner = await this.spaceadventures.connect(this.signers.admin).ownerOf(tokenId);
  //   expect(owner).to.equal(to);

  //   expectEvent(receipt, "Transfer", {
  //     from,
  //     to,
  //     tokenId,
  //   });
  // });

  // it("should purchase token", async function () {
  //   const sender = this.signers.admin;
  //   const tokenId = new BN(1);

  //   await this.spaceadventures
  //     .connect(this.signers.admin)
  //     .purchaseToken(tokenId, { from: sender, value: new BN(1.5) });
  //   const newOwner = await this.spaceadventures.connect(this.signers.admin).ownerOf(tokenId);

  //   expect(newOwner).to.equal(sender);
  // });

  // it("should revert for buying already owned token", async function () {
  //   const sender = this.signers.admin;
  //   const tokenId = new BN(1);

  //   await expectRevert.unspecified(
  //     this.spaceadventures.connect(this.signers.admin).purchaseToken(tokenId, { from: sender, value: new BN(1.5) }),
  //   );
  // });

  // it("should revert for trying to buy token for less than the set price", async function () {
  //   const sender = this.signers.alice;
  //   const tokenId = new BN(1);

  //   await expectRevert.unspecified(
  //     this.spaceadventures.connect(this.signers.admin).purchaseToken(tokenId, { from: sender, value: new BN(0.1) }),
  //   );
  // });

  // it("should return all tokens on sale", async function () {
  //   const tokens = await this.spaceadventures.connect(this.signers.admin).getAllOnSale();
  //   expect(tokens.length).to.equal(1);
  // });

  // it("should change token price", async function () {
  //   const newPrice = new BN(2);
  //   const tokenId = new BN(1);

  //   await this.spaceadventures
  //     .connect(this.signers.admin)
  //     .setTokenPrice(tokenId, newPrice, { from: this.signers.admin });

  //   const price = await this.spaceadventures.connect(this.signers.admin).tokenPrice(tokenId);

  //   expect(price.toString()).to.equal(newPrice.toString());
  // });

  // it("should remove token from sale", async function () {
  //   const tokenId = new BN(1);
  //   const price = new BN(2);

  //   await this.spaceadventures
  //     .connect(this.signers.admin)
  //     .setTokenSale(tokenId, false, price, { from: this.signers.admin });

  //   const { sale } = await this.spaceadventures.connect(this.signers.admin).tokenMeta(tokenId);

  //   expect(sale).to.equal(false);
  // });
}
