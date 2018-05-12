import { UserPageComponent } from './user-page.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { UserBoardComponent } from "./user-board/user-board.component";
import { UserRoutingModule } from "./user-routing.module";
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    UserPageComponent,
    UserBoardComponent,
    UserProfileComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    CommonModule,
    UserRoutingModule
  ],
  entryComponents: [
  ],
  providers: [],
})
export class UserPageModule { }
