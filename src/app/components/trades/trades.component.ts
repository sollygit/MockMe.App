import { Component, OnInit, ViewChild } from '@angular/core';
import { BinaryTrade } from '../../types/binary-trade.type';
import { TradeService } from '../../services/trade.service';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-trades',
  templateUrl: './trades.component.html',
  styleUrls: ['./trades.component.scss']
})

export class TradesComponent implements OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator!: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort!: MatSort;
  
  readonly displayedColumns: string[] = ['id', 'asset', 'expiration', 'amount', 'direction', 'action'];
  readonly assetList = this.tradeService.AssetList;
  active = 'trades';
  loading = false;
  mostUsedAssets:any[] = [];
  shortLongAssets:any[] = [];
  totalUsed = 0;
  totalShort = 0;
  totalLong = 0;

  dataSource!: MatTableDataSource<BinaryTrade>;
  public trades!: BinaryTrade[];

  constructor(private tradeService: TradeService, private configurationService: ConfigurationService) { }

  ngOnInit() {
    this.getTrades();
  }

  onNavClick() {
    // bind paging and sorting on tab alternations
    if (this.active == 'trades') {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    }
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  getTrades() {
    this.tradeService.getAll()
      .subscribe(trades => {
        this.trades = trades;
        this.trades.map(t => t.color = this.configurationService.randomColor);
        this.dataSource = new MatTableDataSource(trades);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getMostUsedAssets();
        this.getLongShort();
      },
        error => {
          console.log(error);
          this.trades = [];
        });
  }

  deleteTrade(id: string) {
    this.tradeService.delete(id)
      .subscribe(() => {
        this.getTrades();
      });
  }

  generate() {
    this.tradeService.generate()
      .subscribe(() => {
        this.getTrades();
        this.getMostUsedAssets();
        this.getLongShort();
      });
  }

  getMostUsedAssets() {
    this.mostUsedAssets = [];
    this.totalUsed = 0;
    for (let i = 0; i < this.assetList.length; i++) {
      const assetName = this.assetList[i].name;
      const used = this.trades.filter(t => t.asset.name === assetName).map(o => o).length;
      this.mostUsedAssets.push({ asset: assetName, used: used });
      this.totalUsed += used;
    }
    this.mostUsedAssets.sort((a, b) => (a.used > b.used ? -1 : 1));
  }

  getLongShort() {
    this.shortLongAssets = [];
    this.totalShort = this.totalLong = 0;
    for (let i = 0; i < this.assetList.length; i++) {
      const assetName = this.assetList[i].name;
      const short = this.trades.filter(t => t.asset.name === assetName && t.direction === 0).map(o => o).length;
      const long = this.trades.filter(t => t.asset.name === assetName && t.direction === 1).map(o => o).length;
      this.shortLongAssets.push({ asset: assetName, short: short, long: long });
      this.totalShort += short;
      this.totalLong += long;
    }
  }

  public get TotalAmount() { return this.tradeService.TotalAmount; }

  public get TotalUsed() { return this.totalUsed; }

  public get MostUsedAssets() { return this.mostUsedAssets; }

  public get ShortLongAssets() { return this.shortLongAssets; }

  public get TotalShort() { return this.totalShort; }

  public get TotalLong() { return this.totalLong; }
}


