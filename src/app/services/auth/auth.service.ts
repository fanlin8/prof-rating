import { tap, catchError } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from '../message.service';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserImpl } from '../../models/userImpl';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {
  currentUser: UserImpl = new UserImpl();
  private url: string = environment.webServiceUrl + "login";
  private getMeUrl: string = environment.webServiceUrl + "me";

  // store the URL so we can redirect after logging in
  redirectUrl: string;

  constructor(
    private router: Router,
    private http: HttpClient,
    private messageService: MessageService) {
      if(this.isLoggedIn()){
        this.currentUser.auth = true;
        this.currentUser.token = localStorage.getItem('HU-currentUser');
      }
  }

  private log(message: string) {
    this.messageService.add("AuthService: " + message);
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(this.url, ({ email: email, password: password }), httpOptions).pipe(
      tap(resJSON => {
        this.log(`Succesfully logged in as user=${email}`);
        this.currentUser.auth = resJSON.auth;
        this.currentUser.email = email;
        this.currentUser.token = resJSON.token;
        localStorage.setItem('HU-currentUser', resJSON.token);
      }),
      catchError(this.handleError<any>(`loggin in with email=${email}`))
    );
  }

  logout(): void {
    this.currentUser = new UserImpl();
    localStorage.removeItem('HU-currentUser');
    this.log("Logged Out.")
  }

  getMe(): Observable<any> {
    if (this.currentUser.auth) {
      let getMeOptions = {
        headers: new HttpHeaders({ 'x-access-token': this.currentUser.token })
      };
      return this.http.get<UserImpl>(this.getMeUrl, getMeOptions).pipe(
        tap(user => {
          this.log(`Succesfully get information for user=${user.username}`);
          this.currentUser.username = user.username;
          this.currentUser.roles = user.roles;
        }),
        catchError(this.handleError<any>(`getting information for email=${this.currentUser.email}`))
      );
    } else {
      this.log("Not logged in!!!");
      return of(null);
    }
  }

  isLoggedIn(): boolean {
    return localStorage.getItem('HU-currentUser') != null;
}

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.error.message || error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
