import { Injectable } from '@angular/core';
import { GenericService } from './GenericService';
import { Observable, of as observableOf } from 'rxjs';
import { Course } from '../models/course';
import { tap, catchError } from 'rxjs/operators';
import { MessageService } from './message.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService extends GenericService {

  private coursesUrl: string = this.env.webServiceUrl + 'courses';

  private _coursesList: Course[];
  public get coursesList(): Course[] {
    return this._coursesList;
  }

  private _coursesMap: Map<string, Course> = new Map<string, Course>();
  public get coursesMap(): Map<string, Course> {
    return this._coursesMap;
  }

  constructor(
    private http: HttpClient,
    messageService: MessageService) {
    super(messageService);
    this.messagePrefix = 'CourseService';
  }

  getCourses(): Observable<Course[]> {
    if (this.coursesList) {
      return observableOf(this.coursesList);
    }

    return this.http.get<Course[]>(this.coursesUrl)
      .pipe(
        tap(courses => {
          this.log(`Courses DATA got with size ${courses.length}`);
          this._coursesList = courses;
          this.coursesList.forEach(course => this._coursesMap.set(course._id, course));
        }),
        catchError(this.handleError('getCourses()', []))
      );
  }

}
