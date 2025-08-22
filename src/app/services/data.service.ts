import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { ConfigurationService } from '../services/configuration.service';
import { Country } from '../types/country.type';

export interface SubmissionResult {
  fileId: number;
  templateId: number;
  fileName: string;
  fileSize: number;
}

@Injectable()
export class DataService {
  private countryUrl = `${this.configurations.restUrl}/api/mock/country`;
  private fileUploadUrl = `${this.configurations.restUrl}/api/file`;
  
  constructor(private httpClient: HttpClient, private configurations: ConfigurationService) { }

  public getCountries() {
    return this.httpClient.get<Country[]>(this.countryUrl);
  }

  public getJsonFile() {
    return this.httpClient.get<any[]>('assets/movies.json');
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
