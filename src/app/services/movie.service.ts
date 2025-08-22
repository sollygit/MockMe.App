import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Movie } from 'src/app//types/movie.type';
import { Provider } from 'src/app//types/provider.type';
import { ConfigurationService } from 'src/app//services/configuration.service';

@Injectable()
export class MovieService {
  private _movies: Movie[] = [];
  private readonly _getAll: string = "/api/webjet";

  public providers: Provider[] = [];
  public get moviesUrl() { return this.configurations.starwarsUrl + this._getAll; }

  constructor(private http: HttpClient, private configurations: ConfigurationService) {
    this.initProviders();
  }

  private initProviders() {
    this.providers.push({ providerId: 1, providerName: this.configurations.cinemaWorld });
    this.providers.push({ providerId: 2, providerName: this.configurations.filmWorld });
  }

  public getAll(provider: string) {
    let result = this.http.get<Movie[]>(`${this.moviesUrl}/${provider}`);

    return result.pipe(map(response => {
      if (response == null)
        throw new Error("Something went wrong");
      return response;
    }));
  }

  public get(provider: string, id: string) {
    let result = this.http.get<Movie>(`${this.moviesUrl}/${provider}/${id}`);

    return result.pipe(map(response => {
      if (response == null)
        throw new Error("Something went wrong");
      return response;
    }));
  }

  public getById(id: string) {
    return this._movies.find(movie => movie.id === id);
  }

  get movies(): Movie[] {
    return this._movies;
  }

  set movies(value: Movie[]) {
    this._movies = value;
  }

}
