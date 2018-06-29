import { RatingPageComponent } from './rating-page/rating-page.component';
import { ResourcePageComponent } from './resource-page/resource-page.component';
import { TravelPageComponent } from './travel-page/travel-page.component';

import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainPageComponent } from './main-page.component';
import { InfoPageComponent } from './info-page/info-page.component';
import { CallBackComponent } from './call-back/call-back.component';

const mainRoutes: Routes = [
  {
    path: '', component: MainPageComponent,
    children: [
      { path: '', component: InfoPageComponent },
      { path: 'travel-page', component: TravelPageComponent },
      { path: 'resource-page', component: ResourcePageComponent },
      { path: 'rating-page', component: RatingPageComponent },
      { path: 'callback', component: CallBackComponent },

      {
        path: 'user',
        loadChildren: './user-page/user-page.module#UserPageModule',
      },

      {
        path: 'login',
        loadChildren: './login-page/login-page.module#LoginPageModule',
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(mainRoutes)
  ],
  exports: [
    RouterModule
  ],
  providers: [
  ]
})
export class MainRoutingModule { }
