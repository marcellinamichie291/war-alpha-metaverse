import type { SignerWithAddress } from "@nomiclabs/hardhat-ethers/dist/src/signer-with-address";

import type { SpaceAdventures } from "../types/contracts/SpaceAdventures";
import type { SpaceCoins } from "../types/contracts/SpaceCoins";
import type { SpaceShips } from "../types/contracts/SpaceShips";

type Fixture<T> = () => Promise<T>;

declare module "mocha" {
  export interface Context {
    spaceAdventures: SpaceAdventures;
    spaceCoins: SpaceCoins;
    spaceShips: SpaceShips;
    loadFixture: <T>(fixture: Fixture<T>) => Promise<T>;
    signers: Signers;
  }
}

export interface Signers {
  admin: SignerWithAddress;
  alice: SignerWithAddress;
  bob: SignerWithAddress;
}
