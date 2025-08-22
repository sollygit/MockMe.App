import { Component, OnInit } from '@angular/core';
import { Movie } from 'src//app/types/movie.type';
import { Provider } from 'src/app/types/provider.type';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {
  loading = false;
  starwarsUrl = this.config.starwarsUrl;
  public movies: Movie[] = [];
  public providerList: Provider[] = [];

  constructor(private movieService: MovieService,
    private config: ConfigurationService) {
    this.providerList = this.movieService.providers;
  }

  ngOnInit(): void {
    this.getMovies(this.config.cinemaWorld);
  }

  getMovies(provider: string) {
    this.movieService.getAll(provider)
      .subscribe(movies => {
        movies.map(m => m.id = m.id.toUpperCase());
        this.movies = movies;
        this.movieService.movies = movies;
        this.loading = false;
      },
        error => {
          console.log(error);
          this.movies = [];
          this.loading = true;
        });
  }

}
