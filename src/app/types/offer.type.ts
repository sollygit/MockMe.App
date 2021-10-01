export class Offer {
  country!: string;
  state!: string;
  postcode!: string;
  fullName!: string;

  public constructor(
    fields?: {
      country?: string,
      state?: string,
      postcode?: string,
      fullName?: string
    }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
