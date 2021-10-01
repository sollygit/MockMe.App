export class Country {
  countryId!: number;
  countryName!: string;
  countryCode!: string;

  public constructor(
      fields?: {
        countryId: number,
        countryName?: string,
        countryCode?: string
      }) {
      if (fields) {
          Object.assign(this, fields);
      }
  }
}
