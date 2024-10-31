import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders, HttpRequest } from '@angular/common/http';
import { retry, tap } from 'rxjs/operators';
import { ConfigurationService } from '../services/configuration.service';
import { Product } from '../types/product.type';
import { Country } from '../types/country.type';

export interface SubmissionResult {
  fileId: number;
  templateId: number;
  fileName: string;
  fileSize: number;
}

@Injectable()
export class DataService {
  private productUrl = `${this.configurations.restUrl}/api/mock/product`;
  private countryUrl = `${this.configurations.restUrl}/api/mock/country`;
  private fileUploadUrl = `${this.configurations.restUrl}/api/file`;
  private templatesUrl = `${this.configurations.templateUrl}`;
  private notificationUrl = `${this.configurations.notificationUrl}`;

  public first = '';
  public prev = '';
  public next = '';
  public last = '';

  constructor(private httpClient: HttpClient, private configurations: ConfigurationService) { }

  public getCountries() {
    return this.httpClient.get<Country[]>(this.countryUrl);
  }

  public getProducts() {
    return this.httpClient.get<any[]>('assets/products.json');
  }

  public getTemplates() {
    return this.httpClient.get<any[]>(this.templatesUrl);
  }

  public fetchRequest() {
    return this.httpClient.get('assets/notification-request.json');
  }

  public sendNotification(request: string) {
    const header = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<string>(this.notificationUrl, request, { headers: header });
  }

  public sendGetRequest(page: any, limit: any) {
    return this.httpClient.get<Product[]>(
      this.productUrl,
      { params: new HttpParams({ fromString: `_page=${page}&_limit=${limit}` }), observe: 'response' })
      .pipe(retry(3), tap(response => {
        this.parseLinkHeader(response.headers.get('Link') || '');
      }));
  }

  public sendGetRequestToUrl(url: string) {
    return this.httpClient.get<Product[]>(url, { observe: 'response' })
      .pipe(retry(3), tap(res => {
        this.parseLinkHeader(res.headers.get('Link') || '');
      }));
  }

  parseLinkHeader(header: string) {
    if (!header || header.length === 0) {
      return;
    }

    const parts = header.split(',');
    const links:any = {};
    parts.forEach((p: string) => {
      const section = p.split(';');
      const url = section[0].replace(/<(.*)>/, '$1').trim();
      const name = section[1].replace(/rel="(.*)"/, '$1').trim();
      links[name] = url;
    });

    this.first = links['first'];
    this.last = links['last'];
    this.prev = links['prev'];
    this.next = links['next'];
  }

  public fileUpload(formData: FormData) {
    const fileId = formData.get('fileId');
    return this.httpClient.request<SubmissionResult>(
      new HttpRequest(
        'POST', `${this.fileUploadUrl}/${fileId}/upload`,
        formData, { reportProgress: true }
      ) 
    );
  }

  public multiUploads(formData: FormData) {
    const fileId = formData.get('fileId');
    return this.httpClient.request<SubmissionResult[]>(
      new HttpRequest(
        'POST', `${this.fileUploadUrl}/${fileId}/uploads`,
        formData, { reportProgress: true }
      ) 
    );
  }

}
