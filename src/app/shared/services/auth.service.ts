import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth'
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['home']);

      if (res.user?.emailVerified == true) {
        this.router.navigate(['home']);
      } else {
        this.router.navigate(['/varify-email']);
      }
    }, err => {
      alert(err.message);
      this.router.navigate(['/login']);
    })
  }

  // register method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      alert('Registration Successful');
      this.sendEmailForVarification(res.user);
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register']);
    })
  }

  // sign out
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  // forgot password
  forgetPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/varify-email']);
    }, err => {
      alert('Something went wrong');
    })
  }

  //email varification
  sendEmailForVarification(user: any) {
    console.log(user);
    user.sendEmailVerification().then((res: any) => {
      this.router.navigate(['/varify-email']);
    }, (err: any) => {
      alert('Something went wrong. Not able to send mail to your email.')
    })
  }
  //sign in with google
  googleSignIn() {
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {

      this.router.navigate(['/home']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));

    }, err => {
      alert(err.message);
    })
  }




}
