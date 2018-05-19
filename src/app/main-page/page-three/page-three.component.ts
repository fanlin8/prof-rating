import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { ProfessorService } from '../../services/professor.service';
import { Professor } from '../../models/professor';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-page-three',
  templateUrl: './page-three.component.html',
  styleUrls: ['./page-three.component.css']
})
export class PageThreeComponent implements OnInit {

  professors: Professor[];
  filteredProfessors: Observable<Professor[]>
  availableCourse: string[];

  categoryAll: boolean = true;
  category: boolean[];

  inputControl: FormControl = new FormControl();

  sortOptions: string[] = ["Name", "Rating", "Course"];
  selectedSort: string = "Name";

  constructor(private messageService: MessageService, private professorService: ProfessorService) { }

  ngOnInit() {
    this.professorService.getProfessors().subscribe(professors => {
      this.professors = professors;
      let availableCourseSet: Set<string> = new Set<string>();
      this.professors.forEach(professor => professor.courses.forEach(course => availableCourseSet.add(course.split(" ")[0])));
      this.availableCourse = [];
      this.availableCourse = Array.from(availableCourseSet);
      this.availableCourse.sort((a, b) => a.localeCompare(b));
      this.category = new Array(this.availableCourse.length).fill(false);
    });

    this.filteredProfessors = this.inputControl.valueChanges
      .pipe(
        startWith(''),
        map(input => this.professorsFilter(input))
      );
  }

  onSortChange() {
    switch (this.selectedSort) {
      case "Course":
        this.filteredProfessors = this.filteredProfessors
          .pipe(
            map(professors => professors.sort((a, b) => a.courses[0].localeCompare(b.courses[0])))
          );
        break;

      case "Rating":
        this.filteredProfessors = this.filteredProfessors
          .pipe(
            map(professors => professors.sort((a, b) => a.rating - b.rating))
          );
        break;

      case "Name":
        this.filteredProfessors = this.filteredProfessors
          .pipe(
            map(professors => professors.sort((a, b) => this.getProfessorName(a).localeCompare(this.getProfessorName(b))))
          );
      default:
        break;
    }
  }

  categoryAllChange() {
    if (this.categoryAll) {
      this.category.fill(false);
      this.filteredProfessors = this.filteredProfessors
        .pipe(
          map(professors => professors)
        );
    }
  }

  categoryChange() {
    if (this.category.some(item => item)) {
      this.categoryAll = false;
    } else {
      this.categoryAll = true;
    }
  }

  private professorsFilter(input: string): Professor[] {
    let result = this.professors.filter(professor =>
      this.getProfessorName(professor).toLowerCase().includes(input.toLowerCase())
      || professor.courses.filter(course => course.toLowerCase().includes(input.toLowerCase())).length > 0);
    this.log(`${result.length} professors found!`);
    return result;
  }

  getProfessorName(professor: Professor): string {
    let fullname = professor.firstName;
    if (professor.middleName) {
      fullname += " " + professor.middleName;
    }
    return fullname + " " + professor.lastName;
  }

  private log(message: string) {
    this.messageService.add("PageThreeComponent: " + message);
  }

}
