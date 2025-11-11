import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { finalize } from 'rxjs/operators';
import { ConfigurationService } from 'src/app/services/configuration.service';
import { DataService, SubmissionResult } from 'src/app/services/data.service';

@Component({
  selector: 'app-student-forms',
  templateUrl: './student-forms.component.html',
  styleUrls: ['./student-forms.component.scss']
})
export class StudentFormsComponent implements OnInit {
  fileUploadUrl = `${this.configurations.restUrl}/api/file`;
  link = `${this.fileUploadUrl}/Fluent_Financial.pdf`;
  fileId = 9999;
  templateId = 101;
  uploadProgress = 0;
  selectedFile: any;
  uploading = false;
  errorMsg = '';
  courses: string[] = ['Math', 'Reading'];
  submissionResult!: SubmissionResult | null;

  constructor(
    private readonly dataService: DataService,
    public readonly configurations: ConfigurationService) {}

  ngOnInit() {}

  chooseFile(files: FileList | null) {
    this.submissionResult = null;
    this.selectedFile = null;
    this.errorMsg = '';
    this.uploadProgress = 0;
    if (!files || files.length === 0) {
      return;
    }
    this.selectedFile = files[0];
  }

  fileUpload() {
    if (!this.selectedFile) {
      this.errorMsg = 'Please choose a file.';
      return;
    }
    const formData = this.getFormData(this.selectedFile, this.fileId, this.templateId, this.courses);
    this.uploading = true;
    this.dataService.fileUpload(formData)
      .pipe(finalize(() => {
        this.uploading = false;
        this.selectedFile = null;
      }))
      .subscribe(
        (event) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.uploadProgress = Math.round((100 * event.loaded) / (event.total || 1));
          } else if (event instanceof HttpResponse) {
            this.submissionResult = event.body;
          }
        }
      );
  }

  getFormData(file:File, fileId:number, templateId:number, courses:string[]) {
    const formData = new FormData();
    formData.append('templateFile', file);
    formData.append('fileId', fileId.toString());
    formData.append('templateId', templateId.toString());
    courses.forEach((c) => { formData.append('courses', c); });
    return formData;
  }

}
