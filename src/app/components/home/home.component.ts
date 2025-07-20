import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
import { Product } from '../../types/product.type';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  products: Product[] = [];
  hasPaging: boolean = false;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const page = params['_page'] || 1;
      const limit = params['_limit'] || 5;
      this.dataService.sendGetRequest(page, limit)
        .pipe(takeUntil(this.destroy$))
        .subscribe((response: HttpResponse<Product[]>) => {
          this.products = response.body || [];
          this.hasPaging = this.dataService.first !== '';
        });
    });
  }

  ngOnDestroy() {
    this.destroy$.next(true);
    this.destroy$.unsubscribe(); // Unsubscribe from the subject
  }

  public firstPage() {
    this.products = [];
    this.dataService.sendGetRequestToUrl(this.dataService.first)
      .pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]>) => {
        this.products = res.body || [];
      });
  }

  public previousPage() {
    if (this.dataService.prev !== undefined && this.dataService.prev !== '') {
      this.products = [];
      this.dataService.sendGetRequestToUrl(this.dataService.prev)
        .pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]>) => {
          this.products = res.body || [];
        });
    }
  }

  public nextPage() {
    if (this.dataService.next !== undefined && this.dataService.next !== '') {
      this.products = [];
      this.dataService.sendGetRequestToUrl(this.dataService.next)
        .pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]>) => {
          this.products = res.body || [];
        });
    }
  }

  public lastPage() {
    this.products = [];
    this.dataService.sendGetRequestToUrl(this.dataService.last)
      .pipe(takeUntil(this.destroy$)).subscribe((res: HttpResponse<Product[]>) => {
        this.products = res.body || [];
      });
  }

}
