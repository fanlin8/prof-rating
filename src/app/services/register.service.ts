import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  private url: string = environment.webServiceUrl + "register";

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add("RegisterService: " + message);
  }

  register(user: User): Observable<any> {
    return this.http.post<User>(this.url, user, httpOptions).pipe(
      tap(resultJSON => this.log(`Succesfully created user with username=${user.username}`)),
      catchError(this.handleError<any>(`creating user with username=${user.username}`))
    );
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
