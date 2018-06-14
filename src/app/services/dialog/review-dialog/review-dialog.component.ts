import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../../message.service';
import { Review } from '../../../models/review';
import { ReviewService } from '../../review.service';

@Component({
  selector: 'app-review-dialog',
  templateUrl: './review-dialog.component.html',
  styleUrls: ['./review-dialog.component.css']
})
export class ReviewDialogComponent implements OnInit {

  reviewForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ReviewDialogComponent>,
    private fb: FormBuilder,
    private reviewService: ReviewService,
    private messageService: MessageService) {
    this.createForm();
  }

  ngOnInit() {
  }

  private log(message: string) {
    this.messageService.add("ReviewDialogComponent: " + message);
  }

  private createForm() {
    this.reviewForm = this.fb.group({
      'professor': ["", Validators.required],
      'course': ["", Validators.required],
      'review_onsite': [""],
      'review_online': [""],
      'rating': [null, Validators.required]
    });
  }

  private rebuildForm() {
    this.reviewForm.reset({
      professor: "",
      course: "",
      review_onsite: "",
      review_online: "",
      rating: null
    });
  }

  reset() {
    this.rebuildForm();
  }

  private prepareNewReview(): Review {
    const formModel = this.reviewForm.value;

    const newReview: Review = {
      _id: null,
      creator: null,
      professor: formModel.professor as string,
      course: formModel.course as string,
      review_onsite: formModel.review_onsite as string,
      review_online: formModel.review_online as string,
      rating: formModel.rating as number,
    };

    return newReview;
  }

  onSubmitClick() {
    this.log("Submitting new review...");
    this.reviewService.submitNewReview(this.prepareNewReview()).subscribe(data => {
      if(data) {
        this.dialogRef.close();
      } else {
        this.log("Error while submitting!");
        this.rebuildForm();
      }
    });
  }

}
