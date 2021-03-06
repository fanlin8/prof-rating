import { NgModule } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogService } from './dialog.service';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';
import { BarRatingModule } from 'ngx-bar-rating';
import { ReviewService } from '../review.service';

@NgModule({
  imports: [
    MaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BarRatingModule
  ],
  exports: [
    ReviewDialogComponent
  ],
  declarations: [
    ReviewDialogComponent
  ],
  providers: [
    DialogService,
    ReviewService
  ],
  entryComponents: [
    ReviewDialogComponent
  ],
})
export class DialogModule { }
