import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-configurations',
  templateUrl: './configurations.component.html',
  styleUrls: ['./configurations.component.scss']
})
export class ConfigurationsComponent implements OnInit {
  accessToken = '';
  refreshToken = '';

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.accessToken = localStorage.getItem('access_token') ?? '';
    this.refreshToken = localStorage.getItem('refresh_token') ?? '';
  }

}
