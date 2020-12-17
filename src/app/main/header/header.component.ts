import { Component, OnInit } from '@angular/core';
import { User } from '../../user';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  userLoggedIn = JSON.parse(localStorage.getItem('UserLoggedIn') || '{}');
  profileName = this.userLoggedIn.firstName;
  constructor() {}

  ngOnInit(): void {}
}
