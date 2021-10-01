export class Asset {
  id!: number;
  name!: string;

  public constructor(
    fields?: {
      id?: number;
      name?: string;
    }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
