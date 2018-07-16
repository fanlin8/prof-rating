import { Injectable } from '@angular/core';
import { GenericService } from './GenericService';
import { Review } from '../models/review';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of as observableOf } from 'rxjs';
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

  private _professorReviewsMap = new Map<string, Review[]>();
  public get professorReviewsMap(): Map<string, Review[]> {
    return this._professorReviewsMap;
  }

  private _needReload = false;
  public get needReload(): boolean {
    return this._needReload;
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
      tap(resultJSON => {
        this.log(`Succesfully created review with id ${resultJSON._id}`);
        this._needReload = true;
      }),
      catchError(this.handleError<any>(`creating review`))
    );
  }

  getReviewsByProfessorId(id: string): Observable<Review[]> {
    if (this.professorReviewsMap.get(id) && !this._needReload) {
      return observableOf(this.professorReviewsMap.get(id));
    }

    return this.http.get<Review[]>(this.reviewsUrl + '/' + id)
      .pipe(
        tap(reviews => {
          this.log(`Reviews DATA got with size ${reviews.length}`);
          this.professorReviewsMap.set(id, reviews);
          this._needReload = false;
        }),
        catchError(this.handleError('getReviewsByProfessorId()', []))
      );
  }
}
