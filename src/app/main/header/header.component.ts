import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userLoggedIn = JSON.parse(localStorage.getItem('UserLoggedIn') || '{}');
  profileName = this.userLoggedIn.firstName;
  constructor() {}

  logOut(): void {
    localStorage.removeItem('UserLoggedIn');
    window.location.replace('/auth');
  }

  ngOnInit(): void {}
}
