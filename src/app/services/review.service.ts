import { Injectable } from '@angular/core';
import { GenericService } from './GenericService';
import { Review } from '../models/review';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewService extends GenericService {

  private reviewsUrl: string = this.env.webServiceUrl + 'reviews';
  private _reviewsList: Review[];
  public get reviewsList(): Review[] {
    return this._reviewsList;
  }

  constructor(
    private http: HttpClient,
    private auth: AuthService,
    messageService: MessageService) {
    super(messageService);
    this.messagePrefix = 'ReviewService';
  }

  submitNewReview(review: Review): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json', 'x-access-token': this.auth.currentUser.token })
    };

    return this.http.post<Review>(this.reviewsUrl, review, httpOptions).pipe(
      tap(resultJSON => this.log(`Succesfully created review with id ${resultJSON._id}`)),
      catchError(this.handleError<any>(`creating review`))
    );
  }
}
