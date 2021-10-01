import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit {
  enableButton = false;
  templates: any[] = [];

  public notificationRequest: string = '';

  constructor(private dataService: DataService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.getTemplates();
    this.fetchRequest();
  }

  getTemplates() {
    this.dataService.getTemplates()
      .subscribe((response: any[]) => {
        this.templates = response;
        this.enableButton = true;
      });
  }

  fetchRequest() {
    this.dataService.fetchRequest()
      .subscribe(response => {
        this.notificationRequest = JSON.stringify(response, null, 2);
      });
  }

  sendNotification() {
    this.enableButton = false;
    this.dataService.sendNotification(this.notificationRequest)
      .subscribe(() => {
        this.enableButton = true;
        this.snackBar.open('Notification Sent', 'Success');
      });
  }

}
