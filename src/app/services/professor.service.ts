import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MessageService } from './message.service';
import { Observable, of as observableOf } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Professor } from '../models/professor';
import { GenericService } from './GenericService';
import { CourseService } from './course.service';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService extends GenericService {

  private professorsUrl: string = this.env.webServiceUrl + 'professors';

  private _professorsList: Professor[];
  public get professorsList(): Professor[] {
    return this._professorsList;
  }

  private _professorsMap: Map<string, Professor> = new Map<string, Professor>();
  private get professorsMap(): Map<string, Professor> {
    return this._professorsMap;
  }

  constructor(
    private http: HttpClient,
    messageService: MessageService,
    private courseService: CourseService
  ) {
    super(messageService);
    this.messagePrefix = 'ProfessorService';
  }

  getProfessors(): Observable<Professor[]> {
    if (this._professorsList) {
      return observableOf(this._professorsList);
    }

    return this.http.get<Professor[]>(this.professorsUrl)
      .pipe(
        tap(professors => {
          this.log(`Professors DATA got with size ${professors.length}`);
          this._professorsList = professors;
          this.professorsList.forEach(professor => this._professorsMap.set(professor._id, professor));
        }),
        catchError(this.handleError('getProfessors()', []))
      );
  }

  getProfessorsWithCourses(): Professor[] {
    const newProfessors = [];
    this.professorsList.forEach(professor => {
      professor.course = professor.course.map(course => this.courseService.coursesMap.get(course));
      newProfessors.push(professor);
    });

    return newProfessors;
  }

  getProfessor(id: number): Observable<Professor> {
    const url = `${this.professorsUrl}/${id}`;
    return this.http.get<Professor>(url).pipe(
      tap(professor => this.log(`Got Professor with id=${id}`)),
      catchError(this.handleError<Professor>(`getProfessor() with id=${id}`))
    );
  }
}
