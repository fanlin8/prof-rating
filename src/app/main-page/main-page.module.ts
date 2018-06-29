import { MainPageComponent } from './main-page.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TravelPageComponent } from './travel-page/travel-page.component';
import { ResourcePageComponent } from './resource-page/resource-page.component';
import { RatingPageComponent } from './rating-page/rating-page.component';
import { MainRoutingModule } from './main-routing.module';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { CallBackComponent } from './call-back/call-back.component';

import { MaterialModule } from '../material.module';
import { ProfessorService } from '../services/professor.service';
import { MessagesComponent } from '../utils/messages/messages.component';
import { ProfessorCardComponent } from './rating-page/professor-card/professor-card.component';
import { RegisterService } from '../services/register.service';
import { CourseService } from '../services/course.service';
import { DialogModule } from '../services/dialog/dialog.module';
import { ReviewService } from '../services/review.service';
import { ReviewCardComponent } from './rating-page/review-card/review-card.component';

@NgModule({
  declarations: [
    TravelPageComponent,
    ResourcePageComponent,
    MainPageComponent,
    RatingPageComponent,
    NavBarComponent,
    FooterComponent,
    InfoPageComponent,
    CallBackComponent,
    MessagesComponent,
    ProfessorCardComponent,
    ReviewCardComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MainRoutingModule,
    DialogModule
  ],
  entryComponents: [
  ],
  providers: [
    CourseService,
    ProfessorService,
    RegisterService,
    ReviewService
  ],
})
export class MainPageModule { }
