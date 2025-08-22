import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movie } from 'src/app/types/movie.type';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css']
})

export class MovieComponent implements OnInit {
  loading = false;
  public movie: Movie = new Movie();

  constructor(
    private activatedRoute: ActivatedRoute,
    private movieService: MovieService) {
  }

  ngOnInit() {
    let movieId = this.activatedRoute.snapshot.params['id'] as string;
    let provider = this.activatedRoute.snapshot.params['provider'] as string;
    this.getMovie(provider, movieId);
  }

  toggleLoading(isCompleted: boolean) {
    this.loading = !isCompleted;
  }

  getMovie(provider: string, id: string) {
    this.movieService.get(provider, id)
      .subscribe(movie => {
        // Poulate movie fields from the service
        let item = this.movieService.getById(id);
        movie.title = item!.title;
        movie.year = item!.year;
        movie.price = item!.price;
        movie.poster = item!.poster;
        this.movie = movie;
        this.toggleLoading(true);
      },
        error => {
          console.log(error);
          this.toggleLoading(true);
        });
  }

}
