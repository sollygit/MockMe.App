import { Component, OnInit } from '@angular/core';
import { ShortenedUrl } from 'src/app//types/shortened-url.type';
import { ShortenerService } from 'src/app/services/shortener.service';

@Component({
  selector: 'app-shortened-links',
  templateUrl: './shortened-links.component.html',
  styleUrls: ['./shortened-links.component.css']
})
export class ShortenedLinksComponent implements OnInit {
  loading = false;
  public items: ShortenedUrl[] = [];

  constructor(private shortenerService: ShortenerService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  toggleLoading(isCompleted: boolean) {
    this.loading = !isCompleted;
  }

  getAll() {
    this.shortenerService.getAll()
      .subscribe(items => {
        items.map(m => m.code = m.code.toUpperCase());
        this.items = items;
        this.toggleLoading(true);
      },
        error => {
          console.log(error);
          this.items = [];
          this.toggleLoading(true);
        });
  }

}
