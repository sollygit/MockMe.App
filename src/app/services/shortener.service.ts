import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { ShortenedUrl } from 'src/app//types/shortened-url.type'
import { ConfigurationService } from './configuration.service';

@Injectable()
export class ShortenerService {
  private readonly _getAll: string = "/api/urlshortener";

  public get getAllUrl() { return this.configurations.shortenerUrl + this._getAll; }

  constructor(private http: HttpClient, private configurations: ConfigurationService) {
  }

  public getAll() {
    let result = this.http.get<ShortenedUrl[]>(`${this.getAllUrl}`);

    return result.pipe(map(response => {
      if (response == null)
        throw new Error("Something went wrong");
      return response;
    }));
  }

}
