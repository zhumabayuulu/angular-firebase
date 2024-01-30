import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit{
  constructor(private auth: AuthService,) { }

  ngOnInit(): void {
  }

  logout() {
    this.auth.logout();
  }

}
