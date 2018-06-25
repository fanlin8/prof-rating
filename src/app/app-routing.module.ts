import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const appRoutes: Routes = [
  {
    path: 'main',
    loadChildren: './main-page/main-page.module#MainPageModule',
  },
  { path: '', component: WelcomePageComponent },
  { path: '**', component: WelcomePageComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class AppRoutingModule { }
