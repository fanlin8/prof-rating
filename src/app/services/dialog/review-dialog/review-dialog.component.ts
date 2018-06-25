import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../../message.service';
import { Review } from '../../../models/review';
import { ReviewService } from '../../review.service';
import { ProfessorService } from '../../professor.service';
import { Professor } from '../../../models/professor';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { Course } from '../../../models/course';
import { CourseService } from '../../course.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
export class ReviewDialogComponent implements OnInit {

  reviewForm: FormGroup;
  professors: Professor[];
  courses: Course[];
  filteredProfessors: Observable<Professor[]>;
  filteredCourses: Observable<Course[]>;

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private professorService: ProfessorService,
    private courseService: CourseService,
    private messageService: MessageService) {
    this.createForm();
  }

  ngOnInit() {
    this.professors = this.professorService.professorsList;
    this.courses = this.courseService.coursesList;

    this.filteredProfessors = this.reviewForm.controls['professor'].valueChanges
      .pipe(
        startWith(''),
        map(val => this.professorFilter(val))
      );

    this.filteredCourses = this.reviewForm.controls['course'].valueChanges
      .pipe(
        startWith(''),
        map(val => this.courseFilter(val))
      );
  }

  professorFilter(val: string): Professor[] {
    return this.professors.filter(professor =>
      this.getProfessorName(professor).toLowerCase().includes(val.toLowerCase()));
  }

  courseFilter(val: string): Course[] {
    return this.courses.filter(course =>
      course.course_code.toLowerCase().includes(val.toLowerCase()));
  }

  private log(message: string) {
    this.messageService.add('ReviewDialogComponent: ' + message);
  }

  private createForm() {
    this.reviewForm = this.fb.group({
      'professor': ['', Validators.required],
      'course': ['', Validators.required],
      'review_onsite': [''],
      'review_online': [''],
      'rating': [undefined, Validators.required],
      'submitted': false
    });
  }

  private rebuildForm() {
    this.reviewForm.reset({
      professor: '',
      course: '',
      review_onsite: '',
      review_online: '',
      rating: undefined,
      submitted: false
    });
  }

  reset() {
    this.rebuildForm();
  }

  private prepareNewReview(): Review {
    const formModel = this.reviewForm.value;

    const newReview: Review = {
      _id: undefined,
      creator: undefined,
      professor: formModel.professor as string,
      course: formModel.course as string,
      review_onsite: formModel.review_onsite as string,
      review_online: formModel.review_online as string,
      rating: formModel.rating as number,
    };

    return newReview;
  }

  onSubmitClick() {
    this.log('Submitting new review...');
    this.reviewForm.patchValue({ submitted: true });
    this.reviewService.submitNewReview(this.prepareNewReview()).subscribe(data => {
      if (data) {
        this.dialogRef.close();
      } else {
        this.log('Error while submitting!');
        this.rebuildForm();
      }
    });
  }

  getProfessorName(professor: Professor): string {
    let fullname = professor.first_name;
    if (professor.middle_name) {
      fullname += ' ' + professor.middle_name;
    }
    return fullname + ' ' + professor.last_name;
  }

}
