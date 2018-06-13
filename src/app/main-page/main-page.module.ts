import { MainPageComponent } from './main-page.component';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PageOneComponent } from './page-one/page-one.component';
import { PageTwoComponent } from './page-two/page-two.component';
import { PageThreeComponent } from './page-three/page-three.component';
import { MainRoutingModule } from "./main-routing.module";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { FooterComponent } from './footer/footer.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { CallBackComponent } from './call-back/call-back.component';

import { MaterialModule } from '../material.module';
import { ProfessorService } from '../services/professor.service';
import { MessagesComponent } from '../utils/messages/messages.component';
import { ProfessorCardComponent } from './page-three/professor-card/professor-card.component';
import { RegisterService } from '../services/register.service';
import { CourseService } from '../services/course.service';

@NgModule({
  declarations: [
    PageOneComponent,
    PageTwoComponent,
    MainPageComponent,
    PageThreeComponent,
    NavBarComponent,
    FooterComponent,
    InfoPageComponent,
    CallBackComponent,
    MessagesComponent,
    ProfessorCardComponent
  ],
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    MainRoutingModule
  ],
  entryComponents: [
  ],
  providers: [
    CourseService,
    ProfessorService,
    RegisterService
  ],
})
export class MainPageModule { }
