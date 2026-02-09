import { Asset } from "./asset.type";

export class BinaryTrade {
  id!: string;
  asset!: Asset;
  expiration!: number;
  amount!: number;
  direction!: number;
  payout!: number;
  color!: string;

  public constructor(
    fields?: {
      id?: string;
      asset?: Asset;
      expiration?: number;
      amount?: number;
      direction?: number;
      payout?: number;
      color?: string;
    }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
