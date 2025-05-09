import { Component, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
  standalone: true,
  imports: [MatIconModule, MatButtonModule],
})
export class UserProfileComponent implements OnInit {
  userInfo: any;

  ngOnInit() {
    this.userInfo = JSON.parse(sessionStorage.getItem('user') || '{}');
  }
  constructor() {}
}
