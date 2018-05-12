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

@NgModule({
  declarations: [
    PageOneComponent,
    PageTwoComponent,
    MainPageComponent,
    PageThreeComponent,
    NavBarComponent,
    FooterComponent,
    InfoPageComponent,
    CallBackComponent
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
  providers: [],
})
export class MainPageModule { }
