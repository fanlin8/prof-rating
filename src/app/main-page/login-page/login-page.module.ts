import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


import { LoginPageComponent } from "./login-page.component";
import { LoginRoutingModule } from "./login-routing.module";
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  declarations: [
    LoginPageComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MaterialModule,
    LoginRoutingModule
  ],
  entryComponents: [
  ],
  providers: [
  ],
})
export class LoginPageModule { }
