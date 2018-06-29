import { Component, OnInit, Input } from '@angular/core';
import { Professor } from '../../../models/professor';
import { MessageService } from '../../../services/message.service';
import { ReviewService } from '../../../services/review.service';
import { map } from 'rxjs/operators';
import { CourseReviewsModel } from '../../../models/CourseReviewsModel';
import { CourseService } from '../../../services/course.service';

@Component({
  selector: 'app-professor-card',
  templateUrl: './professor-card.component.html',
  styleUrls: ['./professor-card.component.css']
})
export class ProfessorCardComponent implements OnInit {

  @Input()
  professor: Professor;

  dataLoaded = false;
  panelOpened = false;

  courseReviewsMap = new Map<string, CourseReviewsModel>();

  filterInput: string;

  spinnerValue = 100;

  constructor(
    private messageService: MessageService,
    private reviewService: ReviewService,
    private courseService: CourseService
  ) { }

  private log(message: string) {
    this.messageService.add('RatingPageComponent: ' + message);
  }

  ngOnInit() {
    // this.backgroundColor = "rgba(" + this.getColor() + ", 0.25)";
    // let rating = this.professor.rating;
    // if (rating) {
    //   this.spinnerValue = (rating / 5) * 100
    // }
  }

  // getSpinnerClass():string {
  // let rating = this.professor.rating;
  // switch (true) {
  //   case rating <= 1:
  //     return "rating-1";
  //   case rating <= 2:
  //     return "rating-2";
  //   case rating <= 3:
  //     return "rating-3";
  //   case rating <= 4:
  //     return "rating-4";
  //   case rating <= 5:
  //     return "rating-5";

  //     default:
  //       return "";
  //   }
  // }

  // getColor(): string {
  //   let rating = this.professor.rating;
  //   switch (true) {
  //     case rating <= 1:
  //       return "255, 51, 51";
  //     case rating <= 2:
  //       return "255, 153, 51";
  //     case rating <= 3:
  //       return "255, 204, 51";
  //     case rating <= 4:
  //       return "255, 255, 51";
  //     case rating <= 5:
  //       return "51, 255, 51";

  //     default:
  //       return "255, 255, 255";
  //   }
  // }

  onOpen() {
    this.panelOpened = true;
    if (!this.dataLoaded) {
      this.reviewService.getReviewsByProfessorId(this.professor._id).pipe(map(reviews => {
        reviews.forEach(review => {
          const model = this.courseReviewsMap.get(review.course);
          if (model) {
            model.reviewsOnline.push(review.review_online);
            model.reviewsOnsite.push(review.review_onsite);
          } else {
            const newModel = new CourseReviewsModel();
            newModel.professorId = review.professor;
            newModel.courseId = review.course;
            newModel.courseCode = this.courseService.coursesMap.get(review.course).course_code;
            newModel.reviewsOnline = [review.review_online];
            newModel.reviewsOnsite = [review.review_onsite];
            this.courseReviewsMap.set(review.course, newModel);
          }
        });
      }
      )).subscribe(_ => {
        this.dataLoaded = true;
      });
    }
  }

  getKeys(aMap): Array<string> {
    return Array.from(aMap.keys());
  }

  getProfessorName(): string {
    let fullname = this.professor.first_name;
    if (this.professor.middle_name) {
      fullname += ' ' + this.professor.middle_name;
    }
    return fullname + ' ' + this.professor.last_name;
  }

}
