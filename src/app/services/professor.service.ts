import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "./message.service";
import { Observable } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Professor } from "../models/professor";
import { GenericService } from "./GenericService";

@Injectable({
  providedIn: "root"
})
export class ProfessorService extends GenericService {

  private professorsUrl: string = this.env.webServiceUrl + "professors";
  public professorsList: Professor[];

  constructor(
    private http: HttpClient,
    messageService: MessageService
  ) {
    super(messageService);
    this.messagePrefix = "ProfessorService";
  }

  getProfessors(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.professorsUrl)
      .pipe(
        tap(professors => {
          this.log(`Professors DATA got with size ${professors.length}`);
          this.professorsList = professors;
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
