import { Component, OnInit } from '@angular/core';
import { ShortenedUrl } from 'src/app/types/shortened-url.type';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { ShortenerService } from 'src/app/services/shortener.service';

@Component({
  selector: 'app-shortened-links',
  templateUrl: './shortened-links.component.html',
  styleUrls: ['./shortened-links.component.css']
})
export class ShortenedLinksComponent implements OnInit {
  shortenerUrl = this.configService.shortenerUrl;
  appVersion = this.configService.appVersion;
  loading = true;
  public items: ShortenedUrl[] = [];

  constructor(private shortenerService: ShortenerService, private configService: ConfigurationService) {
  }

  ngOnInit(): void {
    this.getAll();
  }

  getAll() {
    this.shortenerService.getAll()
      .subscribe(items => {
        items.map(m => m.code = m.code.toUpperCase());
        this.items = items;
        this.loading = false;
      },
        error => {
          console.log(error);
          this.items = [];
          this.loading = true;
        });
  }

}
