import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-json',
  templateUrl: './json.component.html',
  styleUrls: ['./json.component.scss']
})
export class JsonComponent implements OnInit {
  json: any = [];
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getJsonFile();
  }

  getJsonFile() {
    this.dataService.getJsonFile()
      .subscribe((response: any[]) => {
        this.json = response;
      });
  }

}
