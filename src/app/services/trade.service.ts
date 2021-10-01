import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Asset } from '../types/asset.type';
import { BinaryTrade } from '../types/binary-trade.type';
import { ConfigurationService } from './configuration.service';

@Injectable()
export class TradeService {
  private readonly _assetList = [{ id: 1, name: 'EUR/USD' }, { id: 2, name: 'JPY/USD' }, { id: 3, name: 'GBP/USD' }];
  private readonly tradesUrl: string = `${this.configurations.restUrl}/api/trade`;
  private readonly assetsUrl: string = `${this.configurations.restUrl}api/trade/assets`;

  private totalAmount = 0;
  
  constructor(private http: HttpClient, private configurations: ConfigurationService) { }
  
  public getAll() {
    const response = this.http.get<BinaryTrade[]>(`${this.tradesUrl}`);

    return response.pipe(map(trades => {
      if (trades === null) throw new Error("Something went wrong");
      this.totalAmount = trades.reduce(function (prev, cur) {
        return prev + (cur.amount);
      }, 0);
      return trades;
    }));
  }

  public get(id: string) {
    const url = `${this.tradesUrl}/${id}`;
    const result = this.http.get<BinaryTrade>(url);

    return result.pipe(map(trade => {
      if (trade === null) throw new Error("Something went wrong");
      return trade;
    }));
  }

  public getAssets() {
    const response = this.http.get<Asset[]>(`${this.assetsUrl}`);

    return response.pipe(map(assets => {
      if (assets === null) throw new Error("Something went wrong");
      return assets;
    }));
  }

  public add(binaryTrade: BinaryTrade) {
    const body = JSON.stringify(binaryTrade);
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    const result = this.http.post<BinaryTrade>(this.tradesUrl, body, { headers: header });

    return result.pipe(map(response => {
      if (response === null)
        throw new Error("Something went wrong");
      return response;
    }));
  }

  public update(trade: BinaryTrade) {
    const body = JSON.stringify(trade);
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    const url = `${this.tradesUrl}/${trade.id}`;
    const result = this.http.put<BinaryTrade>(url, body, { headers: header });

    return result.pipe(map(response => {
      if (response === null)
        throw new Error("Something went wrong");
      return response;
    }));
  }

  public delete(id: string) {
    const url = `${this.tradesUrl}/${id}`;
    const result = this.http.delete<BinaryTrade>(url);
    return result.pipe(map(response => {
      if (response === null)
        throw new Error("Something went wrong");
      return response;
    }));
  }

  public generate() {
    const url = `${this.tradesUrl}/generate`;
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    const result = this.http.post<BinaryTrade>(url, null, { headers: header });
    return result.pipe(map(response => {
      if (response === null)
        throw new Error("Something went wrong");
      return response;
    }));
  }

  public get AssetList() { return this._assetList; }

  public get TotalAmount() { return this.totalAmount; }

}
