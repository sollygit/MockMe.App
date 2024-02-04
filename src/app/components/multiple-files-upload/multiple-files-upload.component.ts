import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DataService, SubmissionResult } from 'src/app/services/data.service';

@Component({
  selector: 'app-multiple-files-upload',
  templateUrl: './multiple-files-upload.component.html',
  styleUrls: ['./multiple-files-upload.component.scss']
})
export class MultipleFilesUploadComponent implements OnInit {
  fileUploadUrl = `${this.configurations.restUrl}/api/file`;
  fileId = 8888;
  uploadProgress = 0;
  selectedFiles!: File[];
  uploading = false;
  errorMsg = '';
  submissionResults: any;
  
  constructor(
    private readonly dataService: DataService,
    public readonly configurations: ConfigurationService) {}

  ngOnInit() {}

  chooseFile(files: FileList | null) {
    this.submissionResults = [];
    this.selectedFiles = [];
    this.errorMsg = '';
    this.uploadProgress = 0;
    if (!files || files.length === 0) {
      return;
    }
    for (let i = 0; i < files.length; i++) {
      this.selectedFiles.push(files[i]);
    }
  }

  multiUploads() {
    if (!this.selectedFiles || this.selectedFiles.length === 0) {
      this.errorMsg = 'Please choose a file.';
      return;
    }
    const formData = this.getFormData(this.fileId, this.selectedFiles);
    this.uploading = true;
    this.dataService.multiUploads(formData)
    .pipe(finalize(() => {
      this.uploading = false;
      this.selectedFiles = [];
    }))
    .subscribe((event) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.uploadProgress = Math.round((100 * event.loaded) / (event.total || 1));
      } else if (event instanceof HttpResponse) {
        this.submissionResults = event.body;
      }
    });
  }

  getFormData(fileId:number, files:File[]) {
    const formData = new FormData();
    formData.append('fileId', fileId.toString());
    files.forEach((f) => formData.append('files', f));
    return formData;
  }

}
