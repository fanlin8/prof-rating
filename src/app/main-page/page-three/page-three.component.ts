import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { ProfessorService } from '../../services/professor.service';
import { Professor } from '../../models/professor';
import { Observable, forkJoin as ObservableForkJoin, of as ObservableOf} from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map, tap } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';

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

  constructor(private messageService: MessageService, private professorService: ProfessorService, private courseService: CourseService) { }

  ngOnInit() {
    // this.professorService.getProfessors().subscribe(professors => {
    //   this.professors = professors;
    // let availableCourseSet: Set<string> = new Set<string>();
    // this.professors.forEach(professor => professor.courses.forEach(course => availableCourseSet.add(course.split(" ")[0])));
    // this.availableCourse = [];
    // this.availableCourse = Array.from(availableCourseSet);
    // this.availableCourse.sort((a, b) => a.localeCompare(b));
    // this.category = new Array(this.availableCourse.length).fill(false);
    // });

    let courseOb = ObservableOf(null);
    if (!this.courseService.coursesList) {
      courseOb = this.courseService.getCourses();
    }

    let professorOb = ObservableOf(null);
    if (!this.professorService.professorsList) {
      professorOb = this.professorService.getProfessors();
    }

    ObservableForkJoin(courseOb, professorOb).subscribe(_ => {
      // this.filteredProfessors = this.inputControl.valueChanges
      // .pipe(
      //   startWith(""),
      //   map(input => this.professorsFilter())
      // );
    });
  }

  // onSortChange() {
  //   this.filteredProfessors = this.filteredProfessors
  //     .pipe(
  //       map(professors => this.sortProfessors(professors))
  //     );
  // }

  // categoryAllChange() {
  //   if (this.categoryAll) {
  //     this.category.fill(false);
  //     this.filteredProfessors = this.filteredProfessors
  //       .pipe(
  //         map(_ => this.professorsFilter(true))
  //       );
  //   }
  // }

  // categoryChange() {
  //   if (this.category.some(item => item)) {
  //     this.categoryAll = false;
  //     this.categoryAllChange();

  //     let checkedItems = [];
  //     for (let index in this.category) {
  //       if (this.category[index]) {
  //         checkedItems.push(this.availableCourse[index]);
  //       }
  //     }

  //     this.filteredProfessors = this.filteredProfessors
  //       .pipe(
  //         map(_ => this.professorsFilter(true)),
  //         map(professors => professors.filter(professor => professor.courses.filter(course => checkedItems.includes(course.split(" ")[0])).length > 0))
  //       );
  //   } else {
  //     this.categoryAll = true;
  //     this.categoryAllChange();
  //   }
  // }

  // private professorsFilter(skipLog?: boolean): Professor[] {
  //   let input = this.inputControl.value || "";
  //   let result = this.professors.filter(professor =>
  //     (this.getProfessorName(professor).toLowerCase().includes(input.toLowerCase())
  //       || professor.courses.filter(course => course.toLowerCase().includes(input.toLowerCase())).length > 0));
  //   result = this.sortProfessors(result);
  //   if (!skipLog) {
  //     this.log(`${result.length} professors found!`);
  //   }
  //   return result;
  // }

  // sortProfessors(professors: Professor[]): Professor[] {
  //   switch (this.selectedSort) {
  //     case "Course":
  //       return professors.sort((a, b) => a.courses[0].localeCompare(b.courses[0]));
  //     case "Rating":
  //       return professors.sort((a, b) => b.rating - a.rating);

  //     case "Name":
  //     default:
  //       return professors.sort((a, b) => this.getProfessorName(a).localeCompare(this.getProfessorName(b)));
  //   }
  // }

  getProfessorName(professor: Professor): string {
    let fullname = professor.first_name;
    if (professor.middle_name) {
      fullname += " " + professor.middle_name;
    }
    return fullname + " " + professor.last_name;
  }

  private log(message: string) {
    this.messageService.add("PageThreeComponent: " + message);
  }

}
