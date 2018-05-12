import { Http } from '@angular/http';
// import { AuthService } from '../../../services/auth/auth.service';
import { Component, OnInit } from '@angular/core';

// import { AuthHttp } from 'angular2-jwt';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  profile: any;
  message: string;

  // constructor(public auth: AuthService, public http: Http, public authHttp: AuthHttp) { }
  constructor(public http: Http) { }

  ngOnInit() {
    // if (this.auth.userProfile) {
    //   this.profile = this.auth.userProfile;
    // } else {
    //   this.auth.getProfile((err, profile) => {
    //     this.profile = profile;
    //   });
    // }
  }

  apiTest(): void {
    this.message = '';
    // this.authHttp.get(`http://localhost:9898/article/1`)
    //   .map(res => res.json())
    //   .subscribe(
    //     data => this.message = data.message,
    //     error => this.message = error
    //   );
  }

  loginMessage(): void {
    this.message = '';
    // this.http.get(`http://localhost:9898/login`)
    //   .map(res => res.json())
    //   .subscribe(
    //     data => this.message = data.message,
    //     error => this.message = error
    //   );
  }
}
