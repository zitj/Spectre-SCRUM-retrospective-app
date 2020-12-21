import { Component, OnInit } from '@angular/core';
import { userInfo } from 'os';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userLoggedIn;

  constructor() {
    this.userLoggedIn = JSON.parse(
      localStorage.getItem('UserLoggedIn') || '{}'
    );
  }

  ngOnInit(): void {}

  logOut(): void {
    localStorage.removeItem('UserLoggedIn');
    window.location.replace('/auth');
  }
}
