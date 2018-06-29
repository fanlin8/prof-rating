import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { MessageService } from '../../services/message.service';
import { ProfessorService } from '../../services/professor.service';
import { Professor } from '../../models/professor';
import { Observable, forkJoin as ObservableForkJoin, of as ObservableOf } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map, tap } from 'rxjs/operators';
import { CourseService } from '../../services/course.service';
import { AuthService } from '../../services/auth/auth.service';
import { DialogService } from '../../services/dialog/dialog.service';

@Component({
  selector: 'app-page-three',
  templateUrl: './page-three.component.html',
  styleUrls: ['./page-three.component.css']
})
export class PageThreeComponent implements OnInit {

  professors: Professor[];
  filteredProfessors: Observable<Professor[]>;
  availableCourse: string[];

  categoryAll = true;
  category: boolean[];

  inputControl: FormControl = new FormControl();

  sortOptions: string[] = ['Name', 'Rating', 'Course'];
  selectedSort = 'Name';

  constructor(
    private messageService: MessageService,
    public auth: AuthService,
    private professorService: ProfessorService,
    private courseService: CourseService,
    private dialogService: DialogService,
    private viewContainerRef: ViewContainerRef
  ) { }

  ngOnInit() {
    this.log(`If user logged in: ${this.auth.isLoggedIn()}`);
    // this.professorService.getProfessors().subscribe(professors => {
    //   this.professors = professors;
    // let availableCourseSet: Set<string> = new Set<string>();
    // this.professors.forEach(professor => professor.courses.forEach(course => availableCourseSet.add(course.split(" ")[0])));
    // this.availableCourse = [];
    // this.availableCourse = Array.from(availableCourseSet);
    // this.availableCourse.sort((a, b) => a.localeCompare(b));
    // this.category = new Array(this.availableCourse.length).fill(false);
    // });

    const courseOb = this.courseService.getCourses();
    const professorOb = this.professorService.getProfessors();

    ObservableForkJoin(courseOb, professorOb).subscribe(res => {
      this.professors = this.professorService.getProfessorsWithCourses();
      this.filteredProfessors = this.inputControl.valueChanges
        .pipe(
          startWith(''),
          map(_ => this.professorsFilter())
        );
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
  //         map(professors => professors.filter(
  //   professor => professor.courses.filter(course => checkedItems.includes(course.split(" ")[0])).length > 0))
  //       );
  //   } else {
  //     this.categoryAll = true;
  //     this.categoryAllChange();
  //   }
  // }

  private professorsFilter(skipLog?: boolean): Professor[] {
    const input = this.inputControl.value || '';
    const result = this.professors.filter(professor =>
      this.getProfessorName(professor).toLowerCase().includes(input.toLowerCase())
      || professor.course.some(course => {
        if (course) {
          return course.course_code.toLowerCase().includes(input.toLowerCase());
        }
      }));
    // result = this.sortProfessors(result);
    if (!skipLog) {
      this.log(`${result.length} professors found!`);
    }
    return result;
  }

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
      fullname += ' ' + professor.middle_name;
    }
    return fullname + ' ' + professor.last_name;
  }

  openReviewDialog(): void {
    this.dialogService.openReviewDialog(this.viewContainerRef);
  }

  private log(message: string) {
    this.messageService.add('PageThreeComponent: ' + message);
  }

}
