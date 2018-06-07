import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { MessageService } from "./message.service";
import { Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { Professor } from "../models/professor";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class ProfessorService {

  private professorsUrl: string = environment.webServiceUrl + "professors";

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string) {
    this.messageService.add("ProfessorService: " + message);
  }

  getProfessors(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.professorsUrl)
      .pipe(
        tap(professors => this.log("Professors DATA Got!")),
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

  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.error.message || error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
