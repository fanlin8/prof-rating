import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MessageService } from '../../message.service';

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
      'rating': [0, Validators.required]
    });
  }

  private rebuildForm() {
    this.reviewForm.reset({
      professor: "",
      course: "",
      review_onsite: "",
      review_online: "",
      rating: 0
    });
  }

  reset() {
    this.rebuildForm();
  }

  onSubmitClick() {

  }

}
