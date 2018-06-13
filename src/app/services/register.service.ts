import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { User } from '../models/user';
import { Observable, of } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { GenericService } from './GenericService';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class RegisterService extends GenericService {

  private url: string = environment.webServiceUrl + "register";

  constructor(
    private http: HttpClient,
    messageService: MessageService) {
    super(messageService);
    this.messagePrefix = "RegisterService";
  }

  register(user: User): Observable<any> {
    return this.http.post<User>(this.url, user, httpOptions).pipe(
      tap(resultJSON => this.log(`Succesfully created user with username=${user.username}`)),
      catchError(this.handleError<any>(`creating user with username=${user.username}`))
    );
  }
}
