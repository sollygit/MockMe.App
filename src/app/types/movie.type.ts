export class Movie {
  id!: string;
  title!: string;
  year!: string;
  type!: string;
  poster!: string;
  price!: number;
  released!: Date;
  rating!: number;

  public constructor(
    fields?: {
      id?: string,
      title?: string,
      year?: string,
      type?: string,
      poster?: string,
      price?: number,
      released?: Date,
      rating?: number
    }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
