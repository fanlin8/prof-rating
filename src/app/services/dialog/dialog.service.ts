import { Injectable, ViewContainerRef } from '@angular/core';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { ReviewDialogComponent } from './review-dialog/review-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private dialog: MatDialog) { }

  public openReviewDialog(viewContainerRef: ViewContainerRef): Observable<string> {

    const config = new MatDialogConfig();
    config.viewContainerRef = viewContainerRef;
    config.disableClose = true;

    let dialogRef: MatDialogRef<ReviewDialogComponent>;
    dialogRef = this.dialog.open(ReviewDialogComponent, config);

    return dialogRef.afterClosed();
  }

}
