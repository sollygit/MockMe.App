import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: any = [];
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getProducts();
  }

  getProducts() {
    this.dataService.getProducts()
      .subscribe((response: any[]) => {
        this.products = response;
      });
  }

}
