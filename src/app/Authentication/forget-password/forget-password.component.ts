import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent implements OnInit {

  email : string = '';

  constructor(private auth : AuthService) { }

  ngOnInit(): void {
  }

 // forgetPassword() {
 //   this.auth.forgetPassword(this.email);
 //   this.email = '';
//  }

}
