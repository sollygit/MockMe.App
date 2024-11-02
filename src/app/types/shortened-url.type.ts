export class ShortenedUrl {
  longUrl!: string;
  shortUrl!: string;
  code!: string;

  public constructor(
    fields?: {
      longUrl?: string,
      shortUrl?: string,
      code?: string
    }) {
    if (fields) {
      Object.assign(this, fields);
    }
  }
}
