import { UserPageComponent } from './user-page/user-page.component';
import { PageThreeComponent } from './page-three/page-three.component';
import { PageTwoComponent } from './page-two/page-two.component';
import { PageOneComponent } from './page-one/page-one.component';

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
      { path: 'page-one', component: PageOneComponent },
      { path: 'page-two', component: PageTwoComponent },
      { path: 'page-three', component: PageThreeComponent },
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
]

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
