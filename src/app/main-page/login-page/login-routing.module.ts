import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginPageComponent } from './login-page.component';

const loginRoutes: Routes = [
  {
    path: '', component: LoginPageComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(loginRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class LoginRoutingModule { }
