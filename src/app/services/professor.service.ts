import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "./message.service";
import { Observable, of as observableOf } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Professor } from "../models/professor";
import { GenericService } from "./GenericService";

@Injectable({
  providedIn: "root"
})
export class ProfessorService extends GenericService {

  private professorsUrl: string = this.env.webServiceUrl + "professors";
  
  private _professorsList: Professor[];
  public get professorsList(): Professor[] {
    return this._professorsList;
  }


  constructor(
    private http: HttpClient,
    messageService: MessageService
  ) {
    super(messageService);
    this.messagePrefix = "ProfessorService";
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
        }),
        catchError(this.handleError("getProfessors()", []))
      );
  }

  getProfessor(id: number): Observable<Professor> {
    let url = `${this.professorsUrl}/${id}`;
    return this.http.get<Professor>(url).pipe(
      tap(professor => this.log(`Got Professor with id=${id}`)),
      catchError(this.handleError<Professor>(`getProfessor() with id=${id}`))
    );
  }
}
